// src/pages/Error404.js
import React from 'react';

const Error404 = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">404</h1>
        <p className="text-lg mt-2">Oops! The page you're looking for doesn't exist.</p>
        <a href="/" className="text-blue-500 hover:underline mt-4">Go back to home</a>
      </div>
    </div>
  );
};

export default Error404;
