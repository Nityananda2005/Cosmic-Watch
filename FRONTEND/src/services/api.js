import axios from 'axios';

// Production: use VITE_API_URL (backend Vercel URL). Development: localhost
const BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // Preferred standard header
            config.headers['Authorization'] = `Bearer ${token}`;
            // Backwards-compatibility with existing backend middleware
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
