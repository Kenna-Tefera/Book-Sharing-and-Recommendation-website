import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/sidebar/sidebar';
import Navbar from '../components/shared/navbar';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('aboutMe'); // Default active tab is "About Me"
  const [isEditingAboutMe, setIsEditingAboutMe] = useState(false);
  const [aboutMeText, setAboutMeText] = useState('Hello, I love reading and sharing books!');
  const [books, setBooks] = useState([
    { id: 1, title: 'The Great Adventure', description: 'A thrilling tale of adventure.' },
    { id: 2, title: 'Mystery in the Dark', description: 'A gripping mystery novel.' },
  ]);
  const [favorites, setFavorites] = useState([
    { id: 1, title: 'The Great Adventure', description: 'A thrilling tale of adventure.' },
    { id: 2, title: 'Mystery in the Dark', description: 'A gripping mystery novel.' },
  ]);
  const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/100'); // Default profile picture

  const handleEditAboutMe = () => {
    setIsEditingAboutMe(!isEditingAboutMe);
  };

  const handleSaveAboutMe = () => {
    setIsEditingAboutMe(false);
    // Optionally save the data to the backend here
  };

  const handleDeleteProfile = () => {
    // Code to handle profile deletion
    alert('Profile deleted!');
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteProfilePicture = () => {
    setProfilePicture('https://via.placeholder.com/100'); // Reset to default image
  };

  return (
    <div className="flex flex-col">
      {/* Main content area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Profile Content */}
        <div className="flex-1 p-8">
          {/* Profile Header */}
          <div className="profile-header text-center mb-8">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-500 mb-4 mx-auto" // mx-auto centers the image
            />
            <h2 className="text-2xl font-semibold">John Doe</h2>
            <p className="text-gray-500">Book Lover</p>
          </div>

          {/* Tab Navigation */}
          <div className="navigation mb-8 text-center">
            <ul className="flex justify-center space-x-8">
              <li>
                <button
                  className={`text-xl ${activeTab === 'aboutMe' ? 'text-blue-500' : 'text-gray-700'} hover:text-blue-500`}
                  onClick={() => setActiveTab('aboutMe')}
                >
                  About Me
                </button>
              </li>
              <li>
                <button
                  className={`text-xl ${activeTab === 'favorites' ? 'text-blue-500' : 'text-gray-700'} hover:text-blue-500`}
                  onClick={() => setActiveTab('favorites')}
                >
                  Favorites
                </button>
              </li>
              <li>
                <button
                  className={`text-xl ${activeTab === 'myBooks' ? 'text-blue-500' : 'text-gray-700'} hover:text-blue-500`}
                  onClick={() => setActiveTab('myBooks')}
                >
                  My Books
                </button>
              </li>
              <li>
                <button
                  className={`text-xl ${activeTab === 'profileSettings' ? 'text-blue-500' : 'text-gray-700'} hover:text-blue-500`}
                  onClick={() => setActiveTab('profileSettings')}
                >
                  Profile Settings
                </button>
              </li>
            </ul>
          </div>

          {/* Tab Contents */}
          {activeTab === 'aboutMe' && (
            <section id="aboutMe" className="mb-8">
              <h2 className="text-2xl mb-4">About Me</h2>
              {isEditingAboutMe ? (
                <div>
                  <textarea
                    value={aboutMeText}
                    onChange={(e) => setAboutMeText(e.target.value)}
                    className="w-full h-24 p-2 mb-4 border rounded"
                  />
                  <button onClick={handleSaveAboutMe} className="bg-blue-500 text-white p-2 rounded">Save</button>
                </div>
              ) : (
                <div>
                  <p>{aboutMeText}</p>
                  <button onClick={handleEditAboutMe} className="bg-yellow-500 text-white p-2 rounded mt-4">Edit</button>
                </div>
              )}
            </section>
          )}

          {activeTab === 'favorites' && (
            <section id="favorites" className="mb-8">
              <h2 className="text-2xl mb-4">Favorites</h2>
              <ul>
                {favorites.map((book) => (
                  <li key={book.id} className="mb-4 p-4 bg-gray-100 rounded">
                    <h3 className="text-xl font-semibold">{book.title}</h3>
                    <p>{book.description}</p>
                    <div className="mt-2">
                      <button className="bg-green-500 text-white p-2 rounded mr-2">View</button>
                      <button className="bg-blue-500 text-white p-2 rounded">Edit</button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {activeTab === 'myBooks' && (
            <section id="myBooks" className="mb-8">
              <h2 className="text-2xl mb-4">My Books</h2>
              <ul>
                {books.map((book) => (
                  <li key={book.id} className="mb-4 p-4 bg-gray-100 rounded">
                    <h3 className="text-xl font-semibold">{book.title}</h3>
                    <p>{book.description}</p>
                    <div className="mt-2">
                      <button className="bg-green-500 text-white p-2 rounded mr-2">View</button>
                      <button className="bg-blue-500 text-white p-2 rounded">Edit</button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {activeTab === 'profileSettings' && (
            <section id="profileSettings">
              <h2 className="text-2xl mb-4">Profile Settings</h2>
              <div className="bg-gray-100 p-4 rounded mb-4">
                <p className="font-semibold">Name: John Doe</p>
                <p className="font-semibold">Email: johndoe@example.com</p>

                {/* Profile Picture Change */}
                <div className="mt-4">
                  <h3 className="text-xl mb-2">Profile Picture</h3>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="mb-4"
                  />
                  {profilePicture !== 'https://via.placeholder.com/100' && (
                    <button
                      onClick={handleDeleteProfilePicture}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      Delete Profile Picture
                    </button>
                  )}
                </div>

                <div className="mt-4">
                  <button className="bg-blue-500 text-white p-2 rounded mr-2">Edit</button>
                  <button className="bg-red-500 text-white p-2 rounded" onClick={handleDeleteProfile}>Delete</button>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
