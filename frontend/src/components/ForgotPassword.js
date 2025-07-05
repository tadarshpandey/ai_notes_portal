import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [resetLink, setResetLink] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/password-reset/', {
        email,
        username,
        redirect_url: window.location.origin + '/reset-password',
      });
      setResetLink(res.data.reset_link);
      setError('');
    } catch (err) {
      setError('No user found or invalid input.');
      setResetLink(null);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full p-2 border mb-3"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          className="w-full p-2 border mb-3"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-black px-4 py-2">Get Reset Link</button>
      </form>

      {resetLink && (
        <div className="mt-4 text-sm">
          <p className="text-green-700 mb-1">Reset Link (dev/demo only):</p>
          <a href={resetLink} className="text-blue-500 underline">{resetLink}</a>
        </div>
      )}

      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
};

export default ForgotPassword;
