import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="group block manga-box bg-white flex flex-col h-full overflow-hidden product-card">
      <div className="relative overflow-hidden aspect-[3/4] border-b-4 border-black">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover product-card-image"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-2xl font-manga tracking-widest uppercase bg-black text-white px-4 py-2 transform -skew-x-12 border-2 border-black">Sold Out</span>
          </div>
        )}
        {product.newArrival && product.stock > 0 && (
          <span className="absolute top-4 left-4 bg-yellow-300 text-black text-xl font-manga tracking-widest uppercase px-3 py-1 border-2 border-black transform -rotate-6 shadow-manga-hover">
            NEW!
          </span>
        )}
      </div>
      <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase bg-black text-white inline-block px-2 py-0.5 transform -skew-x-6 mb-2">{product.category}</p>
          <h3 className="text-lg font-bold tracking-wider leading-tight">
            <span className="product-card-title">{product.name}</span>
          </h3>
        </div>
        <p className="text-2xl font-manga tracking-widest mt-2">₹{product.price.toLocaleString('en-IN')}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
