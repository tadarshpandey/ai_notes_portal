import axiosInstance from './axiosInstance';

// For login, we use raw axios because no token yet
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

export const register = (userData) => {
  return axios.post(`${API_URL}register/`, userData);
};

export const login = (credentials) => {
  return axios.post(`${API_URL}token/`, credentials);
};

export const refreshToken = (refresh) => {
  return axios.post(`${API_URL}token/refresh/`, { refresh });
};
