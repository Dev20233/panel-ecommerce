const SkeletonCard = () => {
  return (
    <div className="manga-box bg-white flex flex-col h-full overflow-hidden opacity-80">
      <div className="relative overflow-hidden aspect-[3/4] border-b-4 border-black bg-gray-200 animate-pulse"></div>
      <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
        <div>
          <div className="w-20 h-5 bg-gray-200 mb-2 transform -skew-x-6 animate-pulse"></div>
          <div className="w-3/4 h-6 bg-gray-200 animate-pulse mt-2"></div>
        </div>
        <div className="w-1/2 h-8 bg-gray-200 mt-4 animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
