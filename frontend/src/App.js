import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import signup from "./components/signup";
import login from "./components/login";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/login" element={<login />} />
    <Route path="/signup" element={<signup />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
