import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Service from './components/Service';
import HowToUse from './components/HowToUse';
import AboutUs from './components/AboutUs';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import NotificationModal from './components/NotificationModal';
import Shop from './components/Shop';

const App: React.FC = () => {
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'landing' | 'shop'>('landing');

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    // If on shop view, go back to landing first
    if (currentView === 'shop') {
      setCurrentView('landing');
      // Wait for render then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const openNotify = () => setIsNotifyOpen(true);
  const closeNotify = () => setIsNotifyOpen(false);

  // Scroll to top when switching views
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  if (currentView === 'shop') {
    return (
      <div className="min-h-screen bg-[#FDFBF7] text-stone-800 selection:bg-orange-200 selection:text-orange-900">
        <Shop onBack={() => setCurrentView('landing')} />
        {/* StickyCTA is intentionally removed here */}
        {isNotifyOpen && <NotificationModal onClose={closeNotify} />}
      </div>
    );
  }

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
        onStartClick={() => setCurrentView('shop')} 
      />

      {/* Notification Modal */}
      {isNotifyOpen && <NotificationModal onClose={closeNotify} />}
    </div>
  );
};

export default App;