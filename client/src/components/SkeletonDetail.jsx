import { Link } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';

const SkeletonDetail = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-bold uppercase hover:bg-black hover:text-white px-3 py-1 transition-colors border-2 border-transparent hover:border-black mb-8">
          <HiOutlineArrowLeft size={16} strokeWidth={2.5} /> BACK TO SHOP
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <div className="manga-box aspect-[3/4] bg-gray-200 animate-pulse shadow-manga"></div>
          <div className="manga-box bg-white p-6 sm:p-8 lg:p-10 flex flex-col justify-center shadow-manga">
            <div className="w-24 h-6 bg-gray-200 mb-4 animate-pulse"></div>
            <div className="w-3/4 h-12 md:h-16 bg-gray-200 mb-4 animate-pulse"></div>
            <div className="w-1/3 h-10 bg-gray-200 mb-6 animate-pulse"></div>
            <div className="w-full h-32 bg-gray-200 border-l-4 border-black pl-4 mb-8 animate-pulse"></div>
            <div className="mb-6">
              <div className="w-20 h-6 bg-gray-200 mb-3 animate-pulse"></div>
              <div className="flex gap-3">
                <div className="w-14 h-14 bg-gray-200 animate-pulse"></div>
                <div className="w-14 h-14 bg-gray-200 animate-pulse"></div>
              </div>
            </div>
            <div className="mb-8">
              <div className="w-24 h-6 bg-gray-200 mb-3 animate-pulse"></div>
              <div className="w-32 h-14 bg-gray-200 animate-pulse"></div>
            </div>
            <div className="w-full h-16 bg-gray-200 border-4 border-black animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonDetail;
