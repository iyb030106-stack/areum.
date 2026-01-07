import React from 'react';

const FAQ: React.FC = () => {
  const faqs = [
    { q: "대여 기간은 얼마나 되나요?", a: "기본 대여 기간은 3박 4일이며, 연장 신청이 가능합니다." },
    { q: "옷이 손상되면 어떻게 하나요?", a: "가벼운 생활 오염은 무료로 처리됩니다. 심각한 손상의 경우 보험 프로그램이 준비되어 있습니다." },
    { q: "배송 지역은 어디인가요?", a: "현재 서울 전 지역과 경기 일부 지역에서 서비스 중이며, 전국으로 확대 예정입니다." },
    { q: "직접 매장에서 입어볼 수 있나요?", a: "네, 가까운 '아름 스팟'을 방문하시면 모든 의류를 직접 착용해보고 대여하실 수 있습니다." },
  ];

  return (
    <section className="py-24 bg-stone-100">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-stone-800 mb-12 text-center">자주 묻는 질문</h2>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-stone-200 pb-6">
              <h4 className="text-xl font-medium text-stone-700 mb-2 cursor-pointer hover:text-orange-600 transition-colors">
                Q. {faq.q}
              </h4>
              <p className="text-stone-500 pl-4 border-l-2 border-stone-300">
                A. {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;