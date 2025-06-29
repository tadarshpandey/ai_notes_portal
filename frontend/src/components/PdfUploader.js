// src/components/PdfUploader.js
import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const PdfUploader = ({ onExtractedText }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [extractedText, setExtractedText] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setExtractedText('');
  };

  const handleUpload = async () => {
    if (!file || !file.name.endsWith('.pdf')) {
      alert("Please select a valid PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);

    try {
      const response = await axiosInstance.post('upload-pdf/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const extracted = response.data.extracted_text;
      setExtractedText(extracted);
      onExtractedText?.(extracted); // optional callback to share with parent
    } catch (err) {
      console.error('❌ PDF upload failed:', err);
      alert("Failed to extract text from PDF.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <h5 style={{ textAlign: 'left' }}>Upload PDF to Extract Text:</h5>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button className="btn btn-success ms-2" onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload & Extract'}
      </button>

      {/* {extractedText && (
        <div className="mt-3">
          <h6>Extracted Text:</h6>
          <textarea className="form-control" rows="8" value={extractedText} readOnly />
        </div>
      )} */}
    </div>
  );
};

export default PdfUploader;
