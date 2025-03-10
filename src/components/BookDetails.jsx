import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookById,getExternalBookDetails} from '../services/BookService';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [externalDetails, setExternalDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const bookData = await getBookById(id);
        setBook(bookData);
        
        // Fetch external details after getting the book
        if (bookData.isbn) {
          const externalData = await getExternalBookDetails(bookData.isbn);
          console.log(externalData);
          setExternalDetails(externalData);
        }
        
        setLoading(false);
      } catch (error) {
        
        setError('Failed to fetch book details');
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!book) return <div className="alert alert-warning">Book not found</div>;

   // Function to determine which image to display
   const getBookImage = () => {
    if (book.imagePath) {
      return `http://localhost:8080/${book.imagePath}`;
    }else if (externalDetails && externalDetails.imageUrl) {
      return externalDetails.imageUrl;
    }
    
    return null;
  };

  const bookImageUrl = getBookImage();

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <h2>Book Details: {book.title}</h2>
        <Link to="/listBooks" className="btn btn-primary">Back to Book List</Link>
      </div>
      <div className="card-body">
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'basic' ? 'active' : ''}`}
              onClick={() => setActiveTab('basic')}
            >
              Basic Details
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'more' ? 'active' : ''}`}
              onClick={() => setActiveTab('more')}
            >
              More Details
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {activeTab === 'basic' && (
            <div className="tab-pane active">
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Title:</strong> {book.title}</p>
                  <p><strong>Author:</strong> {book.author}</p>
                  <p><strong>Genre:</strong> {book.genre}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Publication Date:</strong> {new Date(book.publicationDate).toLocaleDateString()}</p>
                  <p><strong>ISBN:</strong> {book.isbn}</p>
                  <p><strong>Rating:</strong> {book.rating} / 5</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'more' && (
            <div className="tab-pane active">
              {externalDetails ? (
                <div className="row">
                  <div className="col-md-4">
                    {bookImageUrl ? (
                      <img 
                        src={bookImageUrl} 
                        alt={book.title} 
                        className="img-fluid mb-3"
                        style={{ maxHeight: '300px' }}
                      />
                    ) : (
                      <div className="text-center p-5 bg-light mb-3">
                        <p>No image available</p>
                      </div>
                    )}
                  </div>
                  <div className="col-md-8">
                    <h4>Description</h4>
                    <p>{externalDetails.description || 'No description available'}</p>
                    
                    {externalDetails.publisher && (
                      <p><strong>Publisher:</strong> {externalDetails.publisher}</p>
                    )}
                    
                    {externalDetails.pageCount && (
                      <p><strong>Page Count:</strong> {externalDetails.pageCount}</p>
                    )}
                    
                    {externalDetails.categories && externalDetails.categories.length > 0 && (
                      <p><strong>Categories:</strong> {externalDetails.categories.join(', ')}</p>
                    )}
                    
                    {externalDetails.language && (
                      <p><strong>Language:</strong> {externalDetails.language}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="alert alert-info">
                  No additional information available from external sources.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;