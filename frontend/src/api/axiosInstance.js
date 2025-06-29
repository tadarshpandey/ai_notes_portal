// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '${process.env.REACT_APP_API_BASE_URL}/api/',  // change if using LAN IP
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
