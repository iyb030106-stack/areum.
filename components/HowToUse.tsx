import React from 'react';
import { MapPin, ShoppingBag, Shirt, Truck, Sparkles, ArrowRight } from 'lucide-react';

const HowToUse: React.FC = () => {
  const steps = [
    {
      step: 1,
      icon: <MapPin className="w-8 h-8" />,
      title: "매장 찾기",
      desc: ["회원가입하고", "가장 가까운 매장을 찾아보세요"]
    },
    {
      step: 2,
      icon: <ShoppingBag className="w-8 h-8" />,
      title: "대여/주문",
      desc: ["가까운 매장에서 직접 입어보고 대여", "온라인에서 원하는 옷 예약/주문"]
    },
    {
      step: 3,
      icon: <Shirt className="w-8 h-8" />,
      title: "착용",
      desc: ["걱정없이 옷을 입어보세요"]
    },
    {
      step: 4,
      icon: <Truck className="w-8 h-8" />,
      title: "반납",
      desc: ["오프라인 매장에 직접 반납", "내 집 앞 수거 서비스 이용"]
    },
    {
      step: 5,
      icon: <Sparkles className="w-8 h-8" />,
      title: "케어",
      desc: ["뒤처리는 아름에게 맡기세요"]
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-orange-600 font-medium mb-2 tracking-wider uppercase text-sm">How It Works</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-stone-800">
            쉽고 간편한 이용 방법
          </h3>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-stone-100 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {steps.map((item, index) => (
              <div key={item.step} className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-[#FDFBF7] border-2 border-stone-100 rounded-2xl flex items-center justify-center text-stone-400 mb-6 group-hover:border-orange-200 group-hover:text-orange-500 group-hover:bg-white transition-all duration-300 shadow-sm">
                  {item.icon}
                </div>
                
                <h4 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
                  <span className="text-xs bg-stone-100 text-stone-500 px-2 py-1 rounded-full">Step {item.step}</span>
                  <span className="md:hidden lg:inline">{item.title}</span>
                </h4>
                
                <div className="space-y-1">
                  {item.desc.map((d, i) => (
                    <p key={i} className="text-sm text-stone-500 break-keep leading-snug">
                      {d}
                    </p>
                  ))}
                </div>

                {index < steps.length - 1 && (
                  <ArrowRight className="md:hidden mt-6 text-stone-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToUse;