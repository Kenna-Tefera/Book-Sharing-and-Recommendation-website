import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isBooksOpen, setIsBooksOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar visibility

  const menuItems = [
    { label: 'Home', icon: '🏠', link: '/' },
    { label: 'Categories', icon: '📂', link: '/categories' },
    { label: 'Favorites', icon: '❤️', link: '/profile/favorites' },
    { label: 'Settings', icon: '⚙️', link: '/settings' },
    { label: 'Profile', icon: '👤', link: '/profile' },


  ];

  return (
    <div className={`w-64 h-screen bg-black text-white flex flex-col transition-all ${isSidebarOpen ? 'block' : 'hidden'}`}>
      {/* Hamburger Icon to toggle Sidebar */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-4 text-white text-3xl fixed top-4 left-4 z-50"
      >
        ☰ {/* This is the hamburger icon */}
      </button>

      {/* Profile Section */}
      <div className="p-6 flex flex-col items-center">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-gray-500 mb-4"
        />
        <h2 className="text-lg font-semibold">John Doe</h2>
        <p className="text-gray-400 text-sm">Book Lover</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-grow">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.link}
                className="flex items-center px-4 py-2 hover:bg-gray-700 transition-all"
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}

          {/* Dropdown for Books */}
          <li>
            <button
              onClick={() => setIsBooksOpen(!isBooksOpen)}
              className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700 transition-all"
            >
              <span className="mr-3">📚</span> Books
              <span className="ml-auto">{isBooksOpen ? '▼' : '►'}</span>
            </button>
            {isBooksOpen && (
              <ul className="pl-8 space-y-2 mt-2">
                <li>
                  <Link
                    to="/createBookPage"
                    className="flex items-center px-4 py-2 hover:bg-gray-600 transition-all"
                  >
                    Create Book
                  </Link>
                </li>
                <li>
                  <Link
                    to="/updateBookPage"
                    className="flex items-center px-4 py-2 hover:bg-gray-600 transition-all"
                  >
                    Update Book
                  </Link>
                </li>
                <li>
                  <Link
                    to="/detailBookPage"
                    className="flex items-center px-4 py-2 hover:bg-gray-600 transition-all"
                  >
                    Detail of Book
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-books"
                    className="flex items-center px-4 py-2 hover:bg-gray-600 transition-all"
                  >
                    My Books
                  </Link>
                </li>
                <li>
          <Link to="/profile/favorites" className="text-white text-lg hover:text-blue-500">Favorites</Link>
        </li>
              </ul>
            )}
          </li>
          {/* Dropdown for profile */}
          {/* <li>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700 transition-all"
            >
              <span className="mr-3">📚</span> Books
              <span className="ml-auto">{isProfileOpen ? '▼' : '►'}</span>
            </button>
            {isProfileOpen && (
              <ul className="pl-8 space-y-2 mt-2">
                <li>
                  <Link
                    to="/profilePage"
                    className="flex items-center px-4 py-2 hover:bg-gray-600 transition-all"
                  >
                    Create Book
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-books"
                    className="flex items-center px-4 py-2 hover:bg-gray-600 transition-all"
                  >
                    My Books
                  </Link>
                </li>
              </ul>
            )}
          </li> */}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 text-gray-400 text-sm">
        © {new Date().getFullYear()} Book Lovers
      </div>
    </div>
  );
};

export default Sidebar;
