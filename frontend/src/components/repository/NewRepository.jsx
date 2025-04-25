import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../authContext';
import Layout from '../layout/Layout';
import './Repository.css';

const NewRepository = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [readme, setReadme] = useState(true);
  const [gitignore, setGitignore] = useState('');
  const [license, setLicense] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  
  const validateName = (value) => {
    if (!value) {
      setNameError('Repository name is required');
      return false;
    }
    
    if (!/^[a-zA-Z0-9_.-]+$/.test(value)) {
      setNameError('Repository name can only contain letters, numbers, hyphens, underscores, and periods');
      return false;
    }
    
    setNameError('');
    return true;
  };
  
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    validateName(value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateName(name)) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      
      navigate(`/repo/${name}`);
    } catch (err) {
      console.error('Error creating repository:', err);
      setError(err.response?.data?.message || 'Failed to create repository');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="repo-container">
        <div className="repo-header">
          <h1 className="repo-title">Create a new repository</h1>
          <p className="repo-subtitle">A repository contains all project files, including the revision history.</p>
        </div>
        
        {error && (
          <div className="repo-alert repo-alert-error">
            <div className="repo-alert-icon">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13zm0-11a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 3.5zm0 7a1 1 0 100-2 1 1 0 000 2z"></path>
              </svg>
            </div>
            <div className="repo-alert-message">{error}</div>
          </div>
        )}
        
        <form className="repo-form" onSubmit={handleSubmit}>
          <div className="repo-form-section">
            <div className="repo-form-group">
              <label htmlFor="owner" className="repo-label">Owner</label>
              <select id="owner" className="repo-select" defaultValue={currentUser}>
                <option value={currentUser}>Your Username</option>
              </select>
            </div>
            
            <div className="repo-form-group">
              <label htmlFor="name" className="repo-label">
                Repository name <span className="repo-required">*</span>
              </label>
              <input
                type="text"
                id="name"
                className={`repo-input ${nameError ? 'repo-input-error' : ''}`}
                value={name}
                onChange={handleNameChange}
                required
              />
              {nameError && <p className="repo-error-message">{nameError}</p>}
            </div>
            
            <div className="repo-form-group">
              <label htmlFor="description" className="repo-label">Description (optional)</label>
              <input
                type="text"
                id="description"
                className="repo-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short description of your repository"
              />
            </div>
          </div>
          
          <div className="repo-form-section">
            <div className="repo-form-group">
              <label className="repo-label">Visibility</label>
              <div className="repo-radio-group">
                <label className="repo-radio-label">
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={visibility === 'public'}
                    onChange={() => setVisibility('public')}
                    className="repo-radio"
                  />
                  <div className="repo-radio-text">
                    <strong>Public</strong>
                    <span>Anyone on the internet can see this repository. You choose who can commit.</span>
                  </div>
                </label>
                <label className="repo-radio-label">
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={visibility === 'private'}
                    onChange={() => setVisibility('private')}
                    className="repo-radio"
                  />
                  <div className="repo-radio-text">
                    <strong>Private</strong>
                    <span>You choose who can see and commit to this repository.</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
          
          <div className="repo-form-section">
            <div className="repo-form-group">
              <label className="repo-label">Initialize this repository with:</label>
              <div className="repo-checkbox-group">
                <label className="repo-checkbox-label">
                  <input
                    type="checkbox"
                    checked={readme}
                    onChange={() => setReadme(!readme)}
                    className="repo-checkbox"
                  />
                  <div className="repo-checkbox-text">
                    <strong>Add a README file</strong>
                    <span>This is where you can write a long description for your project.</span>
                  </div>
                </label>
              </div>
              
              <div className="repo-select-group">
                <label htmlFor="gitignore" className="repo-label">Add .gitignore</label>
                <select
                  id="gitignore"
                  className="repo-select"
                  value={gitignore}
                  onChange={(e) => setGitignore(e.target.value)}
                >
                  <option value="">None</option>
                  <option value="Node">Node</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="Ruby">Ruby</option>
                  <option value="Go">Go</option>
                </select>
              </div>
              
              <div className="repo-select-group">
                <label htmlFor="license" className="repo-label">Add a license</label>
                <select
                  id="license"
                  className="repo-select"
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                >
                  <option value="">None</option>
                  <option value="MIT">MIT License</option>
                  <option value="Apache">Apache License 2.0</option>
                  <option value="GPL">GNU General Public License v3.0</option>
                  <option value="BSD">BSD 3-Clause License</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="repo-form-actions">
            <button
              type="submit"
              className="repo-button repo-button-primary"
              disabled={loading || !name}
            >
              {loading ? 'Creating repository...' : 'Create repository'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default NewRepository;
