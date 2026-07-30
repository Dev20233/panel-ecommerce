import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight, HiOutlineTruck, HiOutlineShieldCheck, HiOutlineRefresh, HiOutlineStar } from 'react-icons/hi';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
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
    const fetchProducts = async () => {
      try {
        const [featuredData, trendingData, newArrivalData] = await Promise.all([
          productService.getProducts({ featured: 'true' }),
          productService.getProducts({ trending: 'true' }),
          productService.getProducts({ newArrival: 'true' }),
        ]);
        setFeatured(featuredData);
        setTrending(trendingData);
        setNewArrivals(newArrivalData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { name: 'Comics', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&q=80' },
    { name: 'Figures', image: 'https://images.unsplash.com/photo-1608889175157-718b6205a50d?w=800&q=80' },
    { name: 'Apparel', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80' },
    { name: 'Anime', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80' },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative w-full py-12 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1300px] mx-auto relative">
          
          {/* SMASH Sticker */}
          <div className="hidden lg:block absolute -top-6 -right-6 z-20 bg-yellow-300 border-[4px] border-black px-4 py-1 transform rotate-12 shadow-[6px_6px_0_#000]">
            <span className="font-manga text-2xl tracking-widest text-black">SMASH!</span>
          </div>

          {/* Main Hero Panel */}
          <div className="bg-white border-[5px] border-black shadow-[12px_12px_0_#000] w-full flex flex-col overflow-hidden relative z-10 p-8 sm:p-12 lg:p-16">
            
            {/* Halftone dot pattern block */}
            <div 
              className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" 
              style={{ 
                backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', 
                backgroundSize: '12px 12px',
                WebkitMaskImage: 'linear-gradient(to bottom right, transparent, black 80%)',
                maskImage: 'linear-gradient(to bottom right, transparent, black 80%)'
              }}
            ></div>

            <div className="relative z-10 flex flex-col items-start w-full">
              
              <div className="mb-6">
                <span className="inline-block bg-black text-white text-xs sm:text-sm font-bold tracking-widest uppercase px-3 py-1 transform -skew-x-12">
                  New Drops Weekly
                </span>
              </div>
              
              <h1 className="font-manga tracking-wider mb-10 leading-[0.95] uppercase flex flex-col gap-2 w-full" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}>
                <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
                  <span className="text-black" style={{ textShadow: 'none', WebkitTextStroke: '0' }}>LIVE BEYOND</span>
                  <span className="text-white" style={{ textShadow: 'none', WebkitTextStroke: '3px black' }}>THE PANELS.</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-4 items-center mt-2 sm:mt-3">
                  <span className="text-black">FIND YOUR NEXT</span>
                  <div className="relative inline-block mt-2 sm:mt-0">
                    <div className="absolute inset-0 bg-black transform translate-x-2 translate-y-2"></div>
                    <span className="relative block bg-yellow-300 border-[4px] border-black px-4 py-1 text-black" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>
                      OBSESSION.
                    </span>
                  </div>
                </div>
              </h1>
              
              <div className="border-l-4 border-black pl-4 mb-10 max-w-3xl">
                <p className="text-base sm:text-lg lg:text-xl font-bold leading-relaxed text-black">
                  Comics. Collectibles. Culture.<br />
                  From iconic stories to shelf-worthy figures, wearable fandom and everyday merch.<br />
                  Find something from the worlds you never stopped loving.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 items-center">
                <Link 
                  to="/shop" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-yellow-300 text-black border-4 border-black text-sm font-bold tracking-widest uppercase transition-transform hover:-translate-y-[2px] hover:-translate-x-[2px] shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000]"
                >
                  EXPLORE COLLECTION
                </Link>
                <Link 
                  to="/shop?category=Comics" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-black border-4 border-black text-sm font-bold tracking-widest uppercase transition-colors hover:bg-black hover:text-white"
                >
                  SHOP COMICS
                </Link>
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center px-6 py-3 bg-black text-white border-4 border-black text-sm font-bold tracking-widest uppercase transition-transform hover:-translate-y-[2px] hover:-translate-x-[2px] shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:bg-yellow-300 hover:text-black"
                >
                  SHOP THE DROP <HiOutlineArrowRight className="ml-2" size={18} strokeWidth={3} />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b-8 border-black border-dashed">
          <div className="flex justify-center mb-16 relative">
            <div className="manga-box bg-white inline-block px-4 sm:px-8 py-4 border-4 border-black shadow-manga flex flex-col items-center max-w-[90vw]">
              <h2 className="section-title text-black" style={{ textShadow: 'none', WebkitTextStroke: '0' }}>TOP TIER LOOT</h2>
              <p className="section-subtitle bg-yellow-300 px-3 py-1 border-2 border-black transform -skew-x-12 inline-block">Featured Items</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 min-h-[400px]">
            {loading && !showSkeleton ? (
              null
            ) : showSkeleton ? (
              [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
            ) : (
              featured.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
          <div className="text-center mt-16">
            <Link to="/shop" className="btn-primary inline-flex items-center gap-2 mx-auto">
              VIEW ALL GEAR <HiOutlineArrowRight size={20} strokeWidth={3} />
            </Link>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-20 border-b-8 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-16">
            <div className="manga-box bg-white inline-block px-4 sm:px-8 py-4 border-4 border-black shadow-manga flex flex-col items-center max-w-[90vw]">
              <h2 className="section-title text-black" style={{ textShadow: 'none', WebkitTextStroke: '0' }}>EXPLORE THE MULTIVERSE</h2>
              <p className="section-subtitle bg-yellow-300 px-3 py-1 border-2 border-black transform -skew-x-12 inline-block">Categories</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, idx) => (
              <Link
                key={cat.name}
                to={`/shop?category=${cat.name}`}
                className={`manga-box manga-box-hover overflow-hidden aspect-[3/4] group relative bg-white transform ${idx % 2 === 0 ? 'rotate-2' : '-rotate-2'}`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 border-8 border-transparent group-hover:border-black transition-all duration-300 z-10 pointer-events-none" />
                <div className="absolute bottom-6 left-6 z-20">
                  <h3 className="text-3xl font-manga tracking-widest uppercase bg-white text-black border-4 border-black px-4 py-2 shadow-manga inline-block transform -skew-x-12 group-hover:bg-yellow-300 transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      {trending.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b-8 border-black border-dashed">
          <div className="flex justify-center mb-16">
            <div className="manga-box bg-white inline-block px-4 sm:px-8 py-4 border-4 border-black shadow-manga flex flex-col items-center max-w-[90vw]">
              <h2 className="section-title text-black" style={{ textShadow: 'none', WebkitTextStroke: '0' }}>HOTTEST DROPS</h2>
              <p className="section-subtitle bg-yellow-300 px-3 py-1 border-2 border-black transform -skew-x-12 inline-block">Trending Now</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 min-h-[400px]">
            {loading && !showSkeleton ? (
              null
            ) : showSkeleton ? (
              [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
            ) : (
              trending.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-16">
            <div className="manga-box bg-white inline-block px-4 sm:px-8 py-4 border-4 border-black shadow-manga flex flex-col items-center max-w-[90vw]">
              <h2 className="section-title text-black" style={{ textShadow: 'none', WebkitTextStroke: '0' }}>WHY CHOOSE PANEL</h2>
              <p className="section-subtitle bg-yellow-300 px-3 py-1 border-2 border-black transform -skew-x-12 inline-block">Our Promise</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: HiOutlineStar, title: '100% Authentic', desc: 'Officially licensed merchandise sourced directly from trusted distributors.' },
              { icon: HiOutlineTruck, title: 'Speedy Delivery', desc: 'Faster than a speeding bullet! Free shipping on orders over ₹2,000.' },
              { icon: HiOutlineRefresh, title: 'Easy Returns', desc: 'Not the right variant? 30-day hassle-free returns on unopened items.' },
              { icon: HiOutlineShieldCheck, title: 'Secure Checkout', desc: 'Your data is locked down tighter than the Batcave.' },
            ].map((feature, i) => (
              <div key={i} className="manga-box p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-black rounded-full flex items-center justify-center mb-6 bg-yellow-300 shadow-manga">
                  <feature.icon size={32} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-manga tracking-wider uppercase mb-3">{feature.title}</h3>
                <p className="text-sm font-bold leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
