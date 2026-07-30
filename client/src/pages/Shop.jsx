import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HiOutlineSearch, HiOutlineAdjustments, HiOutlineX } from 'react-icons/hi';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';

const categoryBackgrounds = {
  Comics: "/backgrounds/comics-bg.jpg",
  Figures: "/backgrounds/figures-bg.jpg",
  Apparel: "/backgrounds/apparel-bg.jpg",
  Accessories: "/backgrounds/accessories-bg.jpg",
  Anime: "/backgrounds/anime-bg.jpg",
  Merchandise: "/backgrounds/merchandise-bg.jpg"
};

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [showFilters, setShowFilters] = useState(false);
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

  const categories = ['', 'Comics', 'Figures', 'Apparel', 'Accessories', 'Anime', 'Merchandise'];
  const sortOptions = [
    { value: '', label: 'Default' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'name_asc', label: 'Name: A to Z' },
    { value: 'name_desc', label: 'Name: Z to A' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (search) params.search = search;
        if (category) params.category = category;
        if (sort) params.sort = sort;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;

        const data = await productService.getProducts(params);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [search, category, sort, minPrice, maxPrice]);

  useEffect(() => {
    const cat = searchParams.get('category');
    const s = searchParams.get('search');
    if (cat) setCategory(cat);
    if (s) setSearch(s);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    if (sort) params.sort = sort;
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setSort('');
    setMinPrice('');
    setMaxPrice('');
    setSearchParams({});
  };

  const hasActiveFilters = search || category || sort || minPrice || maxPrice;
  const activeBackground = category ? categoryBackgrounds[category] : null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* SECTION 2: CATEGORY HERO BANNER */}
      <section 
        className="relative overflow-hidden border-[5px] border-black mx-auto my-8 shadow-[8px_8px_0_#000] bg-white"
        style={{ 
          height: 'clamp(220px, 35vw, 480px)',
          width: 'calc(100% - 48px)',
          maxWidth: '1600px'
        }}
      >
        {activeBackground ? (
          <img
            src={activeBackground}
            alt={`${category} artwork`}
            className="absolute top-0 left-0 w-full h-full z-0 object-cover object-center"
          />
        ) : (
          <div 
            className="absolute top-0 left-0 w-full h-full z-0" 
            style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }} 
          />
        )}
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="manga-box inline-block bg-white px-8 py-4 shadow-manga relative transform -rotate-1">
            <h1 className="section-title text-black" style={{ textShadow: 'none', WebkitTextStroke: '0' }}>SHOP</h1>
            <p className="section-subtitle bg-black text-white px-2 py-1 transform -skew-x-12 inline-block">
              {category ? category : 'ALL COLLECTIONS'}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: PRODUCT SHOP AREA */}
      <section className="flex-1 w-full py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-8 p-6 manga-box bg-yellow-300">
            <form onSubmit={handleSearch} className="flex-1 flex">
              <div className="relative flex-1">
                <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={24} strokeWidth={2.5} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="SEARCH PRODUCTS..."
                  className="input-field pl-12 bg-white"
                />
              </div>
            </form>

            <div className="flex items-center flex-wrap gap-2 sm:gap-3">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-field w-auto bg-white cursor-pointer"
              >
                <option value="">All Categories</option>
                {categories.filter(Boolean).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="input-field w-auto bg-white cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="manga-box manga-box-hover p-3 bg-white flex items-center justify-center"
              >
                <HiOutlineAdjustments size={24} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Price Filter */}
          {showFilters && (
            <div className="flex flex-wrap items-center gap-4 mb-8 p-6 manga-box bg-white transform rotate-1 relative -top-4 shadow-manga">
              <span className="text-lg font-manga tracking-wider">PRICE RANGE:</span>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="MIN"
                className="input-field w-full sm:w-32"
              />
              <span className="text-black font-bold text-xl">—</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="MAX"
                className="input-field w-full sm:w-32"
              />
            </div>
          )}

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex items-center flex-wrap gap-3 mb-8">
              <span className="text-sm font-bold tracking-wider uppercase bg-black text-white px-2 py-1">ACTIVE FILTERS:</span>
              {category && (
                <span className="text-sm font-bold bg-white border-2 border-black px-3 py-1 flex items-center gap-2 shadow-manga-hover">
                  {category}
                  <button onClick={() => setCategory('')}><HiOutlineX size={16} strokeWidth={3} /></button>
                </span>
              )}
              {search && (
              <span className="text-sm font-bold bg-white border-2 border-black px-3 py-1 flex items-center gap-2 shadow-manga-hover">
                "{search}"
                <button onClick={() => setSearch('')}><HiOutlineX size={16} strokeWidth={3} /></button>
              </span>
            )}
            <button onClick={clearFilters} className="text-sm font-bold underline ml-2 hover:bg-black hover:text-white px-3 py-1 transition-colors bg-white border-2 border-transparent hover:border-black shadow-manga-hover">CLEAR ALL</button>
          </div>
        )}

          {/* Results Count */}
        <div className="mb-8">
          <p className="text-lg font-manga tracking-widest border-b-4 border-black pb-2 inline-block bg-white px-4 pt-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            {products.length} {products.length === 1 ? 'PRODUCT' : 'PRODUCTS'}
          </p>
        </div>

          {/* Products Grid */}
          {loading && !showSkeleton ? (
            <div className="min-h-[50vh]"></div>
          ) : showSkeleton ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-white p-8 manga-box max-w-md mx-auto mt-8">
              <p className="text-lg font-light tracking-wider mb-2">No products found</p>
              <p className="text-sm text-muted mb-6">Try adjusting your search or filters.</p>
              <button onClick={clearFilters} className="btn-outline">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Shop;
