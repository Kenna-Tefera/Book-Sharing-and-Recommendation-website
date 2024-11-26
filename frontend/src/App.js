import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signup from "./components/signup";
import Login from "./components/login";
import Navbar from "./components/shared/navbar";
import ForgotPassword from './components/ForgotPassword';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
