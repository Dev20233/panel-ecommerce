import { useState, useEffect } from 'react';
import shieldImg from '../assets/shield.png';

const loadingMessages = [
  "ASSEMBLING THE HEROES...",
  "SEARCHING THE MULTIVERSE...",
  "LOADING THE LOOT...",
  "OPENING THE VAULT...",
  "SUMMONING YOUR COLLECTION..."
];

const Loading = () => {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[10000] bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex flex-col items-center justify-center">
      
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-manga tracking-widest uppercase mb-12 bg-black text-white px-4 py-2 transform -skew-x-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(253,224,71,1)]">
        PANEL
      </h2>

      <div className="relative mb-12">
        {/* Shield with multiply blend mode so white bg becomes transparent */}
        <img 
          src={shieldImg} 
          alt="Loading Shield" 
          className="w-28 md:w-36 h-28 md:h-36 object-contain shield-spin border-4 border-black rounded-full bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          style={{ mixBlendMode: 'multiply' }}
        />
        {/* Subtle motion lines around the shield */}
        <div className="absolute inset-[-15px] border-2 border-black border-dashed rounded-full shield-spin-reverse opacity-30 pointer-events-none" />
      </div>

      <div className="text-center px-4">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-manga tracking-widest uppercase mb-6 inline-block relative">
          <span className="relative z-10">LOADING THE MULTIVERSE...</span>
          {/* Yellow highlight behind text */}
          <span className="absolute bottom-1 left-0 w-full h-[40%] bg-yellow-300 transform -skew-x-12 z-0" />
        </h3>
        
        <div className="flex justify-center space-x-4 mb-8">
          <span className="w-3 h-3 bg-black border-2 border-black rounded-full animate-bounce shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" style={{ animationDelay: '0s' }} />
          <span className="w-3 h-3 bg-black border-2 border-black rounded-full animate-bounce shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" style={{ animationDelay: '0.2s' }} />
          <span className="w-3 h-3 bg-black border-2 border-black rounded-full animate-bounce shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" style={{ animationDelay: '0.4s' }} />
        </div>

        <div className="inline-block bg-black text-white px-4 py-2 transform skew-x-6 border-2 border-transparent">
          <p className="text-xs md:text-sm font-bold tracking-widest uppercase transform -skew-x-6">
            {loadingMessages[msgIdx]}
          </p>
        </div>
      </div>

    </div>
  );
};

export default Loading;
