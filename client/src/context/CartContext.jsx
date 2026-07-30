import { createContext, useContext, useState, useEffect } from 'react';
import productService from '../services/productService';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [cartNotice, setCartNotice] = useState('');

  // Validate cart against backend products to handle stale items (e.g. after database reseed)
  useEffect(() => {
    const validateCartItems = async () => {
      if (cartItems.length === 0) return;
      try {
        const products = await productService.getProducts({ limit: 1000 });
        // The API returns the array directly or inside data? productService.getProducts returns `data`. 
        // Let's check productService: `const { data } = await API.get('/products'); return data;`
        // If data is an array:
        const productList = Array.isArray(products) ? products : (products.products || []);
        
        if (productList.length > 0) {
          const validProductIds = new Set(productList.map(p => p._id));
          const validCartItems = cartItems.filter(item => validProductIds.has(item._id));
          
          if (validCartItems.length !== cartItems.length) {
            setCartItems(validCartItems);
            setCartNotice('YOUR CART WAS UPDATED. SOME PRODUCTS ARE NO LONGER AVAILABLE.');
          }
        }
      } catch (err) {
        console.error('Failed to validate cart:', err);
      }
    };
    validateCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, size = '') => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item._id === product._id && item.size === size
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [
        ...prev,
        {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          stock: product.stock,
          size,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (id, size = '') => {
    setCartItems((prev) =>
      prev.filter((item) => !(item._id === id && item.size === size))
    );
  };

  const updateQuantity = (id, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const clearCartNotice = () => setCartNotice('');

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    cartNotice,
    clearCartNotice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
