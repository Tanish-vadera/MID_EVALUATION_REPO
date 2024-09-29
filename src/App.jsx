import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Menu from "./components/Menu"; // Assuming Menu is your main navigation page
import Chatbot from "./components/ChatBot";
import Login from "./components/Login";
import Signup from "./components/signup";
import LandingPage from "./components/LandingPage";
import Modal from "./components/Modal";

const App = () => {
  return (
    <Router>
      <div>
        <Menu />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/modal" element={<Modal/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
