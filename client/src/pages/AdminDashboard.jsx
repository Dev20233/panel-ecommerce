import { useState, useEffect } from 'react';
import { HiOutlineCube, HiOutlineClipboardList, HiOutlineUsers, HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineX, HiOutlineCheck } from 'react-icons/hi';
import productService from '../services/productService';
import orderService from '../services/orderService';
import userService from '../services/userService';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '', description: '', price: '', category: 'Comics',
    image: '', stock: '', sizes: '', featured: false, trending: false, newArrival: false,
    releaseDate: new Date().toISOString().split('T')[0],
  });
  const [imageFile, setImageFile] = useState(null);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsData, ordersData, usersData] = await Promise.all([
        productService.getProducts(),
        orderService.getAllOrders(),
        userService.getAllUsers(),
      ]);
      setProducts(productsData);
      setOrders(ordersData);
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: '', description: '', price: '', category: 'Comics',
      image: '', stock: '', sizes: '', featured: false, trending: false, newArrival: false,
      releaseDate: new Date().toISOString().split('T')[0],
    });
    setImageFile(null);
    setFormError('');
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      stock: product.stock.toString(),
      sizes: product.sizes.join(', '),
      featured: product.featured,
      trending: product.trending,
      newArrival: product.newArrival,
      releaseDate: product.releaseDate ? new Date(product.releaseDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    });
    setImageFile(null);
    setFormError('');
    setShowModal(true);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      let imageUrl = productForm.image;
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadData = await productService.uploadImage(formData);
        imageUrl = uploadData.image;
      }

      const data = {
        ...productForm,
        image: imageUrl,
        price: Number(productForm.price),
        stock: Number(productForm.stock),
        sizes: productForm.sizes ? productForm.sizes.split(',').map((s) => s.trim()).filter(Boolean) : [],
        releaseDate: productForm.releaseDate,
      };

      if (editingProduct) {
        await productService.updateProduct(editingProduct._id, data);
      } else {
        await productService.createProduct(data);
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleOrderStatus = async (id, status) => {
    try {
      await orderService.updateOrderStatus(id, status);
      fetchData();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await orderService.deleteOrder(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(id);
        fetchData();
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const handleUserRole = async (id, role) => {
    try {
      await userService.updateUserRole(id, role);
      fetchData();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  if (loading) return <div className="min-h-screen bg-white"></div>;

  const tabs = [
    { id: 'products', label: 'Products', icon: HiOutlineCube, count: products.length },
    { id: 'orders', label: 'Orders', icon: HiOutlineClipboardList, count: orders.length },
    { id: 'users', label: 'Users', icon: HiOutlineUsers, count: users.length },
  ];

  const statusColors = {
    Processing: 'bg-yellow-50 text-yellow-800',
    Shipped: 'bg-blue-50 text-blue-800',
    Delivered: 'bg-green-50 text-green-800',
    Cancelled: 'bg-red-50 text-red-800',
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-manga tracking-widest uppercase mb-12 border-b-8 border-black pb-4 inline-block transform -rotate-1 bg-yellow-300 px-4 shadow-manga">ADMIN DASHBOARD</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-6 text-left transition-all duration-300 border-4 border-black shadow-manga transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-none ${
                activeTab === tab.id ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              <tab.icon size={32} className="mb-4" strokeWidth={2} />
              <p className="text-4xl font-manga mb-2">{tab.count}</p>
              <p className="text-xl font-manga tracking-widest uppercase">{tab.label}</p>
            </button>
          ))}
        </div>

        {/* Products Tab */}
        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="manga-box bg-white p-6 shadow-manga mb-12">
            <div className="flex items-center justify-between pb-6 border-b-4 border-black mb-6">
              <h2 className="text-2xl font-manga tracking-widest uppercase">ALL PRODUCTS</h2>
              <button onClick={openAddModal} className="btn-primary text-lg flex items-center gap-2 px-4 py-2 bg-yellow-300 text-black border-4 border-black hover:bg-black hover:text-white">
                <HiOutlinePlus size={20} strokeWidth={3} /> ADD PRODUCT
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full font-bold">
                <thead>
                  <tr className="border-b-4 border-black text-xl font-manga tracking-widest uppercase">
                    <th className="text-left p-4">PRODUCT</th>
                    <th className="text-left p-4">CATEGORY</th>
                    <th className="text-left p-4">PRICE</th>
                    <th className="text-left p-4">STOCK</th>
                    <th className="text-right p-4">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b-2 border-black last:border-0 hover:bg-gray-100 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <img src={product.image} alt={product.name} className="w-12 h-16 object-cover border-2 border-black" />
                          <span className="text-lg font-manga">{product.name}</span>
                        </div>
                      </td>
                      <td className="p-4 uppercase text-sm">{product.category}</td>
                      <td className="p-4 text-lg font-manga">₹{product.price.toLocaleString('en-IN')}</td>
                      <td className="p-4">
                        <span className={`text-lg font-manga ${product.stock === 0 ? 'bg-red-500 text-white px-2 py-1 transform skew-x-12 inline-block' : ''}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-4">
                          <button onClick={() => openEditModal(product)} className="p-2 border-2 border-transparent hover:border-black hover:bg-yellow-300 transition-colors">
                            <HiOutlinePencil size={24} strokeWidth={2} />
                          </button>
                          <button onClick={() => handleDeleteProduct(product._id)} className="p-2 border-2 border-transparent hover:border-black hover:bg-red-500 hover:text-white transition-colors">
                            <HiOutlineTrash size={24} strokeWidth={2} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="manga-box bg-white p-6 shadow-manga mb-12">
            <div className="pb-6 border-b-4 border-black mb-6">
              <h2 className="text-2xl font-manga tracking-widest uppercase">ALL ORDERS</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full font-bold">
                <thead>
                  <tr className="border-b-4 border-black text-xl font-manga tracking-widest uppercase">
                    <th className="text-left p-4">ORDER ID</th>
                    <th className="text-left p-4">CUSTOMER</th>
                    <th className="text-left p-4">TOTAL</th>
                    <th className="text-left p-4">DATE</th>
                    <th className="text-left p-4">STATUS</th>
                    <th className="text-right p-4">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b-2 border-black last:border-0 hover:bg-gray-100 transition-colors">
                      <td className="p-4 text-lg font-manga">#{order._id.slice(-8).toUpperCase()}</td>
                      <td className="p-4 text-sm uppercase">{order.user?.name || 'UNKNOWN'}</td>
                      <td className="p-4 text-lg font-manga">₹{order.totalPrice.toLocaleString('en-IN')}</td>
                      <td className="p-4 text-sm uppercase">
                        {new Date(order.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="p-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleOrderStatus(order._id, e.target.value)}
                          className={`text-xs font-bold uppercase px-2 py-1 border-2 border-black cursor-pointer ${
                            order.status === 'Delivered' ? 'bg-green-400 text-black' :
                            order.status === 'Cancelled' ? 'bg-red-500 text-white' :
                            order.status === 'Processing' ? 'bg-yellow-300 text-black' : 'bg-blue-400 text-black'
                          }`}
                        >
                          <option value="Processing">PROCESSING</option>
                          <option value="Shipped">SHIPPED</option>
                          <option value="Delivered">DELIVERED</option>
                          <option value="Cancelled">CANCELLED</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteOrder(order._id)}
                          className="p-2 border-2 border-transparent hover:border-black hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <HiOutlineTrash size={24} strokeWidth={2} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {orders.length === 0 && (
              <p className="text-center text-xl font-manga py-12">NO ORDERS YET.</p>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="manga-box bg-white p-6 shadow-manga mb-12">
            <div className="pb-6 border-b-4 border-black mb-6">
              <h2 className="text-2xl font-manga tracking-widest uppercase">ALL USERS</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full font-bold">
                <thead>
                  <tr className="border-b-4 border-black text-xl font-manga tracking-widest uppercase">
                    <th className="text-left p-4">NAME</th>
                    <th className="text-left p-4">EMAIL</th>
                    <th className="text-left p-4">ROLE</th>
                    <th className="text-left p-4">JOINED</th>
                    <th className="text-right p-4">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} className="border-b-2 border-black last:border-0 hover:bg-gray-100 transition-colors">
                      <td className="p-4 text-lg font-manga">{u.name}</td>
                      <td className="p-4 text-sm uppercase">{u.email}</td>
                      <td className="p-4">
                        <select
                          value={u.role}
                          onChange={(e) => handleUserRole(u._id, e.target.value)}
                          className={`text-xs font-bold uppercase px-2 py-1 border-2 border-black cursor-pointer ${
                            u.role === 'admin' ? 'bg-black text-white' : 'bg-white text-black'
                          }`}
                        >
                          <option value="user">USER</option>
                          <option value="admin">ADMIN</option>
                        </select>
                      </td>
                      <td className="p-4 text-sm uppercase">
                        {new Date(u.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="p-4 text-right">
                        {u.role !== 'admin' && (
                          <button
                            onClick={() => handleDeleteUser(u._id)}
                            className="p-2 border-2 border-transparent hover:border-black hover:bg-red-500 hover:text-white transition-colors"
                          >
                            <HiOutlineTrash size={24} strokeWidth={2} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="manga-box bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-[16px_16px_0px_0px_rgba(253,224,71,1)] border-4 border-black">
            <div className="flex items-center justify-between pb-6 border-b-4 border-black mb-6">
              <h3 className="text-3xl font-manga tracking-widest uppercase">
                {editingProduct ? 'EDIT PRODUCT' : 'ADD PRODUCT'}
              </h3>
              <button onClick={() => setShowModal(false)} className="hover:bg-red-500 hover:text-white border-2 border-transparent hover:border-black p-2 transition-colors">
                <HiOutlineX size={32} strokeWidth={2} />
              </button>
            </div>
            <form onSubmit={handleProductSubmit} className="space-y-6">
              <div>
                <label className="block text-xl font-manga tracking-widest uppercase mb-2">NAME</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-xl font-manga tracking-widest uppercase mb-2">DESCRIPTION</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="input-field h-32 resize-none"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xl font-manga tracking-widest uppercase mb-2">PRICE (₹)</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="input-field"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xl font-manga tracking-widest uppercase mb-2">STOCK</label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    className="input-field"
                    min="0"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xl font-manga tracking-widest uppercase mb-2">CATEGORY</label>
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  className="input-field cursor-pointer"
                >
                  <option value="Comics">COMICS</option>
                  <option value="Figures">FIGURES</option>
                  <option value="Apparel">APPAREL</option>
                  <option value="Accessories">ACCESSORIES</option>
                  <option value="Anime">ANIME</option>
                  <option value="Merchandise">MERCHANDISE</option>
                </select>
              </div>
              <div>
                <label className="block text-xl font-manga tracking-widest uppercase mb-2">IMAGE</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="input-field bg-gray-50"
                  required={!productForm.image}
                />
                {productForm.image && !imageFile && (
                  <p className="mt-2 text-sm font-bold truncate">Current: {productForm.image}</p>
                )}
              </div>
              <div>
                <label className="block text-xl font-manga tracking-widest uppercase mb-2">RELEASE DATE</label>
                <input
                  type="date"
                  value={productForm.releaseDate}
                  onChange={(e) => setProductForm({ ...productForm, releaseDate: e.target.value })}
                  className="input-field cursor-pointer"
                  required
                />
              </div>
              <div>
                <label className="block text-xl font-manga tracking-widest uppercase mb-2">SIZES (COMMA SEPARATED)</label>
                <input
                  type="text"
                  value={productForm.sizes}
                  onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
                  className="input-field"
                  placeholder="e.g. S, M, L, XL"
                />
              </div>
              <div className="flex flex-wrap gap-8 py-4 border-y-4 border-black bg-gray-50 px-4">
                {['featured', 'trending', 'newArrival'].map((flag) => (
                  <label key={flag} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={productForm[flag]}
                        onChange={(e) => setProductForm({ ...productForm, [flag]: e.target.checked })}
                        className="peer appearance-none w-8 h-8 border-4 border-black bg-white cursor-pointer checked:bg-black transition-colors"
                      />
                      <HiOutlineCheck className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" size={24} strokeWidth={3} />
                    </div>
                    <span className="text-lg font-manga tracking-widest uppercase group-hover:underline decoration-4 underline-offset-4">
                      {flag === 'newArrival' ? 'NEW ARRIVAL' : flag.toUpperCase()}
                    </span>
                  </label>
                ))}
              </div>

              {formError && <p className="text-sm font-bold text-white bg-red-600 border-2 border-black p-3 transform rotate-1">{formError}</p>}

              <button type="submit" className="btn-primary w-full text-2xl py-4 mt-6">
                {editingProduct ? 'UPDATE PRODUCT' : 'ADD PRODUCT'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
