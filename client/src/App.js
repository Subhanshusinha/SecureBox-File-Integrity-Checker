// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState('');
  const [originalHash, setOriginalHash] = useState('');
  const [matchResult, setMatchResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setHash('');
    setMatchResult('');
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file.');
      return;
    }

    setLoading(true);
    setError('');
    setMatchResult('');
    setHash('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData);
      setHash(response.data.hash);
    } catch (err) {
      console.error(err);
      setError('Error uploading file. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = () => {
    if (!originalHash || !hash) {
      setError('Both uploaded hash and original hash are required.');
      return;
    }

    if (originalHash.trim().toLowerCase() === hash.toLowerCase()) {
      setMatchResult('✔️ Hash Matched');
    } else {
      setMatchResult('❌ Hash Not Matched');
    }
  };

  return (
    <div className="container mt-5 p-4 border rounded shadow bg-light">
      <h2 className="text-center mb-4">SecureBox File Integrity Checker</h2>

      <div className="mb-3">
        <label className="form-label">Choose File:</label>
        <input type="file" className="form-control" onChange={handleFileChange} />
      </div>

      <button className="btn btn-primary w-100 mb-3" onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload & Hash'}
      </button>

      {error && <div className="alert alert-danger">{error}</div>}
      {hash && (
        <div className="alert alert-success">
          <strong>Generated SHA-256 Hash:</strong> <br /> {hash}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Enter Original Hash to Compare:</label>
        <input
          type="text"
          className="form-control"
          value={originalHash}
          onChange={(e) => setOriginalHash(e.target.value)}
        />
      </div>

      <button className="btn btn-success w-100 mb-3" onClick={handleCompare}>
        Compare Hash
      </button>

      {matchResult && (
        <div
          className={`alert ${matchResult.includes('✔️') ? 'alert-success' : 'alert-danger'}`}
        >
          {matchResult}
        </div>
      )}
    </div>
  );
}

export default App;
