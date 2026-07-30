import API from './api';

const orderService = {
  createOrder: async (orderData) => {
    const { data } = await API.post('/orders', orderData);
    return data;
  },

  getMyOrders: async () => {
    const { data } = await API.get('/orders/my');
    return data;
  },

  getAllOrders: async () => {
    const { data } = await API.get('/orders');
    return data;
  },

  updateOrderStatus: async (id, status) => {
    const { data } = await API.put(`/orders/${id}`, { status });
    return data;
  },

  deleteOrder: async (id) => {
    const { data } = await API.delete(`/orders/${id}`);
    return data;
  },
};

export default orderService;
