// c:/Users/FALCON DUBAI/Desktop/Book-Sharing-and-Recommendation-website/frontend/src/pages/createBookPage.js

import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/sidebar/sidebar'
const CreateBookPage = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    file: null,
  });

  const handleInputChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setBookData({ ...bookData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', bookData.title);
    formData.append('author', bookData.author);
    formData.append('genre', bookData.genre);
    formData.append('description', bookData.description);
    formData.append('file', bookData.file);

    try {
      const response = await axios.post('http://localhost:5000/api/book', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Book created successfully:', response.data);
      // Reset form or redirect to book list page
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

 
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    file: null, // State for file upload
  });

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [id]: files[0] }); // Set file to state
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  
  
  

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 bg-gray-100">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-center mb-6">Create a New Book</h2>

          {/* Book Creation Form */}
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            {/* Book Title */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Book Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter the title of the book"
              />
            </div>

            {/* Author Name */}
            <div className="mb-4">
              <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                id="author"
                type="text"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter the author's name"
              />
            </div>

            {/* Genre */}
            <div className="mb-4">
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                Genre <span className="text-red-500">*</span>
              </label>
              <input
                id="genre"
                type="text"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                value={formData.genre}
                onChange={handleChange}
                placeholder="Enter the genre of the book"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                rows="4"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter a description of the book"
              />
            </div>

            {/* File Upload */}
            <div className="mb-4">
              <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                Book Cover (Optional)
              </label>
              <input
                id="file"
                type="file"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                onChange={handleChange}
              />
            </div>

            {/* Terms and Conditions */}
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="form-checkbox h-4 w-4 accent-[#003377]"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <span className="ml-2 text-gray-500">
                  I agree to the{' '}
                  <a href="#" className="text-orange-600 underline decoration-orange-600">
                    Terms and Conditions
                  </a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              >
                Create Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBookPage;
