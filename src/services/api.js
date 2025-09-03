import axios from 'axios';
import { getToken, logout } from './auth';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach token
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle 401/403
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      // clear token and force redirect to login
      logout();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
