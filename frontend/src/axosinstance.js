import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/user', 
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (!['/login', '/signup'].some((path) => config.url.includes(path))) {
      const token = localStorage.getItem('token'); 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
