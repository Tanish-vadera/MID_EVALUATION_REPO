// src/components/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';  // Assuming you have some CSS for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Here, you can add logic for actual authentication
    console.log("Logging in with:", email, password);
    // On successful login, navigate to the home page
    navigate("/chatbot");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="signup-link">
          <p>
            Don't have an account? <Link to="/signup">Sign up now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
