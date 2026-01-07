import React from 'react';
import { Bell, ArrowRight } from 'lucide-react';

interface StickyCTAProps {
  onNotifyClick: () => void;
  onStartClick: () => void;
}

const StickyCTA: React.FC<StickyCTAProps> = ({ onNotifyClick, onStartClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-stone-200 z-50 p-4 shadow-2xl shadow-stone-900/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Notify Button */}
        <button 
          onClick={onNotifyClick}
          className="flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors group"
        >
          <div className="p-2 bg-stone-100 rounded-lg group-hover:bg-stone-200 transition-colors">
             <Bell size={20} className="text-orange-500" />
          </div>
          <span className="hidden md:inline font-medium">알림 신청</span>
          <span className="md:hidden text-sm">알림</span>
        </button>

        {/* Start Button */}
        <button 
          onClick={onStartClick}
          className="flex items-center gap-3 bg-stone-800 hover:bg-stone-900 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-stone-900/20"
        >
          <span>아름 시작하기</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default StickyCTA;