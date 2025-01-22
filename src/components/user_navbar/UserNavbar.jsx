

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./UserNavbar.css";
import { FaSearch, FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";

const UserNavbar = () => {
  const [showDialog, setShowDialog] = useState(false); // State to control the dialog visibility
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle logout
  const handleLogout = () => {
    // Clear user data from localStorage (or handle your logout logic)
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/");
  };

  return (
    <nav className="user-navbar">
      <div className="navbar-logo">
        <Link to="/">CozyWear</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/quiz">Quiz</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <div className="navbar-icons">
        <FaSearch className="navbar-icon" />
        <Link to="/cart">
          <FaShoppingCart className="navbar-icon" />
        </Link>
        <Link to="/favorites">
          <FaHeart className="navbar-icon" />
        </Link>
        <div className="dropdown">
          <FaUser className="navbar-icon" />
          <div className="dropdown-menu">
            <Link to="/profile">Personal Information</Link>
            <Link to="/orders">My Orders</Link>
            <Link to="/address">Manage Address</Link>
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                setShowDialog(true); // Show the dialog box
              }}
            >
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* Dialog Box */}
      {showDialog && (
        <div className="logout-dialog">
          <div className="dialog-content">
            <p>Do you want to log out?</p>
            <button onClick={handleLogout}>Yes</button>
            <button className="cancel" onClick={() => setShowDialog(false)}>
              No
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
