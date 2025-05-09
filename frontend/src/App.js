import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Project";
import "./App.css"; // Import your global styles here


function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/Contact" element={<Contact />} />
          {/* Add routes for other pages as you create them */}
          {/* For example:
          <Route path="/community" element={<Community />} />
          <Route path="/contact" element={<Contact />} /> 
          */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;