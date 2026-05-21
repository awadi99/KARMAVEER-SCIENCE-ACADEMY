import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.karmaveerscienceacademy.in/api',
  timeout: 8000, 
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  }
});

// ✅ NEW: Attach JWT token for Google OAuth users
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized request caught by interceptor.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;