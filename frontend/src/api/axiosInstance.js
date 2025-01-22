import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://your-api-base-url.com', 
  timeout: 10000, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (!config.url.includes('/login') && !config.url.includes('/signup')) {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return config; 
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
