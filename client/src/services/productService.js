import API from './api';

const productService = {
  getProducts: async (params = {}) => {
    const { data } = await API.get('/products', { params });
    return data;
  },

  getProductById: async (id) => {
    const { data } = await API.get(`/products/${id}`);
    return data;
  },

  createProduct: async (productData) => {
    const { data } = await API.post('/products', productData);
    return data;
  },

  updateProduct: async (id, productData) => {
    const { data } = await API.put(`/products/${id}`, productData);
    return data;
  },

  deleteProduct: async (id) => {
    const { data } = await API.delete(`/products/${id}`);
    return data;
  },

  uploadImage: async (formData) => {
    const { data } = await API.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },
};

export default productService;
