import API from './api';

const settingService = {
  getSettings: async () => {
    const { data } = await API.get('/settings');
    return data;
  },

  updateSetting: async (key, value) => {
    const { data } = await API.post('/settings', { key, value });
    return data;
  },
};

export default settingService;
