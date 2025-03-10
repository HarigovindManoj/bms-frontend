import React, { useState } from 'react';
import { createBook } from '../../services/BookService';
import './BookForm.css'

const BookForm = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    publicationDate: '',
    isbn: '',
    genre: '',
    rating: 1,
    image: null 
  });
  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Fantasy', 'Romance', 'Sci-Fi', 'Others'];

  const validate = () => {
    const newErrors = {};
    
    if (!book.title) newErrors.title = 'Title is required';
    else if (book.title.length > 100) newErrors.title = 'Title cannot exceed 100 characters';
    
    if (!book.author) newErrors.author = 'Author is required';
    else if (book.author.length > 50) newErrors.author = 'Author cannot exceed 50 characters';
    
    if (!book.publicationDate) newErrors.publicationDate = 'Publication date is required';
    
    if (!book.isbn) newErrors.isbn = 'ISBN is required';
    else if (!/^\d{13}$/.test(book.isbn)) newErrors.isbn = 'ISBN must be 13 digits';
    
    if (!book.genre) newErrors.genre = 'Genre is required';
    
    if (!book.rating) newErrors.rating = 'Rating is required';
    else if (book.rating < 1 || book.rating > 5) newErrors.rating = 'Rating must be between 1 and 5';
    
    // Image validation - only validate if an image was selected
    if (book.image) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
      if (!allowedTypes.includes(book.image.type)) {
        newErrors.image = 'Only JPEG, PNG, and GIF images are allowed';
      } else if (book.image.size > 5 * 1024 * 1024) { 
        newErrors.image = 'Image must be less than 5MB';
      }
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBook({ ...book, image: file });
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setBook({ ...book, image: null });
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      try {
        // Create FormData to send the image along with the book data
        const formData = new FormData();
        
        // Format the book data with proper date string format that Java can parse
        const bookData = {
          title: book.title,
          author: book.author,
          publicationDate: book.publicationDate, 
          isbn: book.isbn,
          genre: book.genre,
          rating: book.rating
        };
        
        
        formData.append('book', JSON.stringify(bookData));
        
      
        if (book.image) {
          formData.append('image', book.image);
        }
        
        await createBook(formData);
        
        
        setBook({
          title: '',
          author: '',
          publicationDate: '',
          isbn: '',
          genre: '',
          rating: 1,
          image: null
        });
        setImagePreview(null);
        setSuccessMessage('Book added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        console.error("Error submitting form:", error);
        setErrors({ submit: 'Failed to add book. Please try again.' });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>

      <div className="book-form-container">
        <div className="card p-4 shadow-lg" style={{ width: "425px" }}>
          <div className="card-header text-center bg-primary text-white">
            <h4>Add New Book</h4>
          </div>
          <div className="card-body">
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            {errors.submit && (
              <div className="alert alert-danger">{errors.submit}</div>
            )}
            <form onSubmit={handleSubmit} className="compact-form">
              <div className="mb-2">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  id="title"
                  name="title"
                  value={book.title}
                  onChange={handleChange}
                  maxLength="100"
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
              </div>
              
              <div className="mb-2">
                <label htmlFor="author" className="form-label">Author</label>
                <input
                  type="text"
                  className={`form-control ${errors.author ? 'is-invalid' : ''}`}
                  id="author"
                  name="author"
                  value={book.author}
                  onChange={handleChange}
                  maxLength="50"
                />
                {errors.author && <div className="invalid-feedback">{errors.author}</div>}
              </div>
              
              <div className="mb-2">
                <label htmlFor="publicationDate" className="form-label">Publication Date</label>
                <input
                  type="date"
                  className={`form-control ${errors.publicationDate ? 'is-invalid' : ''}`}
                  id="publicationDate"
                  name="publicationDate"
                  value={book.publicationDate}
                  onChange={handleChange}
                />
                {errors.publicationDate && <div className="invalid-feedback">{errors.publicationDate}</div>}
              </div>
              
              <div className="mb-2">
                <label htmlFor="isbn" className="form-label">ISBN (13 digits)</label>
                <input
                  type="text"
                  className={`form-control ${errors.isbn ? 'is-invalid' : ''}`}
                  id="isbn"
                  name="isbn"
                  value={book.isbn}
                  onChange={handleChange}
                  maxLength="13"
                />
                {errors.isbn && <div className="invalid-feedback">{errors.isbn}</div>}
              </div>
              
              <div className="mb-2">
                <label htmlFor="genre" className="form-label">Genre</label>
                <select
                  className={`form-select ${errors.genre ? 'is-invalid' : ''}`}
                  id="genre"
                  name="genre"
                  value={book.genre}
                  onChange={handleChange}
                >
                  <option value="">Select Genre</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
                {errors.genre && <div className="invalid-feedback">{errors.genre}</div>}
              </div>
              
              <div className="mb-2">
                <label htmlFor="rating" className="form-label">Rating (1-5)</label>
                <input
                  type="number"
                  className={`form-control ${errors.rating ? 'is-invalid' : ''}`}
                  id="rating"
                  name="rating"
                  value={book.rating}
                  onChange={handleChange}
                  min="1"
                  max="5"
                />
                {errors.rating && <div className="invalid-feedback">{errors.rating}</div>}
              </div>
              
              
              <div className="mb-3">
                <label htmlFor="image" className="form-label">Book Cover Image (optional)</label>
                <input
                  type="file"
                  className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <div className="form-text">Supported formats: JPEG, PNG, GIF (max 5MB)</div>
                {errors.image && <div className="invalid-feedback">{errors.image}</div>}
              </div>
              
              
              {imagePreview && (
                <div className="mb-3 text-center">
                  <img 
                    src={imagePreview} 
                    alt="Book cover preview" 
                    className="img-thumbnail" 
                    style={{ maxHeight: '200px' }} 
                  />
                  <button 
                    type="button" 
                    className="btn btn-sm btn-outline-danger d-block mx-auto mt-2"
                    onClick={() => {
                      setBook({ ...book, image: null });
                      setImagePreview(null);
                    }}
                  >
                    Remove Image
                  </button>
                </div>
              )}
              
              <button type="submit" className="btn btn-primary w-100">Add Book</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookForm;