import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HiOutlineCheck, HiOutlineCreditCard, HiOutlineCash } from 'react-icons/hi';
import { MdOutlineQrCodeScanner } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import orderService from '../services/orderService';
import generateReceipt from '../utils/generateReceipt';

const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || 'India',
  });

  const [paymentMethod, setPaymentMethod] = useState('Card'); // 'Card', 'UPI', 'Cash on Delivery'
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState(null);

  const shipping = cartTotal >= 2000 ? 0 : 199;
  const total = cartTotal + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic UI Validation
    if (paymentMethod === 'UPI' && !/.+@.+/.test(upiId)) {
      return setError('Please enter a valid UPI ID (e.g., name@upi)');
    }
    if (paymentMethod === 'Card') {
      if (cardDetails.number.length < 15 || cardDetails.cvv.length < 3) {
        return setError('Please enter valid card details');
      }
    }

    setLoading(true);

    // Simulate Payment Processing Delay for UPI/Card
    if (paymentMethod !== 'Cash on Delivery') {
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    try {
      const generatedPaymentId = paymentMethod !== 'Cash on Delivery' 
        ? `PAY-PNL-${Date.now()}${Math.floor(Math.random() * 1000)}` 
        : undefined;

      const orderData = {
        items: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
        })),
        shippingAddress: formData,
        paymentMethod,
        paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
        paymentId: generatedPaymentId,
        paidAt: paymentMethod !== 'Cash on Delivery' ? new Date().toISOString() : undefined,
      };

      const createdOrder = await orderService.createOrder(orderData);
      
      // Only clear cart on success
      clearCart();
      setSuccessData(createdOrder);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-light tracking-wider mb-4">Please login to checkout</h2>
        <Link to="/login" className="btn-primary">Login</Link>
      </div>
    );
  }

  if (cartItems.length === 0 && !successData) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-light tracking-wider mb-4">Your cart is empty</h2>
        <Link to="/shop" className="btn-primary">Shop Now</Link>
      </div>
    );
  }

  if (successData) {
    return (
      <div className="min-h-screen bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="manga-box bg-white max-w-2xl w-full p-8 md:p-12 relative border-4 border-black shadow-[12px_12px_0_#000]">
          <div className="absolute -top-6 -right-6 bg-yellow-300 border-4 border-black px-4 py-2 transform rotate-12 shadow-[4px_4px_0_#000]">
            <span className="font-manga text-xl tracking-widest uppercase">Success!</span>
          </div>
          
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mb-6 shadow-[4px_4px_0_#eab308]">
              <HiOutlineCheck size={40} strokeWidth={3} />
            </div>
            <h2 className="text-3xl md:text-4xl font-manga tracking-widest uppercase mb-2">
              {successData.paymentMethod === 'Cash on Delivery' ? 'ORDER PLACED ✓' : 'PAYMENT SUCCESSFUL ✓'}
            </h2>
            <p className="text-sm font-bold text-gray-600">
              Your order has been confirmed.
            </p>
          </div>

          <div className="border-4 border-black p-6 bg-yellow-50 mb-8 space-y-4 shadow-[4px_4px_0_#000]">
            <div className="flex justify-between border-b-2 border-black border-dashed pb-2">
              <span className="font-bold text-sm uppercase">Order ID</span>
              <span className="font-mono text-sm font-bold">{successData._id}</span>
            </div>
            <div className="flex justify-between border-b-2 border-black border-dashed pb-2">
              <span className="font-bold text-sm uppercase">Payment Method</span>
              <span className="text-sm font-bold">{successData.paymentMethod}</span>
            </div>
            <div className="flex justify-between border-b-2 border-black border-dashed pb-2">
              <span className="font-bold text-sm uppercase">Payment Status</span>
              <span className={`text-sm font-bold px-2 py-0.5 border-2 border-black shadow-[2px_2px_0_#000] ${successData.paymentStatus === 'Paid' ? 'bg-green-400' : 'bg-yellow-400'}`}>
                {successData.paymentStatus}
              </span>
            </div>
            {successData.paymentId && (
              <div className="flex justify-between border-b-2 border-black border-dashed pb-2">
                <span className="font-bold text-sm uppercase">Reference ID</span>
                <span className="font-mono text-sm font-bold">{successData.paymentId}</span>
              </div>
            )}
            <div className="flex justify-between pt-2">
              <span className="font-manga text-xl tracking-widest uppercase">Total Paid</span>
              <span className="font-manga text-xl">₹{successData.totalPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/orders" className="btn-primary flex-1 text-center justify-center text-sm py-4">VIEW ORDER</Link>
            <button onClick={() => generateReceipt(successData)} className="btn-primary flex-1 text-center justify-center text-sm py-4">DOWNLOAD RECEIPT</button>
            <Link to="/shop" className="btn-primary flex-1 text-center justify-center bg-white text-black hover:bg-black hover:text-white text-sm py-4">CONTINUE SHOPPING</Link>
          </div>
        </div>
      </div>
    );
  }

  const getSubmitText = () => {
    if (loading) return 'PROCESSING...';
    if (paymentMethod === 'Cash on Delivery') return 'PLACE ORDER';
    return `PAY ₹${total.toLocaleString('en-IN')}`;
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="section-title mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Checkout Flow */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Shipping Form */}
            <div className="manga-box p-8 bg-white border-4 border-black shadow-[8px_8px_0_#000]">
              <h2 className="text-2xl font-manga tracking-widest uppercase mb-6 border-b-4 border-black pb-2">
                1. SHIPPING INFORMATION
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold tracking-widest uppercase mb-2">FULL NAME</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="input-field" required form="checkout-form" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold tracking-widest uppercase mb-2">EMAIL</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" required form="checkout-form" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold tracking-widest uppercase mb-2">PHONE</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input-field" required form="checkout-form" />
                </div>
                <div>
                  <label className="block text-sm font-bold tracking-widest uppercase mb-2">STREET ADDRESS</label>
                  <input type="text" name="street" value={formData.street} onChange={handleChange} className="input-field" required form="checkout-form" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold tracking-widest uppercase mb-2">CITY</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} className="input-field" required form="checkout-form" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold tracking-widest uppercase mb-2">STATE</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} className="input-field" required form="checkout-form" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold tracking-widest uppercase mb-2">ZIP CODE</label>
                    <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className="input-field" required form="checkout-form" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold tracking-widest uppercase mb-2">COUNTRY</label>
                    <input type="text" name="country" value={formData.country} onChange={handleChange} className="input-field" required form="checkout-form" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Selection */}
            <div className="manga-box p-8 bg-white border-4 border-black shadow-[8px_8px_0_#000]">
              <h2 className="text-2xl font-manga tracking-widest uppercase mb-6 border-b-4 border-black pb-2 flex justify-between items-end">
                <span>2. PAYMENT METHOD</span>
                <span className="text-xs font-bold text-gray-500 tracking-wider">SECURE CHECKOUT</span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {/* UPI Option */}
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`flex flex-col items-center justify-center p-4 border-4 transition-all duration-200 ${
                    paymentMethod === 'UPI' 
                      ? 'border-black bg-yellow-300 shadow-[4px_4px_0_#000] scale-105 z-10' 
                      : 'border-gray-300 bg-gray-50 hover:border-black hover:shadow-[4px_4px_0_#000]'
                  }`}
                >
                  <MdOutlineQrCodeScanner size={32} className={`mb-2 ${paymentMethod === 'UPI' ? 'text-black' : 'text-gray-500'}`} />
                  <span className={`font-bold uppercase tracking-wider text-sm ${paymentMethod === 'UPI' ? 'text-black' : 'text-gray-500'}`}>UPI</span>
                </button>

                {/* Card Option */}
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  className={`flex flex-col items-center justify-center p-4 border-4 transition-all duration-200 ${
                    paymentMethod === 'Card' 
                      ? 'border-black bg-yellow-300 shadow-[4px_4px_0_#000] scale-105 z-10' 
                      : 'border-gray-300 bg-gray-50 hover:border-black hover:shadow-[4px_4px_0_#000]'
                  }`}
                >
                  <HiOutlineCreditCard size={32} className={`mb-2 ${paymentMethod === 'Card' ? 'text-black' : 'text-gray-500'}`} />
                  <span className={`font-bold uppercase tracking-wider text-sm ${paymentMethod === 'Card' ? 'text-black' : 'text-gray-500'}`}>Card</span>
                </button>

                {/* COD Option */}
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('Cash on Delivery')}
                  className={`flex flex-col items-center justify-center p-4 border-4 transition-all duration-200 ${
                    paymentMethod === 'Cash on Delivery' 
                      ? 'border-black bg-yellow-300 shadow-[4px_4px_0_#000] scale-105 z-10' 
                      : 'border-gray-300 bg-gray-50 hover:border-black hover:shadow-[4px_4px_0_#000]'
                  }`}
                >
                  <HiOutlineCash size={32} className={`mb-2 ${paymentMethod === 'Cash on Delivery' ? 'text-black' : 'text-gray-500'}`} />
                  <span className={`font-bold uppercase tracking-wider text-sm ${paymentMethod === 'Cash on Delivery' ? 'text-black' : 'text-gray-500'}`}>COD</span>
                </button>
              </div>

              {/* Dynamic Payment Details */}
              <div className="bg-gray-50 border-4 border-black p-6 shadow-inner">
                
                {paymentMethod === 'UPI' && (
                  <div className="space-y-4 animate-fade-in">
                    <p className="text-sm font-bold uppercase tracking-wider mb-4 border-b-2 border-black pb-2">Enter UPI Details</p>
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase mb-2">UPI ID</label>
                      <input 
                        type="text" 
                        value={upiId} 
                        onChange={(e) => setUpiId(e.target.value)} 
                        placeholder="name@upi" 
                        className="input-field bg-white" 
                        required={paymentMethod === 'UPI'}
                        form="checkout-form"
                      />
                      <p className="text-xs text-gray-500 mt-2 font-bold">This is a simulated payment. Do not enter real credentials.</p>
                    </div>
                  </div>
                )}

                {paymentMethod === 'Card' && (
                  <div className="space-y-4 animate-fade-in">
                    <p className="text-sm font-bold uppercase tracking-wider mb-4 border-b-2 border-black pb-2">Enter Card Details</p>
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase mb-2">Cardholder Name</label>
                      <input type="text" name="name" value={cardDetails.name} onChange={handleCardChange} placeholder="PETER PARKER" className="input-field bg-white" required={paymentMethod === 'Card'} form="checkout-form" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase mb-2">Card Number</label>
                      <input type="text" name="number" value={cardDetails.number} onChange={handleCardChange} placeholder="4242 4242 4242 4242" maxLength="19" className="input-field bg-white" required={paymentMethod === 'Card'} form="checkout-form" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold tracking-widest uppercase mb-2">Expiry (MM/YY)</label>
                        <input type="text" name="expiry" value={cardDetails.expiry} onChange={handleCardChange} placeholder="12/25" maxLength="5" className="input-field bg-white" required={paymentMethod === 'Card'} form="checkout-form" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold tracking-widest uppercase mb-2">CVV</label>
                        <input type="password" name="cvv" value={cardDetails.cvv} onChange={handleCardChange} placeholder="***" maxLength="4" className="input-field bg-white" required={paymentMethod === 'Card'} form="checkout-form" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 font-bold">This is a simulated payment. Do not enter real credentials.</p>
                  </div>
                )}

                {paymentMethod === 'Cash on Delivery' && (
                  <div className="animate-fade-in text-center py-6">
                    <HiOutlineCash size={48} className="mx-auto mb-4 text-gray-800" />
                    <p className="text-lg font-manga tracking-wider uppercase">Pay at your doorstep!</p>
                    <p className="text-sm font-bold text-gray-600 mt-2 max-w-sm mx-auto">Please have the exact amount ready. Our delivery partner will contact you before arriving.</p>
                  </div>
                )}
              </div>
              
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="manga-box bg-yellow-300 p-8 sticky top-28 border-4 border-black shadow-[8px_8px_0_#000]">
              <h2 className="text-2xl font-manga tracking-widest uppercase mb-6 border-b-4 border-black pb-2">
                ORDER SUMMARY
              </h2>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={`${item._id}-${item.size}`} className="flex gap-4 p-2 bg-white border-2 border-black shadow-[2px_2px_0_#000]">
                    <div className="w-16 h-20 border-2 border-black flex-shrink-0 overflow-hidden bg-white">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 font-bold">
                      <p className="text-md font-manga leading-tight">{item.name}</p>
                      {item.size && <p className="text-xs uppercase mt-1">SIZE: {item.size}</p>}
                      <p className="text-xs uppercase mt-1">QTY: {item.quantity}</p>
                    </div>
                    <p className="text-lg font-manga self-center pr-2">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t-4 border-black pt-4 space-y-3 font-bold">
                <div className="flex justify-between text-md">
                  <span className="uppercase tracking-wider">SUBTOTAL</span>
                  <span className="font-manga text-lg">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-md">
                  <span className="uppercase tracking-wider">SHIPPING</span>
                  <span className="font-manga text-lg">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                
                <div className="border-t-4 border-black pt-4 flex justify-between items-center font-bold bg-white px-4 py-3 transform -rotate-1 mt-6 shadow-[4px_4px_0_#000]">
                  <span className="uppercase font-manga tracking-widest text-xl">TOTAL</span>
                  <span className="font-manga text-3xl">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Submit Form Wrapper */}
              <form id="checkout-form" onSubmit={handleSubmit} className="mt-8">
                {error && (
                  <div className="mb-6 p-4 bg-red-500 border-4 border-black shadow-[4px_4px_0_#000] transform rotate-1">
                    <p className="text-sm font-bold text-white uppercase tracking-wider text-center">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 px-6 border-4 border-black text-xl font-manga tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                    loading 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none translate-y-2 translate-x-2'
                      : 'bg-black text-white hover:bg-white hover:text-black shadow-[6px_6px_0_#000] hover:shadow-[2px_2px_0_#000] hover:translate-y-1 hover:translate-x-1'
                  }`}
                >
                  {loading && (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {getSubmitText()}
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
