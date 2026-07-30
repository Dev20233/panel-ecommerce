import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlineUser, HiOutlineMenu, HiOutlineX, HiOutlineSearch } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import SpiderManHelp from './SpiderManHelp';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeCategory = searchParams.get('category');

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const navLinks = [
    { label: 'COMICS', category: 'Comics' },
    { label: 'FIGURES', category: 'Figures' },
    { label: 'ANIME', category: 'Anime' },
    { label: 'FASHION', category: 'Apparel' },
    { label: 'ACCESSORIES', category: 'Accessories' },
    { label: 'MERCH', category: 'Merchandise' }
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Top promo bar */}
      <div className="bg-black text-white text-center py-1.5 px-2 text-[9px] sm:text-[11px] font-bold tracking-widest uppercase truncate">
        ⚡ Free Shipping on Orders Over ₹2,000 — Use Code: HERO2025 ⚡
      </div>

      {/* Main Navbar — boxed */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-2">
        <div className="border-4 border-black bg-white shadow-manga px-2 sm:px-4 relative overflow-visible">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center group mr-4 lg:mr-6 xl:mr-10">
              <span className="text-3xl md:text-4xl font-manga tracking-widest text-black bg-yellow-300 px-3 py-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform transform -skew-x-12">
              PANEL
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex flex-1 items-center space-x-1 xl:space-x-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={`/shop?category=${link.category}`}
                  className={`h-16 px-2 xl:px-3 text-[12px] xl:text-sm font-bold tracking-wider uppercase flex items-center border-b-[4px] transition-all
                    ${activeCategory === link.category 
                      ? 'border-black text-black bg-yellow-50' 
                      : 'border-transparent text-gray-800 hover:border-black hover:text-black hover:bg-yellow-50'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                to="/shop?trending=true" 
                className="h-16 px-2 xl:px-3 text-[12px] xl:text-sm font-bold tracking-wider uppercase flex items-center border-b-[4px] border-transparent text-gray-800 hover:border-black hover:text-black hover:bg-yellow-50 transition-all"
              >
                DEALS 🔥
              </Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-2">
              <Link to="/shop" className="hidden md:flex p-1.5 hover:bg-yellow-300 border-2 border-transparent hover:border-black transition-colors">
                <HiOutlineSearch size={20} strokeWidth={2} />
              </Link>

              <div className="hidden md:flex items-center space-x-2">
                {user ? (
                  <div className="relative group">
                    <button className="flex items-center space-x-1.5 text-xs font-bold tracking-wider uppercase border-2 border-black px-3 py-1.5 hover:bg-yellow-300 transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      <HiOutlineUser size={16} strokeWidth={2} />
                      <span>{user.name.split(' ')[0]}</span>
                    </button>
                    <div className="absolute top-full right-0 mt-2 w-44 bg-white border-4 border-black shadow-manga opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <Link to="/profile" className="block px-4 py-2.5 text-xs font-bold uppercase hover:bg-yellow-300 border-b-2 border-black">Profile</Link>
                      <Link to="/orders" className="block px-4 py-2.5 text-xs font-bold uppercase hover:bg-yellow-300 border-b-2 border-black">My Orders</Link>
                      {user.role === 'admin' && (
                        <Link to="/admin" className="block px-4 py-2.5 text-xs font-bold uppercase hover:bg-yellow-300 border-b-2 border-black">Dashboard</Link>
                      )}
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2.5 text-xs font-bold uppercase hover:bg-red-500 hover:text-white transition-colors">
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Link to="/login" className="text-xs font-bold tracking-wider uppercase border-2 border-black px-3 py-1.5 hover:bg-gray-100 transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">LOGIN</Link>
                    <Link to="/register" className="text-xs font-bold tracking-wider uppercase border-2 border-black px-3 py-1.5 bg-yellow-300 hover:bg-yellow-400 transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">REGISTER</Link>
                  </div>
                )}
              </div>

              <Link to="/cart" className="relative p-1.5 hover:bg-yellow-300 border-2 border-transparent hover:border-black transition-colors">
                <HiOutlineShoppingBag size={22} strokeWidth={2} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-black transform rotate-12">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Spider-Man Help - hangs below navbar */}
              <SpiderManHelp />

              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center ml-1">
                <button onClick={() => setMenuOpen(!menuOpen)} className="p-1.5 border-2 border-black hover:bg-yellow-300 transition-colors">
                  {menuOpen ? <HiOutlineX size={22} strokeWidth={2.5} /> : <HiOutlineMenu size={22} strokeWidth={2.5} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-4 border-black border-t-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 shadow-manga mt-0">
          <div className="px-4 pt-4 pb-6 space-y-1">
            <div className="py-2 border-b-2 border-black">
              <p className="text-[10px] font-bold text-gray-500 mb-2 px-1 uppercase tracking-wider">SHOP</p>
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link 
                    key={link.label} 
                    to={`/shop?category=${link.category}`} 
                    onClick={() => setMenuOpen(false)} 
                    className={`block py-2 text-sm font-bold tracking-widest uppercase border-2 px-2 transition-colors
                      ${activeCategory === link.category
                        ? 'border-black bg-yellow-300 text-black'
                        : 'border-transparent hover:border-black hover:bg-yellow-50'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link to="/shop?sort=newest" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-bold tracking-widest uppercase border-2 border-transparent hover:border-black px-2 hover:bg-yellow-50 transition-colors">NEW ARRIVALS</Link>
                <Link to="/shop?trending=true" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-bold tracking-widest uppercase border-2 border-transparent hover:border-black px-2 hover:bg-yellow-50 transition-colors">DEALS 🔥</Link>
              </div>
            </div>

            {user ? (
              <div className="py-2 border-b-2 border-black">
                <p className="text-[10px] font-bold text-gray-500 mb-2 px-1 uppercase tracking-wider">ACCOUNT ({user.name.split(' ')[0]})</p>
                <div className="space-y-1 px-1">
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="block py-1.5 text-xs font-bold uppercase hover:bg-yellow-300 border-2 border-transparent hover:border-black px-2 transition-colors">PROFILE</Link>
                  <Link to="/orders" onClick={() => setMenuOpen(false)} className="block py-1.5 text-xs font-bold uppercase hover:bg-yellow-300 border-2 border-transparent hover:border-black px-2 transition-colors">MY ORDERS</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setMenuOpen(false)} className="block py-1.5 text-xs font-bold uppercase hover:bg-yellow-300 border-2 border-transparent hover:border-black px-2 transition-colors">DASHBOARD</Link>
                  )}
                  <button onClick={handleLogout} className="block w-full text-left py-1.5 text-xs font-bold uppercase text-red-600 hover:bg-red-500 hover:text-white border-2 border-transparent hover:border-black px-2 transition-colors">LOGOUT</button>
                </div>
              </div>
            ) : (
              <div className="pt-4 pb-2 px-1 flex flex-col space-y-3">
                <Link to="/login" onClick={() => setMenuOpen(false)} className="text-center text-sm font-bold uppercase border-2 border-black py-3 hover:bg-gray-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">LOGIN</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="text-center text-sm font-bold uppercase border-2 border-black py-3 bg-yellow-300 hover:bg-yellow-400 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">REGISTER</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
