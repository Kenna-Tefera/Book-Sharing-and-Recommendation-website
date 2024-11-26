import React from 'react';
import Sidebar from '../components/sidebar/sidebar';

const Home = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow bg-gray-100 p-6">
        <h1 className="text-3xl font-semibold">Welcome to BookSite!</h1>
        <p className="mt-4">Start exploring your favorite books and categories.</p>
      </div>
    </div>
  );
};

export default Home;
