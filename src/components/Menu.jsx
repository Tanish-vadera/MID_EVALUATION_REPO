// Menu.jsx
import React from "react";
import { Link } from "react-router-dom";
import './Menu.css'; // Ensure your CSS file is imported
import logo from '../assets/logo.png'; // Update the path to your logo image

const Menu = ({ setIsModalOpen }) => { // Accept prop to open modal
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <div className="navbar-links">
          {/* Change the Login link to trigger the modal */}
          <button className="navbar-link" onClick={() => setIsModalOpen(true)}>Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
