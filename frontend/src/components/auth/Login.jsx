import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../authContext";
import logo from "../../assets/github-mark-white.svg";
import "./auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate inputs
    if (!email || !password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      // Make API call to backend
      const response = await axios.post("http://localhost:3000/api/user/login", {
        email,
        password
      });

      // Handle success
      setSuccess("Login successful! Redirecting...");

      // Store user ID in localStorage
      if (response.data.user && response.data.user._id) {
        localStorage.setItem("userId", response.data.user._id);
        setCurrentUser(response.data.user._id);
      }

      // Redirect to home page after 1.5 seconds
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      // Handle error
      const errorMessage = err.response?.data?.message || "An error occurred during login";
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
          <h1 className="auth-title">Sign in to GitHub</h1>

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

          <form className="auth-form" onSubmit={handleLogin}>
            <div className="auth-form-group">
              <label htmlFor="login-field" className="auth-label">Username or email address</label>
              <input
                type="text"
                id="login-field"
                name="login"
                className="auth-input"
                autoComplete="username"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="auth-form-group">
              <div className="auth-label-with-link">
                <label htmlFor="password-field" className="auth-label">Password</label>
                <a href="#" className="auth-link">Forgot password?</a>
              </div>
              <input
                type="password"
                id="password-field"
                name="password"
                className="auth-input"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="auth-button auth-button-primary"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <div className="auth-card auth-card-secondary">
          <p className="auth-text">
            New to GitHub? <Link to="/signup" className="auth-link">Create an account</Link>.
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

export default Login;
