import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      document.body.classList.remove('bg-faded');
    } else {
      document.body.classList.add('bg-faded');
    }

    // Scroll to top immediately on route/category/trending changes (no smooth animation)
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
    
    return () => {
      document.body.classList.remove('bg-faded');
    };
  }, [location.pathname, location.search]);

  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category') || '';
  const trendingParam = searchParams.get('trending') || '';
  const transitionKey = `${location.pathname}-${categoryParam}-${trendingParam}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div key={transitionKey} className="page-transition">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
