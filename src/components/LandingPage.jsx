import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Gift-Themed Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Perfect Gifts, Tailored for Every Occasion</h1>
          <p className="hero-description">Personalized recommendations to help you find the ideal gift for your loved ones.</p>
          <Link to="/Chatbot">
            <button className="cta-button">Find Your Gift</button>
          </Link>
        </div>
      </section>

      {/* Features Section - Gift Icons */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img src="https://img2.exportersindia.com/product_images/bc-small/2021/8/6850666/personalised-gifts-1628583113-5935022.jpeg" alt="Personalized Gifts" className="feature-icon" />
            <h3>Personalized Recommendations</h3>
            <p>Our AI suggests gifts based on your preferences and recipient details.</p>
          </div>
          <div className="feature-card">
            <img src="budget.jpg" alt="Budget Gifts" className="feature-icon" />
            <h3>Budget-Friendly</h3>
            <p>Gift options for every price range, ensuring affordability.</p>
          </div>
          <div className="feature-card">
            <img src="wide.jpg" alt="Gift Variety" className="feature-icon" />
            <h3>Vast Selection</h3>
            <p>From gadgets to personalized items, we offer a wide variety of gifts.</p>
          </div>
          <div className="feature-card">
            <img src="seamless.jpg" alt="Seamless Shopping" className="feature-icon" />
            <h3>Seamless Experience</h3>
            <p>A hassle-free process from start to finish with AI-driven recommendations.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <h3>Step 1</h3>
            <p>Select the occasion and preferences.</p>
          </div>
          <div className="step-card">
            <h3>Step 2</h3>
            <p>Provide recipient information (age, relationship, etc.).</p>
          </div>
          <div className="step-card">
            <h3>Step 3</h3>
            <p>Receive handpicked gift recommendations and finalize your choice.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="testimonial">
          <blockquote className="testimonial-quote">
            "The perfect gifting solution! I found amazing gifts for my family within minutes, and the suggestions were spot on."
          </blockquote>
          <cite>- Jane Doe</cite>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <ul className="footer-links">
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/terms">Terms of Service</Link></li>
        </ul>
        <p>&copy; 2024 GiftBot. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
