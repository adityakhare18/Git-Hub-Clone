import React, { useState } from 'react';
import Layout from '../layout/Layout';
import FileUpload from './FileUpload';
import FileList from './FileList';
import './Files.css';

const FilesPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadSuccess = () => {
    // Trigger a refresh of the file list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <Layout>
      <div className="files-page-container">
        <div className="files-page-header">
          <h1 className="files-page-title">S3 File Manager</h1>
          <p className="files-page-description">
            Upload, download, and manage files in your S3 bucket
          </p>
        </div>
        
        <div className="files-page-content">
          <FileUpload onUploadSuccess={handleUploadSuccess} />
          <FileList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </Layout>
  );
};

export default FilesPage;
