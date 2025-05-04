const { s3, S3_BUCKET } = require('../config/aws-config');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// List all files from S3 bucket
const listFiles = async (req, res) => {
  try {
    const params = {
      Bucket: S3_BUCKET,
    };

    const data = await s3.listObjectsV2(params).promise();
    
    // Format the response
    const files = data.Contents.map(file => ({
      key: file.Key,
      size: file.Size,
      lastModified: file.LastModified,
      etag: file.ETag
    }));

    res.status(200).json({ files });
  } catch (error) {
    console.error('Error listing files from S3:', error);
    res.status(500).json({ message: 'Failed to list files from S3', error: error.message });
  }
};

// Upload a file to S3 bucket
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileContent = await fs.readFile(req.file.path);
    
    const params = {
      Bucket: S3_BUCKET,
      Key: req.file.originalname,
      Body: fileContent,
      ContentType: req.file.mimetype
    };

    const data = await s3.upload(params).promise();
    
    // Delete the temporary file
    await fs.unlink(req.file.path);

    res.status(200).json({ 
      message: 'File uploaded successfully', 
      fileUrl: data.Location,
      key: data.Key
    });
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    
    // Try to delete the temporary file if it exists
    if (req.file && req.file.path) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting temporary file:', unlinkError);
      }
    }
    
    res.status(500).json({ message: 'Failed to upload file to S3', error: error.message });
  }
};

// Get a file from S3 bucket
const getFile = async (req, res) => {
  try {
    const { key } = req.params;
    
    if (!key) {
      return res.status(400).json({ message: 'File key is required' });
    }

    const params = {
      Bucket: S3_BUCKET,
      Key: key
    };

    const data = await s3.getObject(params).promise();
    
    // Set appropriate headers
    res.setHeader('Content-Type', data.ContentType);
    res.setHeader('Content-Length', data.ContentLength);
    
    // Send the file data
    res.status(200).send(data.Body);
  } catch (error) {
    console.error('Error getting file from S3:', error);
    res.status(500).json({ message: 'Failed to get file from S3', error: error.message });
  }
};

// Delete a file from S3 bucket
const deleteFile = async (req, res) => {
  try {
    const { key } = req.params;
    
    if (!key) {
      return res.status(400).json({ message: 'File key is required' });
    }

    const params = {
      Bucket: S3_BUCKET,
      Key: key
    };

    await s3.deleteObject(params).promise();
    
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file from S3:', error);
    res.status(500).json({ message: 'Failed to delete file from S3', error: error.message });
  }
};

module.exports = {
  listFiles,
  uploadFile,
  getFile,
  deleteFile,
  upload
};
