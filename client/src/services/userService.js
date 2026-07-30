import API from './api';

const userService = {
  getAllUsers: async () => {
    const { data } = await API.get('/users');
    return data;
  },

  deleteUser: async (id) => {
    const { data } = await API.delete(`/users/${id}`);
    return data;
  },

  updateUserRole: async (id, role) => {
    const { data } = await API.put(`/users/${id}`, { role });
    return data;
  },
};

export default userService;
