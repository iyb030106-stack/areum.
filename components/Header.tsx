import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: '서비스', id: 'service' },
    { label: '이용방법', id: 'how-to-use' },
    { label: 'About Us', id: 'about' },
    { label: 'FAQ', id: 'faq' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-stone-200/50 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('home')} 
          className={`cursor-pointer font-bold text-2xl tracking-tighter transition-colors ${isScrolled ? 'text-stone-800' : 'text-stone-800'} hover:text-orange-600`}
        >
          아름. Areum
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium transition-colors ${
                  isScrolled ? 'text-stone-600 hover:text-orange-600' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-stone-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-b border-stone-200 absolute top-full left-0 right-0 p-4 flex flex-col space-y-4 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-left text-base font-medium text-stone-600 hover:text-orange-600 py-2"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;