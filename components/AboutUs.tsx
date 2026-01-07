import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section className="py-24 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Story */}
          <div className="relative p-8 border-l border-stone-200 bg-gradient-to-r from-stone-100/50 to-transparent rounded-r-xl">
            <h3 className="text-3xl font-bold text-stone-800 mb-6">Our Story</h3>
            <p className="text-stone-600 leading-relaxed text-lg">
              옷은 단순한 물건 그 이상의 가치를 가지고 있습니다. 
              자아를 표현하는 하나의 수단이 되고, 나아가 다른 사람과 소통할 수 있는 연결고리가 됩니다. 
              이러한 옷에 대한 접근성을 높여 새로운 문화를 형성하기 위해 탄생했습니다.
            </p>
          </div>

          {/* Vision */}
          <div className="relative p-8 border-l border-orange-300 bg-gradient-to-r from-orange-50/50 to-transparent rounded-r-xl">
            <h3 className="text-3xl font-bold text-stone-800 mb-6">Our Vision</h3>
            <p className="text-stone-600 leading-relaxed text-lg mb-6">
              순 우리말 <span className="text-orange-500 font-semibold">'아름'</span>은 '나다운', '양팔벌려 가득' 이라는 뜻을 가지고 있습니다. 
              우리 아름은 그 이름에 맞게 많은 사람들이 현실적인 제약에서 벗어나 
              나다운 옷을 양팔벌려 가득, 마음껏 입을 수 있게 한다는 비전을 가지고 있습니다.
            </p>
            <p className="text-stone-500 text-sm">
              브랜드 협업과 지역 거점이라는 혁신적인 커뮤니티를 통해 비용 구조를 줄이고 최상의 서비스를 제공합니다.
            </p>
          </div>

        </div>

        {/* Decorative Visual */}
        <div className="mt-20 w-full h-96 rounded-2xl overflow-hidden relative shadow-lg shadow-orange-900/5">
             <div className="absolute inset-0 bg-orange-900/10 z-10 mix-blend-overlay"></div>
             <img 
              src="https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Person spreading arms wide with freedom" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 grayscale"
             />
             <div className="absolute inset-0 z-20 flex items-center justify-center">
                 <h2 className="text-4xl md:text-6xl font-bold text-white tracking-widest opacity-90 drop-shadow-md">AREUM</h2>
             </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;