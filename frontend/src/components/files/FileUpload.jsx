import React, { useState } from 'react';
import axios from 'axios';
import './Files.css';

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError('');
    setSuccess('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setError('');
    setSuccess('');

    // Create form data
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Upload file to server
      const response = await axios.post('http://localhost:3000/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      setSuccess('File uploaded successfully!');
      setFile(null);
      
      // Reset file input
      document.getElementById('file-upload').value = '';
      
      // Call the callback function if provided
      if (onUploadSuccess && typeof onUploadSuccess === 'function') {
        onUploadSuccess(response.data);
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      setError(err.response?.data?.message || 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="file-upload-container">
      <h2 className="file-upload-title">Upload File to S3</h2>
      
      {error && (
        <div className="file-alert file-alert-error">
          <div className="file-alert-icon">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13zm0-11a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 3.5zm0 7a1 1 0 100-2 1 1 0 000 2z"></path>
            </svg>
          </div>
          <div className="file-alert-message">{error}</div>
        </div>
      )}
      
      {success && (
        <div className="file-alert file-alert-success">
          <div className="file-alert-icon">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13z"></path>
              <path fillRule="evenodd" d="M10.97 4.97a.75.75 0 011.06 0l1.5 1.5a.75.75 0 010 1.06l-1.5 1.5a.75.75 0 01-1.06-1.06l.97-.97-.97-.97a.75.75 0 010-1.06z"></path>
              <path fillRule="evenodd" d="M6.03 4.97a.75.75 0 010 1.06l-.97.97.97.97a.75.75 0 01-1.06 1.06l-1.5-1.5a.75.75 0 010-1.06l1.5-1.5a.75.75 0 011.06 0z"></path>
            </svg>
          </div>
          <div className="file-alert-message">{success}</div>
        </div>
      )}
      
      <form className="file-upload-form" onSubmit={handleUpload}>
        <div className="file-upload-input-container">
          <label htmlFor="file-upload" className="file-upload-label">
            <div className="file-upload-icon">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path fillRule="evenodd" d="M8.53 1.22a.75.75 0 00-1.06 0L3.72 4.97a.75.75 0 001.06 1.06l2.47-2.47v6.69a.75.75 0 001.5 0V3.56l2.47 2.47a.75.75 0 101.06-1.06L8.53 1.22zM3.75 13a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z"></path>
              </svg>
            </div>
            <span>Choose file</span>
            <input
              type="file"
              id="file-upload"
              className="file-upload-input"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>
          <div className="file-name">
            {file ? file.name : 'No file selected'}
          </div>
        </div>
        
        <button
          type="submit"
          className="file-upload-button"
          disabled={!file || uploading}
        >
          {uploading ? 'Uploading...' : 'Upload to S3'}
        </button>
      </form>
      
      {uploading && (
        <div className="file-upload-progress-container">
          <div className="file-upload-progress-bar">
            <div
              className="file-upload-progress-fill"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <div className="file-upload-progress-text">
            {uploadProgress}%
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
