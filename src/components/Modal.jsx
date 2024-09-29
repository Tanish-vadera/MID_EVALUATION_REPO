// Modal.jsx
import React from "react";
import "./Modal.css"; // Import the CSS for styling

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Login / Sign Up</h2>
        <form>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" placeholder="Enter your password" required />
          </div>
          <button type="submit">Login</button>
          {/* Add the Cancel button here */}
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <div className="signup-link">
            Don’t have an account? <a href="#">Sign Up Now</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
