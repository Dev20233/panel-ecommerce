import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlineArrowLeft } from 'react-icons/hi';
import productService from '../services/productService';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import SkeletonDetail from '../components/SkeletonDetail';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [adding, setAdding] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setTimeout(() => setShowSkeleton(true), 300);
    } else {
      setShowSkeleton(false);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await productService.getProductById(id);
        setProduct(data.product);
        setRelatedProducts(data.relatedProducts);
        if (data.product.sizes && data.product.sizes.length > 0) {
          setSelectedSize(data.product.sizes[0]);
        }
        setQuantity(1);
        setAdded(false);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      setAdding(true);
      setTimeout(() => {
        addToCart(product, quantity, selectedSize);
        setAdding(false);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      }, 400);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity, selectedSize);
      navigate('/checkout');
    }
  };

  if (loading && !showSkeleton) return <div className="min-h-screen"></div>;
  if (showSkeleton) return <SkeletonDetail />;

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <p className="text-lg font-light tracking-wider mb-4">Product not found</p>
        <Link to="/shop" className="btn-outline">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-bold uppercase hover:bg-black hover:text-white px-3 py-1 transition-colors border-2 border-transparent hover:border-black mb-8">
          <HiOutlineArrowLeft size={16} strokeWidth={2.5} /> BACK TO SHOP
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="manga-box aspect-[3/4] bg-white p-6 sm:p-10 flex items-center justify-center shadow-manga">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain transition-all duration-500"
            />
          </div>

          {/* Info */}
          <div className="manga-box bg-white p-6 sm:p-8 lg:p-10 flex flex-col justify-center shadow-manga">
            <p className="inline-block bg-black text-white text-xs font-bold tracking-[0.3em] uppercase mb-4 px-3 py-1 w-fit">
              {product.category}
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-manga tracking-wider mb-4 leading-none">
              {product.name}
            </h1>
            <p className="text-3xl sm:text-4xl font-manga mb-6 text-black" style={{ textShadow: '2px 2px 0px #fff', WebkitTextStroke: '1px black' }}>
              ₹{product.price.toLocaleString('en-IN')}
            </p>
            <p className="text-sm font-bold leading-relaxed mb-8 border-l-4 border-black pl-4">
              {product.description}
            </p>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <p className="text-xl font-manga tracking-widest uppercase mb-3">SIZE:</p>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 border-4 text-xl font-manga transition-all duration-300 transform hover:-translate-y-1 hover:shadow-manga-hover ${
                        selectedSize === size
                          ? 'bg-black text-white border-black shadow-manga'
                          : 'border-black bg-white text-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-xl font-manga tracking-widest uppercase mb-3">QUANTITY:</p>
              <div className="flex items-center border-4 border-black w-fit manga-box bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-2xl font-manga hover:bg-black hover:text-white transition-colors"
                >
                  −
                </button>
                <span className="px-6 py-3 text-2xl font-manga border-x-4 border-black">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-3 text-2xl font-manga hover:bg-black hover:text-white transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <span className="inline-block border-2 border-black bg-green-400 text-black px-3 py-1 font-bold text-sm transform -skew-x-12">
                  IN STOCK ({product.stock} AVAILABLE)
                </span>
              ) : (
                <span className="inline-block border-2 border-black bg-red-500 text-white px-3 py-1 font-bold text-sm transform -skew-x-12">
                  OUT OF STOCK
                </span>
              )}
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || adding}
              className={`w-full flex items-center justify-center gap-3 px-8 py-5 text-xl font-manga tracking-widest uppercase transition-all duration-300 border-4 border-black ${
                product.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : added
                  ? 'bg-green-400 text-black shadow-none translate-y-1 translate-x-1'
                  : 'bg-yellow-300 text-black shadow-manga hover:shadow-none hover:translate-y-1 hover:translate-x-1'
              }`}
            >
              <HiOutlineShoppingBag size={24} strokeWidth={2.5} />
              {product.stock === 0 ? 'OUT OF STOCK' : adding ? 'ADDING...' : added ? 'ADDED ✓' : 'ADD TO CART'}
            </button>

            {/* Buy Now */}
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className={`w-full mt-4 flex items-center justify-center gap-3 px-8 py-5 text-xl font-manga tracking-widest uppercase transition-all duration-300 border-4 border-black ${
                product.stock === 0
                  ? 'hidden'
                  : 'bg-black text-white shadow-manga hover:shadow-none hover:translate-y-1 hover:translate-x-1 hover:bg-gray-800 hover:text-white'
              }`}
            >
              BUY NOW
            </button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-16 border-t border-border">
            <h2 className="section-title mb-12">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
