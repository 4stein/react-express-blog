import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/',
});

instance.interceptors.request.use((config: any) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;
