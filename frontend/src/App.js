
import React from 'react';
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
import { useAuth } from './context/Authcontext';
import AllProfilePage from './pages/AllprofilePage';

// ProtectedRoute component
const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Navigate to="/login" />;
};

const App = () => {
  const { isLoggedIn } = useAuth(); // Get login status from context

  return (
    <Router>
      {/* Render Navbar and Footer only if the user is logged in */}
      {isLoggedIn && <Navbar />}
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Protected routes */}
          <Route path="/createBookPage" element={<ProtectedRoute element={<CreateBookPage />} />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/allprofiles" element={<ProtectedRoute element={<AllProfilePage />} />} />
          <Route path="/profile/:userId" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/editprofile/:userId" element={<ProtectedRoute element={<EditProfile />} />} />
          <Route path="/CreateGroupPage" element={<ProtectedRoute element={<CreateGroupPage />} />} />
          <Route path="/GroupChatPage" element={<ProtectedRoute element={<GroupChatPage />} />} />

          {/* Error Pages */}
          <Route path="/error/404" element={<Error404 />} />
          <Route path="/error/500" element={<Error500 />} />
          <Route path="*" element={<Navigate to="/error/404" />} />
        </Routes>
      </ErrorBoundary>
      {isLoggedIn && <Footer />}
    </Router>
  );
};

export default App;
