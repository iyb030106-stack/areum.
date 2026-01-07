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
    // Store 도메인으로 리다이렉트 (환경 변수나 설정에서 가져올 수 있음)
    const storeUrl = import.meta.env.VITE_STORE_URL || 'https://store.areum.com';
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

