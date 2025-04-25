import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../authContext';
import Layout from '../layout/Layout';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/getUserProfile?userId=${currentUser}`);
        setUserData(response.data);

        // Fetch repositories if available
        if (response.data.repositories && response.data.repositories.length > 0) {
          // This would be replaced with actual repository fetching logic
          setRepositories([
            { id: 1, name: 'example-repo', description: 'An example repository', language: 'JavaScript', stars: 5, forks: 2, updatedAt: '2023-06-15T10:30:00Z' },
            { id: 2, name: 'another-project', description: 'Another cool project', language: 'Python', stars: 3, forks: 1, updatedAt: '2023-05-20T14:45:00Z' }
          ]);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data');
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  if (loading) {
    return (
      <Layout>
        <div className="dashboard-loading">
          <div className="dashboard-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="dashboard-error">
          <h2>Error</h2>
          <p>{error}</p>
          <button className="dashboard-button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <div className="profile-card">
            <div className="profile-avatar">
              <svg height="64" width="64" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            </div>
            <h2 className="profile-name">{userData?.username || 'User'}</h2>
            <p className="profile-username">@{userData?.username || 'username'}</p>
            <button className="profile-edit-button">Edit profile</button>

            <div className="profile-stats">
              <div className="profile-stat">
                <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                  <path fillRule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"></path>
                </svg>
                <span>{userData?.followedUsers?.length || 0} followers</span>
              </div>
              <div className="profile-stat">
                <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                  <path fillRule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"></path>
                </svg>
                <span>0 following</span>
              </div>
            </div>
          </div>

          <nav className="dashboard-nav">
            <ul className="dashboard-nav-list">
              <li className="dashboard-nav-item active">
                <a href="#" className="dashboard-nav-link">
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                    <path fillRule="evenodd" d="M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm8.755 3a2.25 2.25 0 012.25-2.25H14.5v9h-3.757c-.71 0-1.4.201-1.992.572l.004-7.322zm-1.504 7.324l.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9h3.757a3.75 3.75 0 011.994.574z"></path>
                  </svg>
                  Overview
                </a>
              </li>
              <li className="dashboard-nav-item">
                <a href="#" className="dashboard-nav-link">
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                    <path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
                  </svg>
                  Repositories
                </a>
              </li>
              <li className="dashboard-nav-item">
                <a href="#" className="dashboard-nav-link">
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                    <path fillRule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM6.379 5.227A.25.25 0 006 5.442v5.117a.25.25 0 00.379.214l4.264-2.559a.25.25 0 000-.428L6.379 5.227z"></path>
                  </svg>
                  Projects
                </a>
              </li>
              <li className="dashboard-nav-item">
                <a href="#" className="dashboard-nav-link">
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                    <path fillRule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                  </svg>
                  Stars
                </a>
              </li>
              <li className="dashboard-nav-item">
                <Link to="/files" className="dashboard-nav-link">
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                    <path fillRule="evenodd" d="M1.75 1.5a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25H1.75zM0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75zm9.22 3.72a.75.75 0 000 1.06L10.69 8 9.22 9.47a.75.75 0 101.06 1.06l2-2a.75.75 0 000-1.06l-2-2a.75.75 0 00-1.06 0zM6.78 6.53a.75.75 0 00-1.06-1.06l-2 2a.75.75 0 000 1.06l2 2a.75.75 0 101.06-1.06L5.31 8l1.47-1.47z"></path>
                  </svg>
                  S3 Files
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="dashboard-main">
          <div className="dashboard-header">
            <h1 className="dashboard-title">My Dashboard</h1>
            <div className="dashboard-actions">
              <Link to="/new" className="dashboard-button dashboard-button-primary">
                <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                  <path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
                </svg>
                New Repository
              </Link>
            </div>
          </div>

          <div className="dashboard-content">
            {repositories.length > 0 ? (
              <div className="repository-list">
                <h2 className="section-title">Your Repositories</h2>
                {repositories.map(repo => (
                  <div key={repo.id} className="repository-card">
                    <div className="repository-info">
                      <h3 className="repository-name">
                        <Link to={`/repo/${repo.name}`}>{repo.name}</Link>
                      </h3>
                      <p className="repository-description">{repo.description}</p>
                      <div className="repository-meta">
                        {repo.language && (
                          <span className="repository-language">
                            <span className="language-color" style={{ backgroundColor: getLanguageColor(repo.language) }}></span>
                            {repo.language}
                          </span>
                        )}
                        {repo.stars > 0 && (
                          <span className="repository-stat">
                            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                              <path fillRule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
                            </svg>
                            {repo.stars}
                          </span>
                        )}
                        {repo.forks > 0 && (
                          <span className="repository-stat">
                            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                              <path fillRule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                            </svg>
                            {repo.forks}
                          </span>
                        )}
                        <span className="repository-updated">
                          Updated {formatDate(repo.updatedAt)}
                        </span>
                      </div>
                    </div>
                    <div className="repository-actions">
                      <button className="repository-star-button">
                        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                          <path fillRule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                        </svg>
                        Star
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h2 className="empty-state-title">You don't have any repositories yet!</h2>
                <p className="empty-state-description">
                  Repositories are where you store your code and collaborate with others.
                </p>
                <Link to="/new" className="dashboard-button dashboard-button-primary">
                  Create a new repository
                </Link>
              </div>
            )}

            <div className="activity-section">
              <h2 className="section-title">Recent Activity</h2>
              <div className="activity-timeline">
                <div className="activity-item">
                  <div className="activity-icon">
                    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                      <path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
                    </svg>
                  </div>
                  <div className="activity-content">
                    <p className="activity-text">
                      You created a new repository <a href="#" className="activity-link">example-repo</a>
                    </p>
                    <span className="activity-time">2 days ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">
                    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                      <path fillRule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
                    </svg>
                  </div>
                  <div className="activity-content">
                    <p className="activity-text">
                      You starred <a href="#" className="activity-link">another-project</a>
                    </p>
                    <span className="activity-time">1 week ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Helper functions
const getLanguageColor = (language) => {
  const colors = {
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Java: '#b07219',
    TypeScript: '#2b7489',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Ruby: '#701516',
    Go: '#00ADD8',
    PHP: '#4F5D95',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    Rust: '#dea584',
  };

  return colors[language] || '#8b949e';
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return 'yesterday';
  } else if (diffDays < 30) {
    return `${diffDays} days ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
};

export default Dashboard;
