import React from 'react';
import Shop from './components/Shop';

const AppStore: React.FC = () => {
  const handleBack = () => {
    // 랜딩페이지 도메인으로 리다이렉트
    // 1. 환경 변수에서 가져오기 (Vercel에서 설정)
    // 2. 없으면 현재 도메인 기반으로 랜딩페이지 도메인 자동 생성
    // 3. 최종 기본값 사용
    const envLandingUrl = import.meta.env.VITE_LANDING_URL;
    
    let landingUrl = envLandingUrl;
    
    if (!landingUrl) {
      // 현재 도메인 기반으로 랜딩페이지 도메인 생성
      const currentHost = window.location.host;
      const currentProtocol = window.location.protocol;
      
      // localhost나 IP 주소인 경우
      if (currentHost.includes('localhost') || currentHost.includes('127.0.0.1') || currentHost.match(/^\d+\.\d+\.\d+\.\d+/)) {
        // 개발 환경: 포트 3000으로 이동
        landingUrl = `${currentProtocol}//${currentHost.replace(':3001', ':3000')}`;
      } else {
        // 프로덕션 환경: store 제거하여 랜딩페이지 도메인 생성
        // store.areum.com -> areum.com
        // areum-store.vercel.app -> areum-landing.vercel.app
        if (currentHost.includes('vercel.app')) {
          landingUrl = currentHost.replace('store', 'landing');
          if (landingUrl === currentHost) {
            // store가 없는 경우 landing으로 변경
            landingUrl = currentHost.replace('-store.vercel.app', '-landing.vercel.app');
          }
          landingUrl = `${currentProtocol}//${landingUrl}`;
        } else if (currentHost.startsWith('store.')) {
          // store.도메인 -> 도메인 (메인 도메인)
          landingUrl = `${currentProtocol}//${currentHost.replace('store.', '')}`;
        } else {
          // store가 포함된 경우 제거
          landingUrl = `${currentProtocol}//${currentHost.replace('store', '').replace('..', '.').replace(/^\./, '')}`;
          if (!landingUrl || landingUrl === `${currentProtocol}//`) {
            landingUrl = `${currentProtocol}//${currentHost.split('.').slice(1).join('.')}`;
          }
        }
      }
    }
    
    // 최종 기본값
    if (!landingUrl) {
      landingUrl = 'https://areum.com';
    }
    
    window.location.href = landingUrl;
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 selection:bg-orange-200 selection:text-orange-900">
      <Shop onBack={handleBack} />
    </div>
  );
};

export default AppStore;

