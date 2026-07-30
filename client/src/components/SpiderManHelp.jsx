import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { HiOutlineX } from 'react-icons/hi';
import spideyImg from '../assets/spiderman.png';

const helpOptions = [
  {
    title: 'Track My Order',
    content: 'Enter your order ID on the Orders page to see real-time tracking updates. You can find your order ID in your confirmation email or under My Orders in your profile.',
  },
  {
    title: 'Shipping & Delivery',
    content: 'We offer free shipping on orders over ₹2,000. Standard delivery takes 5-7 business days. Express shipping (2-3 days) is available at checkout for ₹299.',
  },
  {
    title: 'Returns & Refunds',
    content: 'Not happy with your order? No worries! You can return unopened items within 30 days for a full refund. Opened collectibles and comics can be exchanged if defective.',
  },
  {
    title: 'Payment Help',
    content: 'We accept all major credit/debit cards, UPI, net banking, and wallet payments. If your payment failed, check your bank statement — if debited, the refund will appear within 5-7 business days.',
  },
  {
    title: 'Account Help',
    content: 'To reset your password, click "Forgot Password" on the login page. For email changes or account deletion, contact our support team through the form below.',
  },
  {
    title: 'Product / Size Help',
    content: 'Apparel sizes follow standard Indian sizing. Check the size guide on each product page. For figures, dimensions are listed in the description. Still unsure? Drop us a message!',
  },
  {
    title: 'Frequently Asked Questions',
    content: 'Q: Are the comics original?\nA: Yes! All comics are 100% authentic and officially licensed.\n\nQ: Do you ship internationally?\nA: Currently we only ship within India.\n\nQ: Can I cancel my order?\nA: Orders can be cancelled within 24 hours of placement from your Orders page.',
  },
];

const SpiderManHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [showContact, setShowContact] = useState(false);

  // Close on Escape key
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape') setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setContactForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setContactSubmitted(false), 4000);
  };

  return (
    <>
      {/* Spider-Man hanging from navbar (Home) OR floating icon (Other pages) */}
      {isHomePage ? (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Help Center"
          className="spider-help-btn absolute z-50 cursor-pointer group focus:outline-none"
          style={{
            top: '100%',
            right: '0',
          }}
        >
          {/* Web strand */}
          <div className="w-[2px] h-4 sm:h-8 bg-gradient-to-b from-gray-400 to-gray-300 mx-auto" />

          {/* Spider-Man character */}
          <div className="spider-hang relative">
            <img
              src={spideyImg}
              alt=""
              className="w-20 sm:w-28 md:w-36 lg:w-48 h-auto transition-transform duration-300 group-hover:scale-105"
              draggable="false"
            />

            {/* Speech bubble */}
            <div className="hidden sm:block absolute left-full top-1/2 -translate-y-1/2 -ml-10 pointer-events-none z-[-1]">
              <div className="relative bg-white border-2 border-black px-2 py-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap">
                <span className="text-[10px] font-manga tracking-wider leading-none">NEED HELP?</span>
                {/* Speech tail pointing left */}
                <div className="absolute top-1/2 -left-[8px] -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-black" />
                <div className="absolute top-1/2 -left-[5px] -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[6px] border-r-white" />
              </div>
            </div>
          </div>

          {/* Focus ring for accessibility */}
          <span className="absolute inset-0 border-4 border-transparent group-focus-visible:border-yellow-300 group-focus-visible:shadow-[0_0_0_2px_black]" />
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Help Center"
          className="fixed bottom-6 right-6 z-[9000] w-14 h-14 bg-yellow-300 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform flex items-center justify-center focus:outline-none focus-visible:border-white group overflow-hidden"
        >
          <img
            src={spideyImg}
            alt="Help"
            className="w-10 h-10 object-contain"
            draggable="false"
          />
        </button>
      )}

      {/* Help Center Overlay + Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999]">
          {/* Dark overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          {/* Help Panel sliding from right */}
          <div className="help-panel-slide absolute right-0 top-0 h-full w-full max-w-md bg-white border-l-8 border-black overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-black text-white px-6 py-5 flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-manga tracking-widest">NEED A HERO?</h2>
                <p className="text-xs font-bold tracking-wider mt-1 opacity-80">How can we help?</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close Help Center"
                className="text-white hover:bg-white/20 border-2 border-white p-1.5 transition-colors"
              >
                <HiOutlineX size={22} strokeWidth={3} />
              </button>
            </div>

            {/* Help Options (Accordion) */}
            <div className="p-4">
              {helpOptions.map((option, idx) => (
                <div key={idx} className="border-4 border-black mb-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <button
                    onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                    className={`w-full text-left px-4 py-3 text-sm font-bold tracking-wider uppercase flex items-center justify-between transition-colors ${
                      expandedIdx === idx ? 'bg-yellow-300' : 'bg-white hover:bg-yellow-100'
                    }`}
                  >
                    <span>{option.title}</span>
                    <span className="font-manga text-xl ml-2">
                      {expandedIdx === idx ? '−' : '+'}
                    </span>
                  </button>
                  {expandedIdx === idx && (
                    <div className="px-4 py-3 border-t-4 border-black bg-white">
                      <p className="text-sm font-bold leading-relaxed whitespace-pre-line">
                        {option.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {/* Contact Support */}
              <div className="border-4 border-black mb-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <button
                  onClick={() => setShowContact(!showContact)}
                  className={`w-full text-left px-4 py-3 text-sm font-bold tracking-wider uppercase flex items-center justify-between transition-colors ${
                    showContact ? 'bg-yellow-300' : 'bg-white hover:bg-yellow-100'
                  }`}
                >
                  <span>Contact Support</span>
                  <span className="font-manga text-xl ml-2">
                    {showContact ? '−' : '+'}
                  </span>
                </button>
                {showContact && (
                  <div className="px-4 py-4 border-t-4 border-black bg-white">
                    {contactSubmitted ? (
                      <div className="text-center py-6">
                        <div className="inline-block bg-yellow-300 border-4 border-black px-4 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -skew-x-6">
                          <p className="text-sm font-manga tracking-wider">
                            MESSAGE RECEIVED!
                          </p>
                        </div>
                        <p className="text-xs font-bold mt-3">Our heroes are on it. 🦸</p>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-3">
                        <input
                          type="text"
                          placeholder="YOUR NAME"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full px-3 py-2.5 border-4 border-black text-xs font-bold uppercase tracking-wider focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                        />
                        <input
                          type="email"
                          placeholder="YOUR EMAIL"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full px-3 py-2.5 border-4 border-black text-xs font-bold uppercase tracking-wider focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                        />
                        <input
                          type="text"
                          placeholder="SUBJECT"
                          required
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          className="w-full px-3 py-2.5 border-4 border-black text-xs font-bold uppercase tracking-wider focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                        />
                        <textarea
                          placeholder="YOUR MESSAGE..."
                          required
                          rows={4}
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          className="w-full px-3 py-2.5 border-4 border-black text-xs font-bold tracking-wider focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-shadow resize-none"
                        />
                        <button
                          type="submit"
                          className="w-full px-4 py-3 bg-black text-white text-sm font-bold tracking-wider uppercase border-4 border-black hover:bg-yellow-300 hover:text-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                          SEND MESSAGE →
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 pb-6">
              <div className="border-t-4 border-black pt-4 text-center">
                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500">
                  PANEL SUPPORT — A COLLEGE PROJECT
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SpiderManHelp;
