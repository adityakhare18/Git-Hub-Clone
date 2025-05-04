import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../authContext';
import githubLogo from '../../assets/github-mark-white.svg';
import './Layout.css';

const Layout = ({ children }) => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setCurrentUser(null);
    setShowProfileDropdown(false);
    navigate('/');
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleSearchFocus = () => {
    setSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setSearchFocused(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="layout">
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <Link to="/" className="logo-link">
              <img src={githubLogo} alt="GitHub" className="github-logo" />
            </Link>
            <nav className="main-nav">
              <ul className="nav-list">
                <li className="nav-item dropdown">
                  <button className="nav-link dropdown-toggle">
                    Product <span className="dropdown-caret">▼</span>
                  </button>
                </li>
                <li className="nav-item dropdown">
                  <button className="nav-link dropdown-toggle">
                    Solutions <span className="dropdown-caret">▼</span>
                  </button>
                </li>
                <li className="nav-item dropdown">
                  <button className="nav-link dropdown-toggle">
                    Resources <span className="dropdown-caret">▼</span>
                  </button>
                </li>
                <li className="nav-item dropdown">
                  <button className="nav-link dropdown-toggle">
                    Open Source <span className="dropdown-caret">▼</span>
                  </button>
                </li>
                <li className="nav-item dropdown">
                  <button className="nav-link dropdown-toggle">
                    Enterprise <span className="dropdown-caret">▼</span>
                  </button>
                </li>
                <li className="nav-item">
                  <Link to="/pricing" className="nav-link">Pricing</Link>
                </li>
                {currentUser && (
                  <li className="nav-item">
                    <Link to="/files" className="nav-link">S3 Files</Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
          <div className="header-right">
            <div className={`search-container ${searchFocused ? 'focused' : ''}`}>
              <input
                type="text"
                className="search-input"
                placeholder="Search or jump to..."
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
              />
              <div className="search-slash">/</div>
              {searchFocused && (
                <div className="search-dropdown">
                  <div className="search-dropdown-header">
                    <span>Search syntax tips</span>
                  </div>
                  <div className="search-dropdown-body">
                    <ul className="search-tips">
                      <li><code>user:username</code> - Search by user</li>
                      <li><code>repo:name</code> - Search by repository</li>
                      <li><code>language:name</code> - Search by language</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            {currentUser ? (
              <div className="user-nav">
                <Link to="/new" className="new-repo-button">
                  <span className="plus-icon">+</span>
                  <span className="dropdown-caret">▼</span>
                </Link>
                <button className="notifications-button">
                  <svg className="notification-icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"></path>
                  </svg>
                </button>
                <div className="profile-dropdown" ref={dropdownRef}>
                  <button className="profile-button" onClick={toggleProfileDropdown}>
                    <div className="avatar">
                      <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor">
                        <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                      </svg>
                    </div>
                    <span className="dropdown-caret">▼</span>
                  </button>

                  {showProfileDropdown && (
                    <div className="dropdown-menu">
                      <div className="dropdown-header">
                        <span className="dropdown-header-text">Signed in as</span>
                        <strong className="dropdown-username">Username</strong>
                      </div>

                      <div className="dropdown-divider"></div>

                      <Link to="/dashboard" className="dropdown-item">
                        Your profile
                      </Link>
                      <Link to="/repo" className="dropdown-item">
                        Your repositories
                      </Link>
                      <Link to="/projects" className="dropdown-item">
                        Your projects
                      </Link>

                      <div className="dropdown-divider"></div>

                      <Link to="/settings" className="dropdown-item">
                        Settings
                      </Link>

                      <div className="dropdown-divider"></div>

                      <button onClick={handleLogout} className="dropdown-item dropdown-item-danger">
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="signin-button">Sign in</Link>
                <Link to="/signup" className="signup-button">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-logo">
              <img src={githubLogo} alt="GitHub" className="github-footer-logo" />
              <span className="footer-tagline">© {new Date().getFullYear()} GitHub, Inc.</span>
            </div>
            <nav className="footer-nav">
              <div className="footer-nav-column">
                <h2 className="footer-heading">Product</h2>
                <ul className="footer-list">
                  <li><a href="#" className="footer-link">Features</a></li>
                  <li><a href="#" className="footer-link">Security</a></li>
                  <li><a href="#" className="footer-link">Team</a></li>
                  <li><a href="#" className="footer-link">Enterprise</a></li>
                  <li><a href="#" className="footer-link">Customer stories</a></li>
                </ul>
              </div>
              <div className="footer-nav-column">
                <h2 className="footer-heading">Platform</h2>
                <ul className="footer-list">
                  <li><a href="#" className="footer-link">Developer API</a></li>
                  <li><a href="#" className="footer-link">Partners</a></li>
                  <li><a href="#" className="footer-link">Electron</a></li>
                  <li><a href="#" className="footer-link">GitHub Desktop</a></li>
                </ul>
              </div>
              <div className="footer-nav-column">
                <h2 className="footer-heading">Support</h2>
                <ul className="footer-list">
                  <li><a href="#" className="footer-link">Docs</a></li>
                  <li><a href="#" className="footer-link">Community Forum</a></li>
                  <li><a href="#" className="footer-link">Professional Services</a></li>
                  <li><a href="#" className="footer-link">Status</a></li>
                  <li><a href="#" className="footer-link">Contact GitHub</a></li>
                </ul>
              </div>
              <div className="footer-nav-column">
                <h2 className="footer-heading">Company</h2>
                <ul className="footer-list">
                  <li><a href="#" className="footer-link">About</a></li>
                  <li><a href="#" className="footer-link">Blog</a></li>
                  <li><a href="#" className="footer-link">Careers</a></li>
                  <li><a href="#" className="footer-link">Press</a></li>
                  <li><a href="#" className="footer-link">Inclusion</a></li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
