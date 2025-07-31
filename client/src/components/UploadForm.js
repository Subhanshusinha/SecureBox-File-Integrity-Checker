import React, { useState } from 'react';
import axios from 'axios';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData);
      setMessage(res.data.message || 'File uploaded successfully!');
    } catch (error) {
      setMessage('Upload failed.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Secure File Upload</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="form-control my-3" />
      <button onClick={handleUpload} className="btn btn-primary">Upload</button>
      <p className="mt-3">{message}</p>
    </div>
  );
}

export default UploadForm;
