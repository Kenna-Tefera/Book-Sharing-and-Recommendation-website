import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from "./pages/signup";
import Login from "./pages/login";
import Navbar from "./components/shared/navbar";
import ForgotPassword from './components/ForgotPassword';
import Home from './pages/home';
import CreateBookPage from './pages/createBookPage';
import BookListPage from './pages/BookListPage';
import Profile from './pages/profile';
import EditProfile from './pages/EditProfilePage';
import CreateGroupPage from './pages/CreateGroupPage';
import GroupChatPage from './pages/GroupChatPage';
import ErrorBoundary from './components/ErrorBoundary';
import Error404 from './pages/Error404';
import Error500 from './pages/Error500';
import Footer from './components/shared/footer';

import { useAuth } from './context/Authcontext';
import AllProfilePage from './pages/AllprofilePage';
import { jwtDecode } from 'jwt-decode'; // Correct import

// ProtectedRoute component
const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Navigate to="/login" />;
};

const App = () => {
  const { isLoggedIn } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      checkTokenExpiration();
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp < Date.now() / 1000) {
          handleLogout();
          localStorage.removeItem("authToken");
        }
      } catch (error) {
        handleLogout();
        localStorage.removeItem("authToken");
      }
    }
    setTimeout(checkTokenExpiration, 1000);
  };

  return (
    <Router>
      {isLoggedIn && <Navbar />}
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              isAuthenticated ? <Home onLogout={handleLogout} /> : <Navigate to="/" />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/createBookPage" element={<CreateBookPage />} />
          <Route path="/BookListPage" element={<BookListPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/CreateGroupPage" element={<CreateGroupPage />} />
          <Route path="/GroupChatPage" element={<GroupChatPage />} />
          <Route path="/error/404" element={<Error404 />} />
          <Route path="/error/500" element={<Error500 />} />
          <Route path="*" element={<Error404 />} /> {/* Catch-all for undefined routes */}
        </Routes>
      </ErrorBoundary>
      {isLoggedIn && <Footer />}
    </Router>
  );
};

export default App;

