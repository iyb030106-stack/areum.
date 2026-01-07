import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h4 className="text-white font-bold text-xl mb-2">Areum.</h4>
          <p className="text-sm">나다운 옷을 마음껏, 지역 거점 의류 대여 서비스</p>
        </div>
        
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-white transition-colors">이용약관</a>
          <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
          <a href="#" className="hover:text-white transition-colors">문의하기</a>
        </div>
        
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Areum Corp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;