import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./routes/home/home";
import Admin from "./routes/admin/admin";
import Book from "./routes/book/book";
import Author from "./routes/author/author";
import Authors from "./routes/authors/authors";
import Category from "./routes/category/Category";
import CategoryID from "./routes/category/categoryID";
import { Search } from "./routes/search/search";
import Books from "./routes/books/books";
import UserPage from "./routes/UserPage/userpage";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "../node_modules/jquery/dist/jquery";
import "../node_modules/react-popper/dist/index.umd.js";
import Popper from "popper.js"; // Import Popper from 'popper.js'
import AboutPage from "./components/about/about.js";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/about/us" element={<AboutPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/userpage" element={<UserPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/search" element={<Search />} />

          <Route path="/author/:id" element={<Author />} />
          <Route path="/authors" element={<Authors />} />

          <Route path="/book/:id" element={<Book />} />
          <Route path="/books" element={<Books />} />

          <Route path="/categories" element={<Category />} />
          <Route path="/categories/:id" element={<CategoryID />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
