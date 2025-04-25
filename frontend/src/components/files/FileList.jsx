import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Files.css';

const FileList = ({ refreshTrigger }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchFiles();
  }, [refreshTrigger]);

  const fetchFiles = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get('http://localhost:3000/api/files/list');
      setFiles(response.data.files || []);
    } catch (err) {
      console.error('Error fetching files:', err);
      setError('Failed to fetch files from S3');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (key) => {
    if (!window.confirm('Are you sure you want to delete this file?')) {
      return;
    }

    setDeleting(key);
    setError('');

    try {
      await axios.delete(`http://localhost:3000/api/files/${encodeURIComponent(key)}`);
      // Remove the file from the list
      setFiles(files.filter(file => file.key !== key));
    } catch (err) {
      console.error('Error deleting file:', err);
      setError('Failed to delete file');
    } finally {
      setDeleting(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getFileIcon = (key) => {
    const extension = key.split('.').pop().toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return (
          <svg viewBox="0 0 16 16" width="16" height="16" fill="#f40f02">
            <path fillRule="evenodd" d="M14 4.5V14a2 2 0 01-2 2h-1v-1h1a1 1 0 001-1V4.5h-2A1.5 1.5 0 019.5 3V1H4a1 1 0 00-1 1v9H2V2a2 2 0 012-2h5.5L14 4.5zM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 00.161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 00-.46-.477c-.2-.12-.443-.179-.732-.179zm.545 1.333a.795.795 0 01-.085.38.574.574 0 01-.238.241.794.794 0 01-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 00.595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 00-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 01.354.454c.079.201.118.452.118.753a2.3 2.3 0 01-.068.592 1.14 1.14 0 01-.196.422.8.8 0 01-.334.252 1.298 1.298 0 01-.483.082h-.563v-2.707zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896z"></path>
          </svg>
        );
      case 'doc':
      case 'docx':
        return (
          <svg viewBox="0 0 16 16" width="16" height="16" fill="#295396">
            <path fillRule="evenodd" d="M14 4.5V14a2 2 0 01-2 2H7v-1h5a1 1 0 001-1V4.5h-2A1.5 1.5 0 019.5 3V1H4a1 1 0 00-1 1v9H2V2a2 2 0 012-2h5.5L14 4.5zM7.168 11.95c0-.297.232-.52.5-.52.271 0 .5.231.5.52 0 .287-.229.52-.5.52-.268 0-.5-.233-.5-.52zm-2.422.52c.036 0 .071-.006.105-.019l.57.569a.5.5 0 00.707-.707l-.57-.57a.374.374 0 01.019-.105c.06-.295.345-.51.65-.51.325 0 .612.224.658.533.046.282-.067.56-.304.68-.118.059-.257.087-.4.087-.5 0-.833-.448-.833-.993 0-.553.337-1.007.833-1.007.407 0 .736.267.82.638h-.737a.147.147 0 00-.147.146.5.5 0 00.5.5h.736a.873.873 0 01-.59.589.66.66 0 01-.082.007.5.5 0 00-.5.5c0 .21.129.388.311.465.176.074.385.021.541-.121.155-.142.22-.385.164-.614a.5.5 0 00-.5-.5 1.334 1.334 0 01-.246-.025c.056-.036.11-.078.163-.12.17-.131.24-.337.196-.536-.044-.201-.208-.336-.396-.336-.19 0-.354.135-.397.336-.044.199.026.405.195.537.052.04.106.082.163.119a1.243 1.243 0 01-.247.026.5.5 0 00-.5.5c0 .21.129.388.311.465.176.074.385.021.541-.12.155-.143.22-.386.164-.615a.5.5 0 00-.5-.5h-.003zm3.747.25h-.5a.75.75 0 110-1.5h.5a.75.75 0 110 1.5z"></path>
          </svg>
        );
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return (
          <svg viewBox="0 0 16 16" width="16" height="16" fill="#f1662a">
            <path fillRule="evenodd" d="M1.75 2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V4.664a.25.25 0 00-.073-.177l-2.914-2.914a.25.25 0 00-.177-.073H1.75zM5 8.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm6.75-4a.75.75 0 00-.75.75v5.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75v-5.5a.75.75 0 00-.75-.75h-1.5zm-3 0a.75.75 0 00-.75.75v5.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75v-5.5a.75.75 0 00-.75-.75h-1.5z"></path>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 16 16" width="16" height="16" fill="#8b949e">
            <path fillRule="evenodd" d="M3.75 1.5a.25.25 0 00-.25.25v11.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25V6H9.75A1.75 1.75 0 018 4.25V1.5H3.75zm5.75.56v2.19c0 .138.112.25.25.25h2.19L9.5 2.06zM2 1.75C2 .784 2.784 0 3.75 0h5.086c.464 0 .909.184 1.237.513l3.414 3.414c.329.328.513.773.513 1.237v8.086A1.75 1.75 0 0112.25 15h-8.5A1.75 1.75 0 012 13.25V1.75z"></path>
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className="file-list-container">
        <h2 className="file-list-title">Files in S3 Bucket</h2>
        <div className="file-list-loading">
          <div className="file-list-spinner"></div>
          <p>Loading files...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="file-list-container">
      <h2 className="file-list-title">Files in S3 Bucket</h2>
      
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
      
      {files.length === 0 ? (
        <div className="file-list-empty">
          <div className="file-list-empty-icon">
            <svg viewBox="0 0 16 16" width="24" height="24" fill="#8b949e">
              <path fillRule="evenodd" d="M1.75 1.5a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25H1.75zM0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75zm9.22 3.72a.75.75 0 000 1.06L10.69 8 9.22 9.47a.75.75 0 101.06 1.06l2-2a.75.75 0 000-1.06l-2-2a.75.75 0 00-1.06 0zM6.78 6.53a.75.75 0 00-1.06-1.06l-2 2a.75.75 0 000 1.06l2 2a.75.75 0 101.06-1.06L5.31 8l1.47-1.47z"></path>
            </svg>
          </div>
          <p className="file-list-empty-text">No files found in the S3 bucket</p>
          <button className="file-list-refresh" onClick={fetchFiles}>
            Refresh
          </button>
        </div>
      ) : (
        <>
          <div className="file-list-header">
            <div className="file-list-refresh-container">
              <button className="file-list-refresh" onClick={fetchFiles}>
                <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4V1.5l-4 4 4 4V7c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4H2c0 3.31 2.69 6 6 6s6-2.69 6-6-2.69-6-6-6z"></path>
                </svg>
                Refresh
              </button>
            </div>
            <div className="file-list-count">
              {files.length} {files.length === 1 ? 'file' : 'files'}
            </div>
          </div>
          
          <div className="file-list">
            <div className="file-list-table-header">
              <div className="file-list-cell file-name-cell">Name</div>
              <div className="file-list-cell file-size-cell">Size</div>
              <div className="file-list-cell file-date-cell">Last Modified</div>
              <div className="file-list-cell file-actions-cell">Actions</div>
            </div>
            
            {files.map((file) => (
              <div key={file.key} className="file-list-item">
                <div className="file-list-cell file-name-cell">
                  <div className="file-icon">
                    {getFileIcon(file.key)}
                  </div>
                  <div className="file-name-text">
                    {file.key.split('/').pop()}
                  </div>
                </div>
                <div className="file-list-cell file-size-cell">
                  {formatFileSize(file.size)}
                </div>
                <div className="file-list-cell file-date-cell">
                  {formatDate(file.lastModified)}
                </div>
                <div className="file-list-cell file-actions-cell">
                  <a
                    href={`http://localhost:3000/api/files/${encodeURIComponent(file.key)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="file-action-button file-download-button"
                    title="Download"
                  >
                    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                      <path fillRule="evenodd" d="M7.47 10.78a.75.75 0 001.06 0l3.75-3.75a.75.75 0 00-1.06-1.06L8.75 8.44V1.75a.75.75 0 00-1.5 0v6.69L4.78 5.97a.75.75 0 00-1.06 1.06l3.75 3.75zM3.75 13a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z"></path>
                    </svg>
                  </a>
                  <button
                    className="file-action-button file-delete-button"
                    onClick={() => handleDelete(file.key)}
                    disabled={deleting === file.key}
                    title="Delete"
                  >
                    {deleting === file.key ? (
                      <div className="file-delete-spinner"></div>
                    ) : (
                      <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                        <path fillRule="evenodd" d="M6.5 1.75a.25.25 0 01.25-.25h2.5a.25.25 0 01.25.25V3h-3V1.75zm4.5 0V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675a.75.75 0 10-1.492.15l.66 6.6A1.75 1.75 0 005.405 15h5.19c.9 0 1.652-.681 1.741-1.576l.66-6.6a.75.75 0 00-1.492-.149l-.66 6.6a.25.25 0 01-.249.225h-5.19a.25.25 0 01-.249-.225l-.66-6.6z"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FileList;
