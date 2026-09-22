import React, { useState, useEffect } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DonationModal } from './components/DonationModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DeitiesPage } from './pages/DeitiesPage';
import { DarshanPage } from './pages/DarshanPage';
import { VazhipaduPage } from './pages/VazhipaduPage';
import { FestivalsPage } from './pages/FestivalsPage';
import { GalleryPage } from './pages/GalleryPage';
import { DonationPage } from './pages/DonationPage';
import { ContactPage } from './pages/ContactPage';

import { Sparkles, HeartHandshake, Bell } from 'lucide-react';
import { playTempleBell } from './utils/soundEffects';
import { useLanguage } from './context/LanguageContext';

export function App() {
  const { lang, t } = useLanguage();
  const [currentPage, setCurrentPage] = useState('home');
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [poojaDeityFilter, setPoojaDeityFilter] = useState('All');
  const [showFloatingStrip, setShowFloatingStrip] = useState(false);

  // Show floating action strip only after scrolling past hero fold
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingStrip(window.scrollY > 380);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync hash routing with window.location.hash
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validPages = ['home', 'about', 'deities', 'darshan', 'vazhipadu', 'festivals', 'gallery', 'kanikka', 'contact'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, []);

  const navigate = (pageId) => {
    setCurrentPage(pageId);
    window.location.hash = `#/${pageId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDeityForPooja = (deityName) => {
    setPoojaDeityFilter(deityName);
    navigate('vazhipadu');
  };

  const handleOpenDonation = () => {
    setIsDonationOpen(true);
  };

  const handleCloseDonation = () => {
    setIsDonationOpen(false);
  };

  return (
    <div className="temple-app">
      {/* Top Main Navbar */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={navigate}
        onOpenDonation={handleOpenDonation}
      />

      {/* Main Dynamic View */}
      <main className="main-content-flow">
        {currentPage === 'home' && (
          <HomePage 
            onNavigate={navigate}
            onOpenDonation={handleOpenDonation}
            onSelectDeityForPooja={handleSelectDeityForPooja}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage 
            onNavigate={navigate}
            onOpenDonation={handleOpenDonation}
          />
        )}

        {currentPage === 'deities' && (
          <DeitiesPage 
            onNavigate={navigate}
            onSelectDeityForPooja={handleSelectDeityForPooja}
          />
        )}

        {currentPage === 'darshan' && (
          <DarshanPage 
            onNavigate={navigate}
          />
        )}

        {currentPage === 'vazhipadu' && (
          <VazhipaduPage 
            defaultDeityFilter={poojaDeityFilter}
            onNavigate={navigate}
          />
        )}

        {currentPage === 'festivals' && (
          <FestivalsPage 
            onNavigate={navigate}
            onOpenDonation={handleOpenDonation}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage 
            onNavigate={navigate}
          />
        )}

        {currentPage === 'kanikka' && (
          <DonationPage 
            onNavigate={navigate}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage 
            onNavigate={navigate}
          />
        )}
      </main>

      {/* Footer */}
      <Footer 
        onNavigate={navigate}
        onOpenDonation={handleOpenDonation}
      />

      {/* Floating Quick Action Strip (visible when scrolling past hero) */}
      {showFloatingStrip && (
        <div className="floating-devotion-strip animate-fade-in">
          <button 
            className="float-action-btn bell"
            onClick={() => playTempleBell(1.0)}
            title={lang === 'en' ? 'Ring Sacred Bell' : 'ക്ഷേത്ര മണി മുഴക്കുക'}
            aria-label="Ring Temple Bell"
          >
            <Bell size={18} className="animate-wiggle" />
          </button>

          <button 
            className="float-action-btn vazhipadu"
            onClick={() => navigate('vazhipadu')}
            title={lang === 'en' ? 'Book Offering' : 'വഴിപാട് ബുക്കിംഗ്'}
            aria-label="Book Vazhipadu"
          >
            <Sparkles size={18} />
            <span>{t('vazhipadu')}</span>
          </button>

          <button 
            className="float-action-btn donation"
            onClick={handleOpenDonation}
            title={lang === 'en' ? 'E-Kanikka' : 'ഇ-കാണിക്ക'}
            aria-label="E-Kanikka Donation"
          >
            <HeartHandshake size={18} />
            <span>{t('kanikka')}</span>
          </button>
        </div>
      )}

      {/* Global E-Kanikka Modal */}
      <DonationModal 
        isOpen={isDonationOpen}
        onClose={handleCloseDonation}
      />
    </div>
  );
}

export default App;
