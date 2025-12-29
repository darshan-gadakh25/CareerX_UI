import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { profileAPI } from "../services/api";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setUserName(parsedUser.name);
      
      // Try to get updated name from profile
      profileAPI.getProfile()
        .then(response => {
          if (response.data.generalInformation.name) {
            setUserName(response.data.generalInformation.name);
          }
        })
        .catch(() => {
          // Keep existing name if profile fetch fails
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setUserName('');
    navigate('/');
  };

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

          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-[#2F4156] hover:text-[#567C8D] font-medium"
              >
                <span>Welcome, {userName}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    to="/studentdashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/register" 
              className="bg-[#2F4156] text-white px-5 py-2 rounded-lg hover:bg-[#567C8D] transition"
            >
              Sign Up
            </Link>
          )}
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
          
          {user ? (
            <>
              <div className="text-black text-lg font-medium">
              {userName}
              </div>
              <Link to="/studentdashboard" className="block text-black text-lg">
                Dashboard
              </Link>
              <Link to="/profile" className="block text-black text-lg">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block bg-red-600 text-white px-4 py-2 rounded-lg text-center w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block bg-black text-white px-4 py-2 rounded-lg text-center"
            >
              Sign Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};
