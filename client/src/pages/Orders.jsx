import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlineDownload } from 'react-icons/hi';
import orderService from '../services/orderService';
import generateReceipt from '../utils/generateReceipt';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="min-h-screen"></div>;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-50 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-50 text-blue-800';
      case 'Delivered':
        return 'bg-green-50 text-green-800';
      case 'Cancelled':
        return 'bg-red-50 text-red-800';
      default:
        return 'bg-gray-50 text-gray-800';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <HiOutlineShoppingBag size={48} className="text-muted mb-4" strokeWidth={1} />
        <h2 className="text-2xl font-light tracking-wider mb-2">No orders yet</h2>
        <p className="text-sm text-muted mb-8">Start shopping to see your orders here.</p>
        <Link to="/shop" className="btn-primary">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-manga tracking-widest uppercase mb-12 border-b-8 border-black pb-4 inline-block transform -rotate-1 bg-yellow-300 px-4">MY ORDERS</h1>

        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order._id} className="manga-box bg-white p-6 shadow-manga">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b-4 border-black pb-4">
                <div>
                  <p className="text-lg font-manga tracking-widest uppercase bg-black text-white px-2 py-1 inline-block">
                    ORDER #{order._id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-sm font-bold mt-2">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex flex-col sm:items-end gap-2">
                  <span className={`text-sm font-bold uppercase px-3 py-1 border-2 border-black transform skew-x-12 ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className="text-2xl font-manga">
                    ₹{order.totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-6">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-2 border-2 border-black bg-white shadow-manga-hover">
                      <div className="w-16 h-20 border-2 border-black flex-shrink-0 overflow-hidden bg-white">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="font-bold">
                        <p className="text-lg font-manga leading-tight">{item.name}</p>
                        {item.size && <p className="text-xs uppercase mt-1">SIZE: {item.size}</p>}
                        <p className="text-xs uppercase">QTY: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-300 flex justify-end">
                  <button
                    onClick={() => generateReceipt(order)}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-black bg-yellow-300 font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0_#000] hover:shadow-[1px_1px_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  >
                    <HiOutlineDownload size={16} strokeWidth={2.5} />
                    Download Receipt
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
