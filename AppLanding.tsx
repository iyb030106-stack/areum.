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
    const envStoreUrl = import.meta.env.VITE_STORE_URL;
    const currentHost = window.location.host;
    const currentProtocol = window.location.protocol;
    
    let storeUrl = envStoreUrl;
    
    // 환경 변수가 없으면 자동 감지
    if (!storeUrl) {
      // 개발 환경 (localhost)
      if (currentHost.includes('localhost') || currentHost.includes('127.0.0.1')) {
        const port = currentHost.includes(':') ? currentHost.split(':')[1] : '';
        if (port === '3000' || !port) {
          storeUrl = `${currentProtocol}//localhost:3001`;
        } else {
          // 다른 포트에서 실행 중인 경우 포트만 변경
          const baseHost = currentHost.split(':')[0];
          storeUrl = `${currentProtocol}//${baseHost}:3001`;
        }
      }
      // Vercel 프로덕션 환경
      else if (currentHost.includes('vercel.app')) {
        // areum-landing.vercel.app -> areum-store.vercel.app
        if (currentHost.includes('landing')) {
          storeUrl = `${currentProtocol}//${currentHost.replace('landing', 'store')}`;
        } else {
          // landing이 없으면 -store 추가
          storeUrl = `${currentProtocol}//${currentHost.replace('.vercel.app', '-store.vercel.app')}`;
        }
      }
      // 일반 도메인
      else {
        // areum.com -> store.areum.com
        if (!currentHost.startsWith('store.')) {
          const parts = currentHost.split('.');
          if (parts.length >= 2) {
            const domain = parts.slice(-2).join('.');
            storeUrl = `${currentProtocol}//store.${domain}`;
          } else {
            storeUrl = `${currentProtocol}//store.${currentHost}`;
          }
        } else {
          // 이미 store 도메인에 있는 경우 (이상한 경우)
          alert('이미 Store 페이지에 있습니다.');
          return;
        }
      }
    }
    
    // URL이 생성되지 않았으면 기본값 사용하지 않고 안내 메시지 표시
    if (!storeUrl) {
      alert('Store URL을 찾을 수 없습니다. Vercel 환경 변수에 VITE_STORE_URL을 설정해주세요.');
      return;
    }
    
    // URL로 이동
    console.log('Store로 이동:', storeUrl);
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

