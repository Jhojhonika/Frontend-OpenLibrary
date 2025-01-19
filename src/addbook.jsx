import React, { useState } from "react";
import axios from "axios";

import "@fortawesome/fontawesome-free/css/all.min.css"; // For Font Awesome stars

function AddBookForm() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publicationDate: "",
    isbn: "",
    genre: "",
    rating: 0, // Initialize rating to 0 for star-based rating
    image: null, // Add image field
  });

  const [errors, setErrors] = useState({});

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Fantasy",
    "Romance",
    "Sci-Fi",
    "Others",
  ];

  // Handle changes for form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  // Handle changes for the rating
  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
    setErrors({ ...errors, rating: "" }); // Clear rating error
  };

  // Validate the form fields
  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required.";
    else if (formData.title.length > 100)
      newErrors.title = "Title must not exceed 100 characters.";

    if (!formData.author) newErrors.author = "Author is required.";
    else if (formData.author.length > 50)
      newErrors.author = "Author must not exceed 50 characters.";

    if (!formData.publicationDate)
      newErrors.publicationDate = "Publication date is required.";

    if (!/^\d{13}$/.test(formData.isbn))
      newErrors.isbn = "ISBN must be exactly 13 digits.";

    if (!formData.genre) newErrors.genre = "Genre is required.";

    if (!formData.rating)
      newErrors.rating = "Rating is required.";
    else if (formData.rating < 1 || formData.rating > 5)
      newErrors.rating = "Rating must be between 1 and 5.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Create a plain object for non-file form data
        const dataToSend = {
          title: formData.title,
          author: formData.author,
          publicationDate: formData.publicationDate,
          isbn: formData.isbn,
          genre: formData.genre,
          rating: formData.rating,
        };
  
        // Send a POST request with JSON data
        const response = await axios.post("https://openlibrary-backend-production.up.railway.app/api/books", dataToSend, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        alert("Book added successfully!");
        console.log("Response:", response.data);
  
        // Reset form
        setFormData({
          title: "",
          author: "",
          publicationDate: "",
          isbn: "",
          genre: "",
          rating: 0,
        });
      } catch (error) {
        console.error("Error adding the book!", error);
        alert("Failed to add the book. Please try again.");
      }
    }
  };
  

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-4">Add a book to Open Library</h2>
        <p>
          We require a minimum set of fields to create a new record. These are
          those fields.
        </p>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              maxLength="100"
              placeholder="Use Title: Subtitle to add a subtitle."
            />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>

          {/* Author */}
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Author
            </label>
            <input
              type="text"
              className={`form-control ${errors.author ? "is-invalid" : ""}`}
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              maxLength="50"
              placeholder="Like, 'Agatha Christie' or 'Jean-Paul Sartre'"
            />
            {errors.author && (
              <div className="invalid-feedback">{errors.author}</div>
            )}
          </div>

          {/* Publication Date */}
          <div className="mb-3">
            <label htmlFor="publicationDate" className="form-label">
              When was it published?
            </label>
            <input
              type="date"
              className={`form-control ${errors.publicationDate ? "is-invalid" : ""}`}
              id="publicationDate"
              name="publicationDate"
              value={formData.publicationDate}
              onChange={handleChange}
              placeholder="You should be able to find this in the first few pages of the book."
            />
            {errors.publicationDate && (
              <div className="invalid-feedback">{errors.publicationDate}</div>
            )}
          </div>

          {/* ISBN */}
          <div className="mb-3">
            <label htmlFor="isbn" className="form-label">
              ID number — like an ISBN
            </label>
            <input
              type="text"
              className={`form-control ${errors.isbn ? "is-invalid" : ""}`}
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              maxLength="13"
              placeholder="Enter the ID number"
            />
            {errors.isbn && <div className="invalid-feedback">{errors.isbn}</div>}
          </div>

          {/* Genre */}
          <div className="mb-3">
            <label htmlFor="genre" className="form-label">
              Genre
            </label>
            <select
              className={`form-select ${errors.genre ? "is-invalid" : ""}`}
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            >
              <option value="">Choose a genre</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            {errors.genre && <div className="invalid-feedback">{errors.genre}</div>}
          </div>

          {/* Rating */}
          <div className="mb-3">
            <label htmlFor="rating" className="form-label">
              Rating
            </label>
            <div id="rating" className="d-flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={`fas fa-star ${star <= formData.rating ? "text-warning" : "text-secondary"}`}
                  style={{ cursor: "pointer", fontSize: "1.5rem", margin: "0 5px" }}
                  onClick={() => handleRatingChange(star)}
                ></i>
              ))}
            </div>
            {errors.rating && (
              <div className="text-danger mt-2">{errors.rating}</div>
            )}
          </div>

          

          <div className="form-text mb-3">
            By saving a change to this wiki, you agree that your contribution is
            given freely to the world under <a href="#">CC0</a>. Yippee!
          </div>

          {/* Buttons */}
          <div className="mb-5">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
            <button type="reset" className="btn btn-secondary" onClick={() => setFormData({
                title: "",
                author: "",
                publicationDate: "",
                isbn: "",
                genre: "",
                rating: 0,
                image: null,
              })}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddBookForm;
