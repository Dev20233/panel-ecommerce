import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { FaInstagram, FaTwitter, FaDiscord, FaEnvelope } from 'react-icons/fa';
import gokuImg from '../assets/goku.png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-white text-black border-t-8 border-black">
      {/* Newsletter */}
      <div className="border-b-4 border-black bg-white w-full" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center bg-white border-4 border-black shadow-manga p-8 sm:p-12 relative z-10">
            <h3 className="text-3xl sm:text-4xl font-manga tracking-widest uppercase mb-3">Stay Updated!</h3>
            <p className="text-md font-bold mb-8 max-w-md mx-auto">
              Subscribe to our newsletter for exclusive updates, new arrivals, and style inspiration.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row max-w-md mx-auto manga-box bg-white">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL..."
                className="flex-1 px-4 py-3 bg-transparent border-b-4 sm:border-b-0 sm:border-r-4 border-black text-black text-sm font-bold focus:outline-none"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-black text-white text-sm font-bold tracking-wider uppercase hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                Subscribe <HiOutlineArrowRight size={18} strokeWidth={3} />
              </button>
            </form>
            {subscribed && (
              <p className="text-md font-bold text-black mt-4 border-2 border-black inline-block px-4 py-2 bg-yellow-300 transform -skew-x-12">THANK YOU FOR SUBSCRIBING!</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="manga-box grid grid-cols-1 md:grid-cols-12 gap-0 border-4 border-black bg-white relative overflow-visible">
          
          {/* Goku sitting on the footer border — hip/seat aligns with the top border */}
          <div 
            className="absolute z-20 pointer-events-none"
            style={{
              top: '0',
              left: '15%',
              transform: 'translate(-50%, -55%)',
              width: 'clamp(120px, 25vw, 400px)',
            }}
          >
            <img 
              src={gokuImg} 
              alt="goku sitting on footer" 
              className="w-full h-auto"
            />
          </div>

          {/* Brand Panel */}
          <div className="md:col-span-4 p-8 pt-16 sm:pt-20 md:pt-24 border-b-4 md:border-b-0 md:border-r-4 border-black flex flex-col items-start justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <h4 className="text-4xl sm:text-5xl font-manga tracking-widest mb-6 inline-block bg-black text-white px-4 py-2 transform -skew-x-6 relative z-0">PANEL</h4>
            <p className="text-sm font-bold leading-relaxed bg-white border-2 border-black p-4 shadow-manga mb-6">
              Your ultimate comic and anime store. The best curated collection of manga, figures, apparel, and exclusive merchandise.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 relative z-30">
              <a href="#" className="p-3 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 hover:translate-y-[-2px] transition-all" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="p-3 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 hover:translate-y-[-2px] transition-all" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="p-3 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 hover:translate-y-[-2px] transition-all" aria-label="Discord">
                <FaDiscord size={20} />
              </a>
              <a href="mailto:support@panel.com" className="p-3 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 hover:translate-y-[-2px] transition-all" aria-label="Email">
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>
          
          {/* Links Panels Wrapper */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2">

            {/* Company Panel */}
            <div className="p-8 border-b-4 sm:border-b-0 sm:border-r-4 border-black bg-yellow-50">
              <h5 className="text-lg font-manga tracking-widest uppercase mb-6 border-b-4 border-black pb-1 inline-block">Company</h5>
              <div className="space-y-3">
                <Link to="/" className="block text-sm font-bold hover:translate-x-2 hover:text-yellow-600 transition-all">About Us</Link>
                <Link to="/" className="block text-sm font-bold hover:translate-x-2 hover:text-yellow-600 transition-all">Careers</Link>
                <Link to="/" className="block text-sm font-bold hover:translate-x-2 hover:text-yellow-600 transition-all">Press</Link>
                <Link to="/" className="block text-sm font-bold hover:translate-x-2 hover:text-yellow-600 transition-all">Contact</Link>
              </div>
            </div>

            {/* Support Panel */}
            <div className="p-8 bg-white">
              <h5 className="text-lg font-manga tracking-widest uppercase mb-6 bg-black text-white px-2 py-1 inline-block transform -skew-x-12">Support</h5>
              <div className="space-y-3">
                <Link to="/" className="block text-sm font-bold hover:translate-x-2 hover:text-yellow-600 transition-all">Shipping & Returns</Link>
                <Link to="/" className="block text-sm font-bold hover:translate-x-2 hover:text-yellow-600 transition-all">Size Guide</Link>
                <Link to="/" className="block text-sm font-bold hover:translate-x-2 hover:text-yellow-600 transition-all">FAQ</Link>
                <Link to="/" className="block text-sm font-bold hover:translate-x-2 hover:text-yellow-600 transition-all">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t-4 border-black bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-xs font-bold tracking-wider">
            &copy; {new Date().getFullYear()} PANEL. ALL RIGHTS RESERVED. A COLLEGE PROJECT.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
