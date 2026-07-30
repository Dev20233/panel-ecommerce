import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
      <div className="manga-box bg-white p-6 sm:p-12 text-center transform -rotate-2 mx-4">
        <h1 className="font-manga tracking-widest mb-4 border-b-8 border-black pb-4" style={{ fontSize: 'clamp(6rem, 25vw, 12rem)', textShadow: '4px 4px 0px #fde047', lineHeight: 1 }}>404</h1>
        <p className="text-xl sm:text-3xl font-manga tracking-widest mb-4 uppercase bg-black text-white px-4 py-2 inline-block transform skew-x-12">PAGE NOT FOUND</p>
        <p className="text-base sm:text-lg font-bold mb-8 max-w-md border-l-4 border-black pl-4 text-left">
          THE PAGE YOU'RE LOOKING FOR DOESN'T EXIST OR HAS BEEN MOVED TO ANOTHER DIMENSION.
        </p>
        <Link to="/" className="btn-primary text-lg sm:text-2xl px-6 sm:px-8 py-3 sm:py-4 bg-yellow-300 text-black border-4 border-black hover:bg-black hover:text-white shadow-manga hover:shadow-none transform hover:translate-y-1 hover:translate-x-1 transition-all">
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
