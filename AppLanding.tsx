import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Service from './components/Service';
import HowToUse from './components/HowToUse';
import AboutUs from './components/AboutUs';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import NotificationModal from './components/NotificationModal';

const AppLanding: React.FC = () => {
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openNotify = () => setIsNotifyOpen(true);
  const closeNotify = () => setIsNotifyOpen(false);

  const handleStartClick = () => {
    // Store 도메인으로 리다이렉트
    // 1. 환경 변수에서 가져오기 (Vercel에서 설정)
    // 2. 없으면 현재 도메인 기반으로 store 서브도메인 자동 생성
    // 3. 최종 기본값 사용
    const envStoreUrl = import.meta.env.VITE_STORE_URL;
    
    let storeUrl = envStoreUrl;
    
    if (!storeUrl) {
      // 현재 도메인 기반으로 store 서브도메인 생성
      const currentHost = window.location.host;
      const currentProtocol = window.location.protocol;
      
      // localhost나 IP 주소인 경우
      if (currentHost.includes('localhost') || currentHost.includes('127.0.0.1') || currentHost.match(/^\d+\.\d+\.\d+\.\d+/)) {
        // 개발 환경: 포트 3001로 이동
        storeUrl = `${currentProtocol}//${currentHost.replace(':3000', ':3001')}`;
      } else {
        // 프로덕션 환경: store 서브도메인 생성
        // areum.com -> store.areum.com
        // areum-landing.vercel.app -> areum-store.vercel.app
        if (currentHost.includes('vercel.app')) {
          storeUrl = currentHost.replace('landing', 'store');
          if (storeUrl === currentHost) {
            // landing이 없는 경우 store 추가
            storeUrl = currentHost.replace('.vercel.app', '-store.vercel.app');
          }
          storeUrl = `${currentProtocol}//${storeUrl}`;
        } else {
          // 일반 도메인: store 서브도메인
          const parts = currentHost.split('.');
          if (parts.length >= 2) {
            const domain = parts.slice(-2).join('.');
            storeUrl = `${currentProtocol}//store.${domain}`;
          } else {
            storeUrl = `${currentProtocol}//store.${currentHost}`;
          }
        }
      }
    }
    
    // 최종 기본값
    if (!storeUrl) {
      storeUrl = 'https://store.areum.com';
    }
    
    window.location.href = storeUrl;
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 selection:bg-orange-200 selection:text-orange-900 pb-24 md:pb-0">
      <Header onNavigate={scrollToSection} />
      
      <main>
        <div id="home">
          <Hero />
        </div>
        
        <div id="service">
          <Service />
        </div>
        
        <div id="how-to-use">
          <HowToUse />
        </div>
        
        <div id="about">
          <AboutUs />
        </div>

        <div id="faq">
          <FAQ />
        </div>
      </main>

      <Footer />

      {/* Persistent Sticky CTA Bar */}
      <StickyCTA 
        onNotifyClick={openNotify} 
        onStartClick={handleStartClick}
      />

      {/* Notification Modal */}
      {isNotifyOpen && <NotificationModal onClose={closeNotify} />}
    </div>
  );
};

export default AppLanding;

