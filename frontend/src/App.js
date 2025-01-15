import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Signup from "./pages/signup";
import Login from "./pages/login";
import Navbar from "./components/shared/navbar";
import ForgotPassword from './components/ForgotPassword';
import Home from './pages/home';
import CreateBookPage from './pages/createBookPage';
import Profile from './pages/profile';
import EditProfile from './pages/EditProfilePage';
import CreateGroupPage from './pages/CreateGroupPage';
import GroupChatPage from './pages/GroupChatPage';
import ErrorBoundary from './components/ErrorBoundary';
import Error404 from './pages/Error404';
import Error500 from './pages/Error500';
import Footer from './components/shared/footer';
import Sidebar from './components/sidebar/sidebar';
import { jwtDecode } from 'jwt-decode';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const handleLogin = () => {
    setIsAuthenticated(true);
  };



  const checkTokenExpiration = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp < Date.now() / 1000) {
          console.log("Token expired");
          localStorage.removeItem("authToken");
        }
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("authToken");
      }
    }
  };

  return (
    <Router>
      <ErrorBoundary>
      <Navbar />
      {/* <Sidebar /> */}
      <Routes>
        {/* Redirect to Login if not authenticated */}
        <Route
          path="/"
          element={
            <Home />
          }
          // element={
          //   isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />
          // }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />
          }
        />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/home" /> : <Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Home Page */}
        {/* <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        /> */}
        
        <Route path="/createBookPage" element={<CreateBookPage />} />
        <Route path="/error/404" component={Error404} />
        <Route path="/error/500" component={Error500} />
        <Route component={Error404} /> {/* Catch-all for undefined routes */}
        {/* <Route path="/profile/favorites" element={<ProfilePage />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/CreateGroupPage" element={<CreateGroupPage />} />
        <Route path="/GroupChatPage" element={<GroupChatPage />} />
      </Routes>
      <Footer />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
