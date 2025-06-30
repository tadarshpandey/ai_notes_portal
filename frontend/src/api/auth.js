// src/api/auth.js
import axiosInstance from './axiosInstance';
import axios from 'axios';

// Make sure to define REACT_APP_API_BASE_URL in Render frontend environment variables
const API_URL = process.env.REACT_APP_API_BASE_URL.replace(/\/+$/, "") + "/api"; // Removes trailing slash

// Use raw axios for unauthenticated endpoints
export const register = (userData) => {
  return axios.post(`${API_URL}/register/`, userData);
};

export const login = (credentials) => {
  return axios.post(`${API_URL}/token/`, credentials);
};

export const refreshToken = (refresh) => {
  return axios.post(`${API_URL}/token/refresh/`, { refresh });
};
