import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext';
import Layout from './layout/Layout';
import './home.css';

const Home = () => {
  const { currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (email) {
      navigate('/signup');
    }
  };

  return (
    <Layout>
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Build and ship software on a<br />single, collaborative platform</h1>
            <p className="hero-subtitle">Join the world's most widely adopted AI-powered developer platform.</p>

            {currentUser ? (
              <div className="dashboard-cta">
                <Link to="/dashboard" className="dashboard-button">Go to dashboard</Link>
              </div>
            ) : (
              <div className="signup-form">
                <form onSubmit={handleSignUp} className="email-form">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="email-input"
                  />
                  <button type="submit" className="signup-button">Sign up for GitHub</button>
                </form>
                <div className="try-copilot">
                  <a href="#" className="try-button">Try GitHub Copilot</a>
                </div>
              </div>
            )}
          </div>
          <div className="hero-image">
            <div className="globe-animation">
              <div className="globe-container">
                <div className="globe-sphere"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Productivity Section */}
        <section className="productivity-section">
          <div className="section-header">
            <h2 className="section-title">Productivity tools for every developer</h2>
            <p className="section-subtitle">GitHub's tools help you tackle complexity and overcome challenges at scale.</p>
          </div>

          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
                </svg>
              </div>
              <h3 className="feature-title">Codespaces</h3>
              <p className="feature-description">Spin up fully configured dev environments in the cloud that start in seconds.</p>
              <a href="#" className="feature-link">Learn more</a>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path>
                </svg>
              </div>
              <h3 className="feature-title">Copilot</h3>
              <p className="feature-description">AI pair programmer that helps you write code faster with less work.</p>
              <a href="#" className="feature-link">Learn more</a>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path>
                </svg>
              </div>
              <h3 className="feature-title">Code scanning</h3>
              <p className="feature-description">Find and fix vulnerabilities before they reach production.</p>
              <a href="#" className="feature-link">Learn more</a>
            </div>
          </div>
        </section>

        {/* Collaboration Section */}
        <section className="collaboration-section">
          <div className="section-header">
            <h2 className="section-title">The complete developer platform</h2>
            <p className="section-subtitle">GitHub helps your team collaborate, build, and ship code securely.</p>
          </div>

          <div className="collaboration-features">
            <div className="collaboration-feature">
              <h3 className="collaboration-title">Collaborative coding</h3>
              <p className="collaboration-description">
                Work together seamlessly with pull requests, discussions, and code reviews.
              </p>
            </div>

            <div className="collaboration-feature">
              <h3 className="collaboration-title">Automation & CI/CD</h3>
              <p className="collaboration-description">
                Build, test, and deploy your code with GitHub Actions and Packages.
              </p>
            </div>

            <div className="collaboration-feature">
              <h3 className="collaboration-title">Security</h3>
              <p className="collaboration-description">
                Find and fix vulnerabilities across your entire codebase.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Get started with GitHub today</h2>
            <p className="cta-subtitle">Join millions of developers building and shipping software together.</p>

            {currentUser ? (
              <Link to="/dashboard" className="cta-button">Go to dashboard</Link>
            ) : (
              <Link to="/signup" className="cta-button">Sign up for GitHub</Link>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
