import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './populars.css';
import { Link } from 'react-router-dom';
import { FaAngleDoubleRight } from 'react-icons/fa';
import PopularCard from './popularcard/popularcard';
import { Bars } from 'react-loader-spinner';


export default function Populars() {
  const [books, setBooks] = useState([]);
  const [booksLoading, setBooksLoading] = useState(true);
  const [authors, setAuthors] = useState([]);
  const [authorsLoading, setAuthorsLoading] = useState(true);

  useEffect(() => {
    // Fetch books data
    axios.get('http://localhost:5000/admin/book')
      .then(response => {
        if (response.data) {
          setBooks(response.data);
          setBooksLoading(false);
        } else {
          alert('Failed to fetch product data');
          setBooksLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching books:', error);
        setBooksLoading(false);
      });

    // Fetch authors data
    axios.get('http://localhost:5000/admin/author')
      .then(response => {
        if (response.data) {
          setAuthors(response.data);
          setAuthorsLoading(false);
        } else {
          alert('Failed to fetch author data');
          setAuthorsLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching authors:', error);
        setAuthorsLoading(false);
      });
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const RenderBooks = () => (
    <div className="gallery">
      <div className="row">
        {books.map(book => <PopularCard key={book.id} book={book} />)}
      </div>
    </div>
  );

  const RenderAuthors = () => (
    <div className="gallery">
      <div className="row">
        {authors.map(author => <PopularCard key={author.id} author={author} />)}
      </div>
    </div>
  );

  const LoadingSpinner = () => (
    <div className="loader">
      <Bars
        color="#f2f2f2"
        height={100}
        width={100}
        timeout={3000} // 3 seconds
      />
    </div>
  );
  

  return (
    <div className="col-lg-12 col-sm-4">
      <div className="row main-box-layout">
        <div className="col box box1">
          <div className="label">
            <h3><span className="title">Popular Books</span></h3>
          </div>
          <div className="row">
            {booksLoading ? <LoadingSpinner /> : <RenderBooks />}
            <Link className="explore-icon" to="/books">
              <FaAngleDoubleRight />
            </Link>
          </div>
        </div>
      </div>

      <div className="row main-box-layout">
        <div className="col box box2">
          <div className="label">
            <h3><span className="title">Popular Authors</span></h3>
          </div>
          <div className="row">
            {authorsLoading ? <LoadingSpinner /> : <RenderAuthors />}
            <Link className="explore-icon" to="/authors">
              <FaAngleDoubleRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
