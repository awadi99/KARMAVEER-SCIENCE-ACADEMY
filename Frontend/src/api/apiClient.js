import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  timeout: 8000, 
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  }
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Agar 401 aaye, toh bas error pass kar do. 
    // Isse loop nahi banega kyunki hum zabardasti reload nahi kar rahe.
    if (error.response?.status === 401) {
      console.warn("Unauthorized request caught by interceptor.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;