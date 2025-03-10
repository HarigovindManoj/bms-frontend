import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBooks,deleteBook} from '../services/BookService';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [sortField, setSortField] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await getAllBooks();
      setBooks(data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch books');
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        fetchBooks();
      } catch (error) {
        console.log(error);
        setError('Failed to delete book');
      }
    }
  };

  // Sorting function
  const sortedBooks = [...books].sort((a, b) => {
    let comparison = 0;
    if (a[sortField] > b[sortField]) {
      comparison = 1;
    } else if (a[sortField] < b[sortField]) {
      comparison = -1;
    }
    return sortDirection === 'desc' ? comparison * -1 : comparison;
  });

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <h2>Book List</h2>
        <Link to="/" className="btn btn-primary">Add Book</Link>
      </div>
      <div className="card-body">
        {books.length === 0 ? (
          <p>No books found. Add some books to get started!</p>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('bookId')} style={{ cursor: 'pointer' }}>
                      ID {sortField === 'bookId' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                      Title {sortField === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('author')} style={{ cursor: 'pointer' }}>
                      Author {sortField === 'author' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('genre')} style={{ cursor: 'pointer' }}>
                      Genre {sortField === 'genre' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('rating')} style={{ cursor: 'pointer' }}>
                      Rating {sortField === 'rating' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBooks.map((book) => (
                    <tr key={book.id}>
                      <td>{book.uniqueId}</td>
                      <td>
                        <Link to={`/book/${book.uniqueId}`}>{book.title}</Link>
                      </td>
                      <td>{book.author}</td>
                      <td>{book.genre}</td>
                      <td>{book.rating}</td>
                      <td>
                        <button 
                          className="btn btn-sm btn-danger" 
                          onClick={() => handleDelete(book.uniqueId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav>
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  
                  {[...Array(totalPages).keys()].map(number => (
                    <li 
                      key={number + 1} 
                      className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(number + 1)}
                      >
                        {number + 1}
                      </button>
                    </li>
                  ))}
                  
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookList;