import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

function BookDetails() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const book = location.state?.book;
    const image = location.state?.image;

    if (!book) {
        return (
            <div>
                <p>Book details not available for ID: {id}</p>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    return (
        <div className="container py-5">

            <div className="row">
                <div className="col-md-6">
                    <img
                        src={`http://localhost:8080${image}`}
                        alt={book.title}
                        style={{
                            width: "60%",
                            height: "auto",
                            objectFit: "cover",
                        }}
                    />
                </div>
                <div className="col-md-6">
                    <h2>{book.title}</h2>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>ISBN:</strong> {book.isbn}</p>
                    <p><strong>Rating:</strong> {book.rating}</p>
                    <button className="btn btn-primary" onClick={() => navigate(-1)}>
                        Back to List
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookDetails;
