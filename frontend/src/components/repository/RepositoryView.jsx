import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../authContext';
import Layout from '../layout/Layout';
import './Repository.css';

const RepositoryView = () => {
  const { repoName } = useParams();
  const { currentUser } = useAuth();
  
  const [repository, setRepository] = useState(null);
  const [readme, setReadme] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('code');
  
  useEffect(() => {
    const fetchRepository = async () => {
      try {
        // This would be replaced with actual repository fetching API call
        // const response = await axios.get(`http://localhost:3000/api/repositories/${repoName}`);
        // setRepository(response.data);
        
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockRepo = {
          id: 1,
          name: repoName,
          description: 'A sample repository for demonstration purposes',
          visibility: true, // public
          owner: {
            id: currentUser,
            username: 'username'
          },
          language: 'JavaScript',
          stars: 5,
          forks: 2,
          issues: 3,
          pullRequests: 1,
          updatedAt: new Date().toISOString(),
          files: [
            { name: 'README.md', type: 'file', path: 'README.md' },
            { name: 'package.json', type: 'file', path: 'package.json' },
            { name: 'src', type: 'directory', path: 'src' }
          ]
        };
        
        setRepository(mockRepo);
        
        // Set mock README content
        setReadme(`# ${repoName}\n\nA sample repository for demonstration purposes.\n\n## Features\n\n- Feature 1\n- Feature 2\n- Feature 3\n\n## Installation\n\n\`\`\`bash\nnpm install\n\`\`\`\n\n## Usage\n\n\`\`\`javascript\nconst example = require('example');\nexample.doSomething();\n\`\`\`\n\n## License\n\nMIT`);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching repository:', err);
        setError(err.response?.data?.message || 'Failed to load repository');
        setLoading(false);
      }
    };
    
    fetchRepository();
  }, [repoName, currentUser]);
  
  if (loading) {
    return (
      <Layout>
        <div className="repo-container">
          <div className="dashboard-loading">
            <div className="dashboard-spinner"></div>
            <p>Loading repository...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error) {
    return (
      <Layout>
        <div className="repo-container">
          <div className="dashboard-error">
            <h2>Error</h2>
            <p>{error}</p>
            <button className="repo-button" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!repository) {
    return (
      <Layout>
        <div className="repo-container">
          <div className="repo-view-empty">
            <h2 className="repo-view-empty-title">Repository not found</h2>
            <p className="repo-view-empty-description">
              The repository you're looking for doesn't exist or you don't have access to it.
            </p>
            <Link to="/dashboard" className="repo-button repo-button-primary">
              Go to dashboard
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="repo-container">
        <div className="repo-view-header">
          <h1 className="repo-view-title">
            <Link to={`/user/${repository.owner.username}`}>{repository.owner.username}</Link>
            {' / '}
            <Link to={`/repo/${repository.name}`}>{repository.name}</Link>
            <span className="repo-view-visibility">
              {repository.visibility ? 'Public' : 'Private'}
            </span>
          </h1>
          
          <div className="repo-view-actions">
            <button className="repo-view-button">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path fillRule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
              </svg>
              Fork
            </button>
            <button className="repo-view-button">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path fillRule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
              </svg>
              Star
            </button>
            <button className="repo-view-button">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path fillRule="evenodd" d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z"></path>
              </svg>
              Watch
            </button>
          </div>
        </div>
        
        <div className="repo-view-tabs">
          <div 
            className={`repo-view-tab ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style={{ marginRight: '4px' }}>
              <path fillRule="evenodd" d="M4.72 3.22a.75.75 0 011.06 1.06L2.06 8l3.72 3.72a.75.75 0 11-1.06 1.06L.47 8.53a.75.75 0 010-1.06l4.25-4.25zm6.56 0a.75.75 0 10-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 101.06 1.06l4.25-4.25a.75.75 0 000-1.06l-4.25-4.25z"></path>
            </svg>
            Code
          </div>
          <div 
            className={`repo-view-tab ${activeTab === 'issues' ? 'active' : ''}`}
            onClick={() => setActiveTab('issues')}
          >
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style={{ marginRight: '4px' }}>
              <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
              <path fillRule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
            </svg>
            Issues
            <span style={{ marginLeft: '4px' }}>{repository.issues}</span>
          </div>
          <div 
            className={`repo-view-tab ${activeTab === 'pull-requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('pull-requests')}
          >
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style={{ marginRight: '4px' }}>
              <path fillRule="evenodd" d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"></path>
            </svg>
            Pull requests
            <span style={{ marginLeft: '4px' }}>{repository.pullRequests}</span>
          </div>
        </div>
        
        {activeTab === 'code' && (
          <div className="repo-view-content">
            <div className="repo-view-file-header">
              <div className="repo-view-file-name">README.md</div>
            </div>
            <div className="repo-view-file-content">
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {readme}
              </pre>
            </div>
          </div>
        )}
        
        {activeTab === 'issues' && (
          <div className="repo-view-content">
            <div className="repo-view-empty">
              <h2 className="repo-view-empty-title">No issues yet</h2>
              <p className="repo-view-empty-description">
                Issues are used to track todos, bugs, feature requests, and more.
              </p>
              <button className="repo-button repo-button-primary">
                New issue
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'pull-requests' && (
          <div className="repo-view-content">
            <div className="repo-view-empty">
              <h2 className="repo-view-empty-title">No pull requests yet</h2>
              <p className="repo-view-empty-description">
                Pull requests help you collaborate on code with other people.
              </p>
              <button className="repo-button repo-button-primary">
                New pull request
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RepositoryView;
