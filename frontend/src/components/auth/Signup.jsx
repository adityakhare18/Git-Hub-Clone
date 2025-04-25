import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/github-mark-white.svg";
import './auth.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate inputs
    if (!username || !email || !password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      // Make API call to backend
      const response = await axios.post('http://localhost:3000/api/user/signup', {
        username,
        email,
        password
      });

      // Handle success
      setSuccess('Signup successful! Redirecting to login...');

      // Store user ID in localStorage
      if (response.data.userId) {
        localStorage.setItem('userId', response.data.userId);
      }

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      // Handle error
      const errorMessage = err.response?.data?.message || 'An error occurred during signup';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-header">
        <Link to="/" className="auth-logo-link">
          <img src={logo} alt="GitHub" className="auth-logo" />
        </Link>
      </div>

      <div className="auth-content">
        <div className="auth-card">
          <h1 className="auth-title">Create your account</h1>

          {error && (
            <div className="auth-alert auth-alert-error">
              <div className="auth-alert-icon">
                <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                  <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13zm0-11a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 3.5zm0 7a1 1 0 100-2 1 1 0 000 2z"></path>
                </svg>
              </div>
              <div className="auth-alert-message">{error}</div>
            </div>
          )}

          {success && (
            <div className="auth-alert auth-alert-success">
              <div className="auth-alert-icon">
                <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                  <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13z"></path>
                  <path fillRule="evenodd" d="M10.97 4.97a.75.75 0 011.06 0l1.5 1.5a.75.75 0 010 1.06l-1.5 1.5a.75.75 0 01-1.06-1.06l.97-.97-.97-.97a.75.75 0 010-1.06z"></path>
                  <path fillRule="evenodd" d="M6.03 4.97a.75.75 0 010 1.06l-.97.97.97.97a.75.75 0 01-1.06 1.06l-1.5-1.5a.75.75 0 010-1.06l1.5-1.5a.75.75 0 011.06 0z"></path>
                </svg>
              </div>
              <div className="auth-alert-message">{success}</div>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSignup}>
            <div className="auth-form-group">
              <label htmlFor="username-field" className="auth-label">Username</label>
              <input
                type="text"
                id="username-field"
                name="username"
                className="auth-input"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <p className="auth-input-hint">
                This will be your username on GitHub. You can always change it later.
              </p>
            </div>

            <div className="auth-form-group">
              <label htmlFor="email-field" className="auth-label">Email address</label>
              <input
                type="email"
                id="email-field"
                name="email"
                className="auth-input"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="auth-input-hint">
                We'll occasionally send emails with updates and important notices.
              </p>
            </div>

            <div className="auth-form-group">
              <label htmlFor="password-field" className="auth-label">Password</label>
              <input
                type="password"
                id="password-field"
                name="password"
                className="auth-input"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="auth-input-hint">
                Make sure it's at least 6 characters including a number and a lowercase letter.
              </p>
            </div>

            <button
              type="submit"
              className="auth-button auth-button-primary auth-button-full"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>

            <p className="auth-terms">
              By creating an account, you agree to the <a href="#" className="auth-link">Terms of Service</a>.
              For more information about GitHub's privacy practices, see the <a href="#" className="auth-link">Privacy Statement</a>.
            </p>
          </form>
        </div>

        <div className="auth-card auth-card-secondary">
          <p className="auth-text">
            Already have an account? <Link to="/login" className="auth-link">Sign in</Link>.
          </p>
        </div>

        <div className="auth-footer">
          <ul className="auth-footer-links">
            <li><a href="#" className="auth-footer-link">Terms</a></li>
            <li><a href="#" className="auth-footer-link">Privacy</a></li>
            <li><a href="#" className="auth-footer-link">Security</a></li>
            <li><a href="#" className="auth-footer-link">Contact GitHub</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Signup;
