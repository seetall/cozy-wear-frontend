import React from "react";
import { Link } from "react-router-dom";
import "./UserNavbar.css";
import { FaSearch, FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";

const UserNavbar = () => {
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
          <Link to="/shop">Shop</Link>
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
            <Link to="/profile">Profile</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/logout">Logout</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
