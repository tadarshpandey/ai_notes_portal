// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',  // change if using LAN IP
});

// ✅ Automatically attach access token before each request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("🔐 Attaching token:", token);

  return config;
}, (error) => Promise.reject(error)

);

export default axiosInstance;
