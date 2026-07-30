import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Add an artificial delay to prevent the loading screen from glitching/flashing too fast
API.interceptors.response.use(
  async (response) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return response;
  },
  async (error) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return Promise.reject(error);
  }
);

export default API;
