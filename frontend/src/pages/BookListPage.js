// BookListPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/sidebar/sidebar';

const addComment = async (bookId, comment) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/book/${bookId}/comment`,
      { comment }
    );
    return response;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

const addRating = async (bookId, rating) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/book/${bookId}/rate`,
      { rating }
    );
    return response;
  } catch (error) {
    console.error('Error adding rating:', error);
    throw error;
  }
};

const addLike = async (bookId) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/book/${bookId}/like`
    );
    return response;
  } catch (error) {
    console.error('Error adding like:', error);
    throw error;
  }
};

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleAddComment = (bookId) => {
    addComment(bookId, comment).then((response) => {
      console.log(response);
    });
  };

  const handleAddRating = (bookId) => {
    addRating(bookId, rating).then((response) => {
      console.log(response);
    });
  };


  
  const handleAddLike = (bookId) => {
    addLike(bookId).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/book');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    
    <div className="flex h-screen"> 
    <Sidebar />
    <div>
    <h1>Book List</h1>
    <ul>
      {books.map((book) => (
        <li key={book._id}>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <form>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
            />
            <button onClick={() => handleAddComment(book._id)}>Add Comment</button>
          </form>
          <button onClick={() => handleAddLike(book._id)}>Like</button>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button onClick={() => handleAddRating(book._id)}>Rate</button>
        </li>
      ))}
    </ul>
  </div>
 </div>
  );
};

export default BookListPage;


