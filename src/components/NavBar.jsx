import { useState } from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
   const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-[#C8D9E6] border-b border-[#C8D9E6]">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        <div>
          <img src="/src/assets/logo.png" alt="logo" className="w-50 h-10" />
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-[#2F4156] hover:text-[#567C8D] font-medium"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="text-[#2F4156] hover:text-[#567C8D] font-medium"
          >
            About Us
          </Link>

          <Link
            to="/contact"
            className="text-[#2F4156] hover:text-[#567C8D] font-medium"
          >
            Contact Us
          </Link>

          <Link 
            to="/register" 
            className="bg-[#2F4156] text-white px-5 py-2 rounded-lg hover:bg-[#567C8D] transition"
          >
           
            Sign Up
          </Link>
        </div>
          <button
          className="md:hidden text-black text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-[#C8D9E6] px-6 pb-4 space-y-4">
          <Link to="/" className="block text-black text-lg">
            Home
          </Link>
          <Link to="/about" className="block text-black text-lg">
            About Us
          </Link>
          <Link to="/contact" className="block text-black text-lg">
            Contact Us
          </Link>
          <Link
            to="/login"
            className="block bg-black text-white px-4 py-2 rounded-lg text-center"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};
