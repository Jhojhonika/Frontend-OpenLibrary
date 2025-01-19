import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Booklist() {
    const [books, setBooks] = useState([]);
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [totalBooks, setTotalBooks] = useState(0); // Total number of books
    const [booksPerPage] = useState(10); // Number of books per page

    const location = useLocation();
    const navigate = useNavigate();

    // Access genre from the passed state
    const { genre } = location.state || {};

    // Redirect if genre is undefined
    useEffect(() => {
        if (!genre) {
            console.error("Genre is undefined. Redirecting to home.");
            navigate("/");
        }
    }, [genre, navigate]);

    useEffect(() => {
        if (!genre) return; // Ensure genre is defined before making the API call

        axios
            .get(`https://openlibrary-backend-production.up.railway.app`, { params: { genre } }) // Pass genre as a query parameter
            .then((response) => {
                setBooks(response.data);
            })
            .catch((error) => {
                console.error("Error fetching books:", error);
                setError("Failed to fetch books for the selected genre.");
            });
    }, [genre]); // Add genre as a dependency
    // Fetch images based on genre
    useEffect(() => {
        const fetchImages = async () => {
            try {
                if (!genre) {
                    console.error("Genre is undefined");
                    return;
                }
                const response = await axios.get(`https://openlibrary-backend-production.up.railway.app/api/books/images/${genre}`);
                setImages(response.data); // Set the fetched images
            } catch (err) {
                setError("Failed to fetch images.");
            }
        };
        fetchImages();
    }, [genre]);

    // Handle delete book
    const handleDelete = (bookId) => {
        axios
            .delete(`https://openlibrary-backend-production.up.railway.app/api/books/${bookId}`)
            .then((response) => {
                setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
                alert("Book deleted successfully.");
            })
            .catch((error) => {
                console.error("Error deleting book:", error);
                alert("Failed to delete book.");
            });
    };

    // Determine the length to map

    const handleViewDetails = (book, imageUrl) => {
        navigate(`/bookview/${book.id}`, { state: { book, image: imageUrl } });
    };

    // Calculate total pages
    const totalPages = Math.ceil(totalBooks / booksPerPage);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            
            <link rel="stylesheet" href="index.css" />



            <div className="py-3 py-md-3 bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="mb-4">{genre} Books</h3>
                        </div>

                        {error && (
                            <div className="col-md-12">
                                <p className="text-danger">{error}</p>
                            </div>
                        )}

                        {error && (
                            <div className="col-md-12">
                                <p className="text-danger">{error}</p>
                            </div>
                        )}

                        {books.map((book, index) => (
                            <div className="col-md-4 col-lg-3 mb-4" key={book.id}>
                                <div
                                    className="card"
                                    onClick={() =>
                                        handleViewDetails(book, images[index])
                                    } // Pass the book and image URL
                                >
                                    <img
                                        src={`https://openlibrary-backend-production.up.railway.app${images[index]}`}
                                        alt={book.title}
                                        className="card-img-top"
                                        style={{
                                            height: "200px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{book.title}</h5>
                                        <p className="card-text">Author: {book.author}</p>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(book.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* Pagination Controls */}
            <div className="pagination-container ">
                <button
                    className="btn btn-secondary"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {/* Page number buttons */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`btn btn-secondary ${currentPage === index + 1 ? "active" : ""
                            }`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    className="btn btn-secondary"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </>
    );
}

export default Booklist;
