import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  withCredentials: true, // 쿠키 등 필요 시
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
