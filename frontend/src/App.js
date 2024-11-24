import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signup from "./components/signup";
import Login from "./components/login";
import Navbar from "./components/shared/navbar";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
