import React from 'react';
import Shop from './components/Shop';

const AppStore: React.FC = () => {
  const handleBack = () => {
    // 랜딩페이지 도메인으로 리다이렉트
    const landingUrl = import.meta.env.VITE_LANDING_URL || 'https://areum.com';
    window.location.href = landingUrl;
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 selection:bg-orange-200 selection:text-orange-900">
      <Shop onBack={handleBack} />
    </div>
  );
};

export default AppStore;

