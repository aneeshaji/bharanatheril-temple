import React, { useState, useEffect } from 'react';
import {
  Bell,
  Volume2,
  VolumeX,
  Menu,
  X,
  HeartHandshake,
  Sparkles,
  Clock,
  Phone,
  Languages,
  Palette
} from 'lucide-react';
import { playTempleBell, toggleTempleDrone } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export function Navbar({ currentPage, onNavigate, onOpenDonation }) {
  const { lang, setLang, t } = useLanguage();
  const { currentTheme, setTheme, themes } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [isDronePlaying, setIsDronePlaying] = useState(false);
  const [isTempleOpen, setIsTempleOpen] = useState(true);
  const [istTimeStr, setIstTimeStr] = useState('');

  useEffect(() => {
    const updateTimeAndStatus = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const istDate = new Date(utc + (3600000 * 5.5));
      const hours = istDate.getHours();
      const minutes = istDate.getMinutes();
      const totalMinutes = hours * 60 + minutes;
      const morningOpen = totalMinutes >= 330 && totalMinutes <= 660;
      const eveningOpen = totalMinutes >= 1020 && totalMinutes <= 1200;
      setIsTempleOpen(morningOpen || eveningOpen);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const h12 = hours % 12 || 12;
      const mm = minutes < 10 ? '0' + minutes : minutes;
      setIstTimeStr(`${h12}:${mm} ${ampm} IST`);
    };
    updateTimeAndStatus();
    const interval = setInterval(updateTimeAndStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRingBell = () => playTempleBell(1.0);

  const handleToggleDrone = () => {
    toggleTempleDrone((active) => setIsDronePlaying(active));
  };

  const desktopNavLinks = [
    { id: 'home', label: t('home') },
    { id: 'about', label: t('about') },
    { id: 'deities', label: t('deities') },
    { id: 'darshan', label: t('darshan') },
    { id: 'vazhipadu', label: t('vazhipadu') },
    { id: 'festivals', label: t('festivals') },
    { id: 'gallery', label: t('gallery') },
    { id: 'contact', label: t('contact') },
  ];

  const mobileNavLinks = [
    { id: 'home', label: t('home') },
    { id: 'about', label: t('about') },
    { id: 'deities', label: t('deities') },
    { id: 'darshan', label: t('darshan') },
    { id: 'vazhipadu', label: t('vazhipadu') },
    { id: 'festivals', label: t('festivals') },
    { id: 'gallery', label: t('gallery') },
    { id: 'kanikka', label: t('kanikka') },
    { id: 'contact', label: t('contact') },
  ];

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  const toggleLang = () => setLang(lang === 'en' ? 'ml' : 'en');

  return (
    <header className={`temple-navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Top Sacred Utility Bar */}
      <div className="top-banner">
        <div className="container top-banner-content">
          <div className="status-container">
            <span className={`status-pill ${isTempleOpen ? 'open' : 'closed'}`}>
              <span className="status-indicator-dot"></span>
              {isTempleOpen ? t('nadaOpen') : t('nadaClosed')}
            </span>
            <span className="timings-hint">
              <Clock size={13} /> {istTimeStr || '5:30 AM – 11:00 AM & 5:00 PM – 8:00 PM'}
            </span>
          </div>

          <div className="audio-actions">
            <button
              className="bell-chime-btn"
              onClick={handleRingBell}
              title="Ring Sacred Temple Bell"
            >
              <Bell size={13} className="animate-wiggle" />
              <span>{t('ringBell')}</span>
            </button>

            <button
              className={`drone-toggle-btn ${isDronePlaying ? 'active' : ''}`}
              onClick={handleToggleDrone}
            >
              {isDronePlaying ? <Volume2 size={13} /> : <VolumeX size={13} />}
              <span>{isDronePlaying ? t('meditationOn') : t('meditation')}</span>
            </button>

            <a href="tel:+919447012345" className="top-phone-link">
              <Phone size={12} />
              <span>+91 94470 12345</span>
            </a>

            {/* Language Switcher */}
            <button className="lang-switcher-btn" onClick={toggleLang} title="Switch Language">
              <Languages size={13} />
              <span className="lang-indicator">
                <span className={lang === 'en' ? 'lang-active' : ''}>EN</span>
                <span className="lang-divider">|</span>
                <span className={lang === 'ml' ? 'lang-active' : ''}>മ</span>
              </span>
            </button>

            {/* Color Theme Selector */}
            <div className="theme-switcher-wrapper">
              <button
                className="theme-switcher-btn"
                onClick={() => setShowThemePicker(!showThemePicker)}
                title={lang === 'en' ? 'Change Color Theme' : 'നിറം മാറ്റുക'}
                aria-label="Change Color Theme"
              >
                <Palette size={13} className="theme-palette-icon" />
                <span
                  className="theme-active-dot"
                  style={{ backgroundColor: themes.find(t => t.id === currentTheme)?.color || '#2563eb' }}
                ></span>
                <span className="theme-active-name">
                  {lang === 'en'
                    ? themes.find(t => t.id === currentTheme)?.nameEn
                    : themes.find(t => t.id === currentTheme)?.nameMl}
                </span>
              </button>

              {showThemePicker && (
                <div className="theme-dropdown-menu">
                  <div className="theme-dropdown-header">
                    <span>{lang === 'en' ? 'Temple Color Themes' : 'ക്ഷേത്ര നിറങ്ങൾ'}</span>
                  </div>
                  <div className="theme-options-list">
                    {themes.map((tItem) => (
                      <button
                        key={tItem.id}
                        className={`theme-option-item ${currentTheme === tItem.id ? 'active' : ''}`}
                        onClick={() => {
                          setTheme(tItem.id);
                          setShowThemePicker(false);
                          playTempleBell(1.2);
                        }}
                      >
                        <span className="theme-swatch" style={{ backgroundColor: tItem.color }}></span>
                        <div className="theme-option-text">
                          <span className="theme-name">{lang === 'en' ? tItem.nameEn : tItem.nameMl}</span>
                          <span className="theme-desc">{lang === 'en' ? tItem.descriptionEn : ''}</span>
                        </div>
                        {currentTheme === tItem.id && <span className="theme-check-mark">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="nav-main">
        <div className="container nav-main-content">
          {/* Clean Modern Brand Logo */}
          <div
            className="brand-logo"
            onClick={() => handleNavClick('home')}
            style={{ cursor: 'pointer' }}
          >
            <div className="brand-icon-wrapper">
              <img src="/lamp-icon.svg" alt="Temple Lamp" className="lamp-brand-icon animate-flame" />
            </div>
            <div className="brand-titles">
              <span className="brand-title-primary">
                {lang === 'en' ? 'Bharanatheril' : 'ഭരണത്തേരിൽ'}
              </span>
              <span className="brand-title-secondary">
                {lang === 'en' ? 'Sree Bhadra Bhagavathy Temple' : 'ശ്രീ ഭദ്ര ഭഗവതി ക്ഷേത്രം'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-menu">
              {desktopNavLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <li key={link.id}>
                    <button
                      className={`nav-item-btn ${isActive ? 'active' : ''}`}
                      onClick={() => handleNavClick(link.id)}
                    >
                      <span className="nav-label-en">{link.label}</span>
                      {isActive && <div className="nav-active-lotus-line"></div>}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="nav-cta-group">
              <button
                className="btn-kanikka-header"
                onClick={onOpenDonation}
              >
                <HeartHandshake size={15} />
                <span>{t('eKanikka')}</span>
              </button>

              <button
                className="btn-gold-sm"
                onClick={() => handleNavClick('vazhipadu')}
              >
                <Sparkles size={15} />
                <span>{t('bookVazhipadu')}</span>
              </button>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-inner">
            {/* Mobile Language Toggle */}
            <div className="mobile-lang-toggle">
              <button
                className={`mobile-lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => { setLang('en'); }}
              >
                English
              </button>
              <button
                className={`mobile-lang-btn ${lang === 'ml' ? 'active' : ''}`}
                onClick={() => { setLang('ml'); }}
              >
                മലയാളം
              </button>
            </div>

            <ul className="mobile-nav-list">
              {mobileNavLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <li key={link.id}>
                    <button
                      className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
                      onClick={() => handleNavClick(link.id)}
                    >
                      <span>{link.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Mobile Theme Selector */}
            <div className="mobile-theme-bar">
              <span className="mobile-theme-label">
                <Palette size={14} className="text-gold" />
                <span>{lang === 'en' ? 'Color Theme' : 'നിറം'}</span>
              </span>
              <div className="mobile-theme-dots">
                {themes.map((tItem) => (
                  <button
                    key={tItem.id}
                    className={`mobile-theme-dot-btn ${currentTheme === tItem.id ? 'active' : ''}`}
                    style={{ backgroundColor: tItem.color }}
                    onClick={() => {
                      setTheme(tItem.id);
                      playTempleBell(1.2);
                    }}
                    title={tItem.nameEn}
                    aria-label={tItem.nameEn}
                  />
                ))}
              </div>
            </div>

            <div className="mobile-actions">
              <button className="bell-chime-btn mobile-full-btn" onClick={handleRingBell}>
                <Bell size={16} />
                <span>{t('ringBell')}</span>
              </button>

              <button
                className="btn-gold mobile-full-btn"
                onClick={() => handleNavClick('vazhipadu')}
              >
                <Sparkles size={17} />
                <span>{t('bookVazhipadu')}</span>
              </button>

              <button
                className="btn-primary mobile-full-btn"
                onClick={() => { setMobileMenuOpen(false); onOpenDonation(); }}
              >
                <HeartHandshake size={17} />
                <span>{t('eKanikka')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
