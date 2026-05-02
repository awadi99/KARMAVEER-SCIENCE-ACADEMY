// src/api/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  timeout: 8000, 
  
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  }
});

// Sirf Error Handling ke liye interceptor rakhein
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Agar backend 401 bhejta hai (yani cookie expire ho gayi)
    if (error.response?.status === 401) {
      console.warn("Session expired. Redirecting to login...");
      // Aap yahan user ko logout state mein bhej sakte hain
    }
    return Promise.reject(error);
  }
);

export default apiClient;