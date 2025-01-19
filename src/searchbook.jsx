import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SearchBook() {
    const { query } = useParams(); 
    console.log(query);// Get the search query (author or title)
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (query) {
            // Determine whether the query is an author or a title by checking for a space (simple heuristic)
            const isAuthorSearch = query.split(" ").length > 1;
            const endpoint = isAuthorSearch
                ? `https://openlibrary-backend-production.up.railway.app/api/books?author=${query}`
                : `https://openlibrary-backend-production.up.railway.app/api/books?title=${query}`;

            // Fetch books based on author or title
            axios
                .get(endpoint)
                .then((response) => {
                    setBooks(response.data);
                })
                .catch((error) => {
                    setError("Failed to fetch books.");
                });
        }
    }, [query]);
    return (
        <div>
            <h4 className="mb-5 mt-3">Books for "{query}"</h4>

            {/* Display error message if there is any */}
            {error && <p className="text-danger">{error}</p>}

            {/* Table to display books */}
            {books.length > 0 ? (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>ISBN</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={index}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.isbn}</td>
                                <td>{book.rating}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No books found based on your search criteria.</p>
            )}
        </div>
    );
}

export default SearchBook;
