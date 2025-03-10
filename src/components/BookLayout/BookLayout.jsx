import React from 'react';
import { Link } from 'react-router-dom';
import BookForm from '../BookForm/BookForm';
import './BookLayout.css'; 

const BookLayout = () => {
  return (
    <div className="book-layout">
      
      <header className="app-header">
        <div className="header-left">
          <strong>Bookz</strong>
        </div>
        <div className="header-right">
        <Link to="/listBooks" className="btn btn-primary">View Books</Link>
        </div>
      </header>

     
      <main className="main-content">
        <BookForm/>
      </main>

     
      <footer className="app-footer">
        <p>&copy; 2025 Book Management System.</p>
      </footer>
    </div>
  );
};

export default BookLayout;