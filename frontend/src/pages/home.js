import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar/sidebar';
import axios from 'axios';

const genres = ['Fiction', 'Non-Fiction', 'Romance', 'Thriller', 'Mystery'];

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchBookTerm, setSearchBookTerm] = useState('');
  const [searchAuthorTerm, setSearchAuthorTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

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

  const handleSearchBook = (e) => {
    setSearchBookTerm(e.target.value);
  };

  const handleSearchAuthor = (e) => {
    setSearchAuthorTerm(e.target.value);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const applyFilter = () => {
    const filteredBooks = books.filter((book) => {
      const genreMatch = selectedGenre ? book.genre === selectedGenre : true;
      const bookMatch = searchBookTerm
        ? book.title.toLowerCase().includes(searchBookTerm.toLowerCase())
        : true;
      const authorMatch = searchAuthorTerm
        ? book.author.toLowerCase().includes(searchAuthorTerm.toLowerCase())
        : true;
      return genreMatch && bookMatch && authorMatch;
    });

    setBooks(filteredBooks);
  };

  const resetFilter = () => {
    setSearchBookTerm('');
    setSearchAuthorTerm('');
    setSelectedGenre('');
    // Re-fetch books to reset the list
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/book');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-grow bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold">Welcome to BookSite!</h1>
          <div className="flex items-center">
            <input
              type="text"
              value={searchBookTerm}
              onChange={handleSearchBook}
              placeholder="Search by book title"
              className="py-2 px-4 border-2 border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={searchAuthorTerm}
              onChange={handleSearchAuthor}
              placeholder="Search by author name"
              className="py-2 px-4 border-2 border-gray-300 rounded-md ml-4"
            />
            <select
              value={selectedGenre}
              onChange={handleGenreChange}
              className="py-2 px-4 border-2 border-gray-300 rounded-md ml-4"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <button
              className="py-2 px-4 bg-blue-500 text-white rounded-md ml-4"
              onClick={applyFilter}
            >
              Apply Filter
            </button>
            <button
              className="py-2 px-4 bg-red-500 text-white rounded-md ml-2"
              onClick={resetFilter}
            >
              Remove Filter
            </button>
          </div>
        </div>

        <ul className="space-y-4">
          {books.map((book) => (
            <li
              key={book.id}
              className="flex items-center justify-between bg-white p-4 rounded-md shadow-md"
            >
              <div className="flex items-center">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-20 h-20 mr-4"
                />
                <div>
                  <h2 className="text-lg font-semibold">{book.title}</h2>
                  <p className="text-sm text-gray-600">{book.author}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">{book.genre}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;

