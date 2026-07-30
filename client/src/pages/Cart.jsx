import { Link } from 'react-router-dom';
import { HiOutlineTrash, HiOutlineArrowRight, HiOutlineShoppingBag, HiX } from 'react-icons/hi';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount, cartNotice, clearCartNotice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        {cartNotice && (
          <div className="mb-8 p-4 bg-yellow-300 border-4 border-black shadow-manga transform rotate-1 max-w-md w-full flex justify-between items-center">
            <p className="text-sm font-bold text-black uppercase tracking-wider">{cartNotice}</p>
            <button onClick={clearCartNotice} className="ml-4 hover:bg-black hover:text-white p-1 border-2 border-transparent hover:border-black rounded-full transition-colors">
              <HiX size={20} />
            </button>
          </div>
        )}
        <HiOutlineShoppingBag size={48} className="text-muted mb-4" strokeWidth={1} />
        <h2 className="text-2xl font-light tracking-wider mb-2">Your cart is empty</h2>
        <p className="text-sm text-muted mb-8">Discover our collections and add items to your cart.</p>
        <Link to="/shop" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {cartNotice && (
          <div className="mb-8 p-4 bg-yellow-300 border-4 border-black shadow-manga transform rotate-1 max-w-2xl mx-auto flex justify-between items-center">
            <p className="text-sm font-bold text-black uppercase tracking-wider">{cartNotice}</p>
            <button onClick={clearCartNotice} className="ml-4 hover:bg-black hover:text-white p-1 border-2 border-transparent hover:border-black rounded-full transition-colors">
              <HiX size={20} />
            </button>
          </div>
        )}
        <h1 className="section-title mb-2">Shopping Cart</h1>
        <p className="text-center text-sm text-muted mb-12">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={`${item._id}-${item.size}`}
                className="flex gap-4 sm:gap-6 p-3 sm:p-4 manga-box bg-white"
              >
                <Link to={`/product/${item._id}`} className="w-20 sm:w-24 h-28 sm:h-32 border-2 border-black flex-shrink-0 overflow-hidden bg-white">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-all duration-300" />
                </Link>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link to={`/product/${item._id}`} className="text-xl font-manga tracking-wide hover:underline decoration-2 underline-offset-2 transition-all">
                      {item.name}
                    </Link>
                    {item.size && (
                      <p className="text-xs font-bold mt-1 bg-black text-white inline-block px-2">SIZE: {item.size}</p>
                    )}
                    <p className="text-xl font-manga mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border-4 border-black w-fit bg-white">
                      <button
                        onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                        className="px-2 sm:px-3 py-1 text-lg sm:text-xl font-manga hover:bg-black hover:text-white transition-colors"
                      >
                        −
                      </button>
                      <span className="px-3 sm:px-4 py-1 text-lg sm:text-xl font-manga border-x-4 border-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                        className="px-2 sm:px-3 py-1 text-lg sm:text-xl font-manga hover:bg-black hover:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id, item.size)}
                      className="text-black hover:text-white hover:bg-red-500 border-2 border-transparent hover:border-black p-2 transition-colors duration-300"
                    >
                      <HiOutlineTrash size={24} strokeWidth={2} />
                    </button>
                  </div>
                </div>
                <div className="hidden sm:flex items-start">
                  <p className="text-2xl font-manga">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="manga-box bg-yellow-300 p-8">
              <h3 className="text-2xl font-manga tracking-widest uppercase mb-6 border-b-4 border-black pb-2">ORDER SUMMARY</h3>
              <div className="space-y-4 mb-8 font-bold">
                <div className="flex justify-between text-lg">
                  <span className="uppercase">SUBTOTAL</span>
                  <span className="font-manga text-xl">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="uppercase">SHIPPING</span>
                  <span className="font-manga text-xl">{cartTotal >= 2000 ? 'FREE' : '₹199'}</span>
                </div>
                <div className="border-t-4 border-black pt-4 flex justify-between text-xl font-bold bg-white px-2 py-1 transform rotate-1 mt-4 shadow-manga-hover">
                  <span className="uppercase font-manga tracking-widest">TOTAL</span>
                  <span className="font-manga">₹{(cartTotal >= 2000 ? cartTotal : cartTotal + 199).toLocaleString('en-IN')}</span>
                </div>
              </div>
              {cartTotal < 2000 && (
                <p className="text-sm font-bold mb-6 bg-white border-2 border-black p-2 transform -skew-x-12">
                  ADD <span className="font-manga text-lg">₹{(2000 - cartTotal).toLocaleString('en-IN')}</span> MORE FOR FREE SHIPPING.
                </p>
              )}
              <Link
                to="/checkout"
                className="btn-primary w-full text-center flex items-center justify-center gap-2 bg-black text-white hover:bg-white hover:text-black border-4 border-black"
              >
                CHECKOUT <HiOutlineArrowRight size={20} strokeWidth={3} />
              </Link>
              <Link to="/shop" className="block text-center text-sm font-bold uppercase mt-6 hover:underline decoration-2 underline-offset-4 transition-all">
                CONTINUE SHOPPING
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
