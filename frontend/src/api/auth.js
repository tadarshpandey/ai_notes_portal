// src/api/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const register = (userData) => {
  return axios.post(`${API_URL}/register/`, userData);
};

export const login = (credentials) => {
  return axios.post(`${API_URL}/token/`, credentials);
};

export const refreshToken = (refresh) => {
  return axios.post(`${API_URL}/token/refresh/`, { refresh });
};
/**
import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const login = (form) => {
  return axios.post(`${BASE_URL}/api/token/`, form, {
    headers: {
      'Content-Type': 'application/json'
    }
    // DO NOT set withCredentials here for JWT
  });
};

export const register = (form) => {
  return axios.post(`${BASE_URL}/api/register/`, form, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}; */
