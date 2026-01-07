import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const Service: React.FC = () => {
  const problems = [
    { id: 1, text: '"입고 싶은 옷은 많지만\n돈이 없어"' },
    { id: 2, text: '"나한테 맞는 스타일일지\n잘 모르겠어"' },
    { id: 3, text: '"필요할 때만\n옷을 입고 싶어"' },
    { id: 4, text: '"지금 당장\n그 옷이 필요해"' },
  ];

  return (
    <section className="py-24 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-20">
          <h2 className="text-orange-600 font-medium mb-2 tracking-wider uppercase text-sm">Service</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-stone-800">
            옷에 대한 새로운 정의
          </h3>
        </div>

        {/* Problem Section */}
        <div className="mb-24">
          <div className="flex items-center gap-2 mb-8">
            <AlertCircle className="text-stone-400" />
            <span className="text-xl font-semibold text-stone-700">Current Problems</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {problems.map((prob) => (
              <div 
                key={prob.id} 
                className="bg-white border border-stone-200 p-8 rounded-xl shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 flex items-center justify-center text-center h-40 group"
              >
                <p className="text-lg font-medium text-stone-500 group-hover:text-stone-800 transition-colors whitespace-pre-line break-keep leading-relaxed">
                  {prob.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Solution Section */}
        <div className="bg-orange-50/50 rounded-2xl p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center border border-orange-100">
          <div className="md:w-1/2">
             <div className="flex items-center gap-2 mb-6">
                <CheckCircle2 className="text-orange-500" />
                <span className="text-xl font-semibold text-stone-800">Our Solution</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-snug text-stone-800">
              돈이나 스타일에 제약없이<br/>
              <span className="text-orange-500">원하는 옷을 아름답게</span> 대여하세요.
            </h3>
            <div className="space-y-4 text-stone-600 leading-relaxed">
              <p>
                나와 가장 가까운 오프라인 매장이나 온라인에서 언제든지 대여하고 반납할 수 있습니다.
              </p>
              <p>
                옷을 통해 나를 표현하고 나머지 귀찮은 과정은 아름한테 맡기세요. 
                배송, 수거는 물론 아름만의 전문 세탁 과정과 개별 데이터 관리를 통해 
                소유가 아닌 경험 자체에서 오는 즐거움을 누려보세요.
              </p>
            </div>
          </div>
          <div className="md:w-1/2 w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-xl shadow-orange-900/5 relative group">
             <img 
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Cozy Clothing Rack" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 grayscale"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Service;