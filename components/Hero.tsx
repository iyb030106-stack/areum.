import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#FDFBF7]">
      {/* Warm Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-50/50 via-[#FDFBF7] to-[#FDFBF7]"></div>
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-orange-200/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] bg-rose-200/20 rounded-full blur-[100px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-orange-600 font-bold tracking-widest mb-4 uppercase text-sm md:text-base animate-fade-in-up">
          Areum.
        </h2>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-tight text-stone-800">
          나다운 옷을 마음껏
        </h1>
        
        <p className="text-lg md:text-2xl text-stone-500 font-normal mb-8 max-w-2xl leading-relaxed">
          부담 없이 다양한 옷을 입고 싶은 우리를 위한<br className="hidden md:block"/> 
          따뜻한 지역 거점 의류 대여 서비스
        </p>
        
        <div className="relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-orange-300/50 rounded-full"></div>
          <p className="text-sm md:text-base text-stone-500 pl-4 py-1 text-left">
            가까운 오프라인 매장과 온라인에서<br />
            가볍게, 그리고 포근하게 옷을 만나보세요.
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-stone-400">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;