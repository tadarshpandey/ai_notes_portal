import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [resetLink, setResetLink] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/password-reset/', {
        email,
        redirect_url: window.location.origin + '/reset-password',
      });
      setResetLink(res.data.reset_link);
      setError('');
    } catch (err) {
      setError('User not found or error occurred.');
      setResetLink(null);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
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
        <div className="mt-4">
          <p className="text-green-700">Reset Link:</p>
          <a href={resetLink} className="text-blue-500 underline">{resetLink}</a>
        </div>
      )}

      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
};

export default ForgotPassword;
