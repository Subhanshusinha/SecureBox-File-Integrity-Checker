import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [uploadedHash, setUploadedHash] = useState('');
  const [originalHash, setOriginalHash] = useState('');
  const [compareResult, setCompareResult] = useState('');
  const [hashResult, setHashResult] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file.');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData);
      setUploadedHash(res.data.hash);
      setHashResult(`✅ SHA-256 Hash Generated: ${res.data.hash}`);
      setCompareResult('');
    } catch (err) {
      console.error(err);
      setHashResult('❌ Error uploading file');
    }
  };

  const handleCompare = () => {
    if (!originalHash || !uploadedHash) {
      setCompareResult('⚠️ Please provide both uploaded and original hash.');
      return;
    }

    if (originalHash.trim() === uploadedHash) {
      setCompareResult(
        <div className="alert alert-success">
          ✅ <strong>Hash Match!</strong><br />
          The uploaded file has not been modified.
        </div>
      );
    } else {
      setCompareResult(
        <div className="alert alert-danger">
          ❌ <strong>Hash Mismatch!</strong><br />
          The file may have been changed or tampered with.
        </div>
      );
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="text-primary fw-bold">🔐 SecureBox File Integrity Checker</h1>
      </div>
      <div className="card shadow p-4">
        <form onSubmit={handleUpload}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Choose File</label>
            <input className="form-control" type="file" onChange={(e) => setFile(e.target.files[0])} required />
          </div>
          <button className="btn btn-primary w-100 mb-3" type="submit">Upload & Hash</button>
          <div className="text-center fw-semibold text-success">{hashResult}</div>
          <hr className="my-4" />
          <div className="mb-3">
            <label className="form-label fw-semibold">Enter Original Hash to Compare</label>
            <input className="form-control" type="text" value={originalHash} onChange={(e) => setOriginalHash(e.target.value)} />
          </div>
          <button className="btn btn-secondary w-100" type="button" onClick={handleCompare}>Compare Hash</button>
          <div className="text-center fw-bold mt-3">{compareResult}</div>
        </form>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
