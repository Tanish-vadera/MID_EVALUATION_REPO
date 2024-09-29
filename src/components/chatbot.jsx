import React, { useState } from 'react';
import './Chatbot.css'; // Ensure you have the CSS for chatbot styling
import Modal from "../components/Modal"; // Import the modal component

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! What’s your relationship with the recipient?' }
  ]);
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(true); // Show modal initially

  // Function to handle sending the message
  const handleSendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { from: 'user', text: input }]);
      setInput('');

      setTimeout(() => {
        let nextMessage = '';
        if (messages.length === 1) {
          nextMessage = 'What occasion are you gifting for?';
        } else if (messages.length === 2) {
          nextMessage = 'What’s your budget for this gift?';
        } else {
          nextMessage = 'Thank you! Here are some gift ideas based on your preferences.';
        }
        setMessages((prevMessages) => [...prevMessages, { from: 'bot', text: nextMessage }]);
      }, 1000);
    }
  };

  // Function to handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="chatbot-wrapper">
      {/* Modal for login/signup */}
      {showModal && <Modal isOpen={showModal} onClose={handleCloseModal} />}
      
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="toggle-button">
          {sidebarOpen ? 'Close' : 'Open'} Sidebar
        </button>
        {sidebarOpen && (
          <div className="conversations">
            <p>Previous Chats</p>
            <ul>
              <li>Chat 1</li>
              <li>Chat 2</li>
              <li>New Chat</li>
            </ul>
          </div>
        )}
      </div>
      
      <div className="chat-container">
        <div className="chat-window">
          <div className="messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.from}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="input-container">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Type your message..."
              onKeyDown={handleKeyDown}  // Listen for Enter key press
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
