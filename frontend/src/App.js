import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Signup from "./pages/signup";
import Login from "./pages/login";
import Navbar from "./components/shared/navbar";
import ForgotPassword from './components/ForgotPassword';
import Home from './pages/home';
import CreateBookPage from './pages/createBookPage';
import ProfilePage from './pages/profile';
import CreateGroupPage from './pages/CreateGroupPage';
import GroupChatPage from './pages/GroupChatPage';
import ErrorBoundary from './components/ErrorBoundary';
import Error404 from './pages/Error404';
import Error500 from './pages/Error500';

const App = () => {
  // Simulating authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // Simulate user authentication
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <ErrorBoundary>
      {isAuthenticated && <Navbar />} {/* Render Navbar only if authenticated */}

      <Routes>
        {/* Redirect to Login if not authenticated */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />
          }
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
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
        <Route path="/createBookPage" element={<CreateBookPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/error/404" component={Error404} />
        <Route path="/error/500" component={Error500} />
        <Route component={Error404} /> {/* Catch-all for undefined routes */}
        {/* <Route path="/profile/favorites" element={<ProfilePage />} /> */}
        <Route path="/CreateGroupPage" element={<CreateGroupPage />} />
        <Route path="/GroupChatPage" element={<GroupChatPage />} />

      </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
