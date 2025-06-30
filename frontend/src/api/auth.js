// src/api/auth.js
import axiosInstance from './axiosInstance';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const register = (userData) => {
  return axios.post(`${API_URL}register/`, userData);
};

export const login = (credentials) => {
  return axios.post(`${API_URL}token/`, credentials);
};

export const refreshToken = (refresh) => {
  return axios.post(`${API_URL}token/refresh/`, { refresh });
};
