import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg bg-light shadow-sm">
        <div className="container-fluid">
          {/* Brand */}
          <Link className="navbar-brand fw-bold" to="#" style={{ color: "navy" }}>
            Cozy<span className="text-primary">Wear</span>
          </Link>
          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Navbar Content */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {user ? (
                <>
                  {/* Dropdown for Admin Options */}
                  <li className="nav-item dropdown">
                    <button
                      className="btn btn-outline-dark dropdown-toggle"
                      type="button"
                      id="adminDropdown"
                      onClick={toggleDropdown}
                    >
                      Admin Dashboard
                    </button>
                    <ul
                      className={`dropdown-menu dropdown-menu-end ${
                        dropdownOpen ? "show" : ""
                      }`}
                      aria-labelledby="adminDropdown"
                    >
                      <li>
                        <Link className="dropdown-item" to="/admin/dashboard">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin/users">
                          Manage Users
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin/products">
                          Manage Products
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin/orders">
                          Manage Orders
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin/reports">
                          Reports
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin/settings">
                          Settings
                        </Link>
                      </li>
                      <li>
                        <button className="dropdown-item text-danger" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  {/* Login and Register Buttons */}
                  <li className="nav-item">
                    <Link to="/login" className="btn btn-primary me-2">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="btn btn-success">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
