import API from './api';

const authService = {
  register: async (userData) => {
    const { data } = await API.post('/auth/register', userData);
    return data;
  },

  login: async (credentials) => {
    const { data } = await API.post('/auth/login', credentials);
    return data;
  },

  getProfile: async () => {
    const { data } = await API.get('/auth/me');
    return data;
  },

  updateProfile: async (userData) => {
    const { data } = await API.put('/auth/profile', userData);
    return data;
  },
};

export default authService;
