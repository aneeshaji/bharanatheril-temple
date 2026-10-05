import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  Bell,
  Sun,
  Flame,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { playTempleBell } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

export function Hero({ onOpenVazhipadu, onOpenDonation, onNavigate }) {
  const { lang } = useLanguage();

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [bellRung, setBellRung] = useState(false);
  const [isTempleOpen, setIsTempleOpen] = useState(true);
  const [currentIstTime, setCurrentIstTime] = useState('');

  // 3 Curated Scenes
  const bannerSlides = [
    {
      id: 'devi',
      image: '/images/hero-devi-portrait.jpg',
      eyebrowEn: '✦ Divine Abode in Karunagappally, Kerala',
      eyebrowMl: '✦ തുറയിൽക്കുന്നിലെ പുണ്യ ശാക്തേയ സന്നിധി',
      headingLine1En: 'SACRED SANCTUARY',
      headingLine1Ml: 'ശ്രീ ഭദ്രകാളിയുടെ',
      headingLine2En: 'OF',
      headingLine2Ml: 'പുണ്യ',
      headingLine3En: 'MOTHER BHADRAKALI',
      headingLine3Ml: 'ശാക്തേയ പീഠം',
      taglineEn:
        'Immerse in centuries of divine maternal grace, fierce protection, and authentic Kerala tantric traditions.',
      taglineMl:
        'മാതൃവാത്സല്യവും സർവ്വാഭീഷ്ട വരദാനവും നിറയുന്ന തുറയിൽക്കുന്നിലെ പുണ്യ ശാക്തേയ സന്നിധി.',
      primaryCtaEn: 'Book Online Pooja',
      primaryCtaMl: 'വഴിപാടുകൾ ബുക്ക് ചെയ്യുക',
      primaryAction: onOpenVazhipadu,
      secondaryCtaEn: 'Explore History',
      secondaryCtaMl: 'ക്ഷേത്ര ചരിത്രം',
      secondaryAction: () => onNavigate && onNavigate('about')
    },
    {
      id: 'festival',
      image: '/images/festival-pongala.jpg',
      eyebrowEn: '✦ Annual Kumbham / Meenam Festival',
      eyebrowMl: '✦ വാർഷിക കുംഭ ഭരണി മഹോത്സവം & പൊങ്കാല',
      headingLine1En: 'GRAND BHARANI',
      headingLine1Ml: 'മഹാ ഭരണി',
      headingLine2En: 'MAHOTSAVAM &',
      headingLine2Ml: 'മഹോത്സവവും',
      headingLine3En: 'SACRED PONGALA',
      headingLine3Ml: 'പൊങ്കാല സമർപ്പണവും',
      taglineEn:
        'Thalappoli processions, majestic Chenda Melam, Kuthiyottam, and midnight Guruthi Tharpana.',
      taglineMl:
        'പഞ്ചാരിമേളം, താലപ്പൊലി, കുത്തിയോട്ടം, ഭക്തിസാന്ദ്രമായ പൊങ്കാല സമർപ്പണം.',
      primaryCtaEn: 'Festival Schedule',
      primaryCtaMl: 'ഉത്സവ വിവരങ്ങൾ',
      primaryAction: () => onNavigate && onNavigate('festivals'),
      secondaryCtaEn: 'Offer Kanikka',
      secondaryCtaMl: 'കാണിക്ക സമർപ്പിക്കുക',
      secondaryAction: onOpenDonation
    },
    {
      id: 'sarpakavu',
      image: '/images/hero-sarpakavu-bright.jpg',
      eyebrowEn: '✦ Ancient Sacred Nature Grove',
      eyebrowMl: '✦ പുണ്യ നാഗരാജ സന്നിധി • സർപ്പക്കാവ്',
      headingLine1En: 'SACRED GROVE',
      headingLine1Ml: 'നാഗരാജാവും നാഗയക്ഷിയും',
      headingLine2En: 'OF',
      headingLine2Ml: 'വാഴുന്ന',
      headingLine3En: 'NAGARAJA & NAGAYAKSHI',
      headingLine3Ml: 'പുണ്യ സർപ്പക്കാവ്',
      taglineEn:
        'Preserving ancient sacred flora • Daily Ayilyam Pooja, Noorum Palum, and Turmeric Abhishekam.',
      taglineMl:
        'നൂറ്റാണ്ടുകളുടെ പാരമ്പര്യം • ആയില്യപൂജ, നൂറുംപാലും, മഞ്ഞൾപ്പൊടി അഭിഷേകം.',
      primaryCtaEn: 'Book Sarpa Pooja',
      primaryCtaMl: 'സർപ്പപൂജ ബുക്ക് ചെയ്യുക',
      primaryAction: onOpenVazhipadu,
      secondaryCtaEn: 'View All Shrines',
      secondaryCtaMl: 'ഉപദേവതകളെ അറിയുക',
      secondaryAction: () => onNavigate && onNavigate('deities')
    }
  ];

  // Auto-advance banner every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % bannerSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [bannerSlides.length]);

  // Live IST Status Check
  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const istDate = new Date(utc + 3600000 * 5.5);
      const hours = istDate.getHours();
      const minutes = istDate.getMinutes();
      const totalMinutes = hours * 60 + minutes;

      // 5:30 AM to 11:00 AM (330 to 660) & 5:00 PM to 8:00 PM (1020 to 1200)
      const morningOpen = totalMinutes >= 330 && totalMinutes <= 660;
      const eveningOpen = totalMinutes >= 1020 && totalMinutes <= 1200;
      setIsTempleOpen(morningOpen || eveningOpen);

      const ampm = hours >= 12 ? 'PM' : 'AM';
      const h12 = hours % 12 || 12;
      const mm = minutes < 10 ? '0' + minutes : minutes;
      setCurrentIstTime(`${h12}:${mm} ${ampm} IST`);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleRingBell = () => {
    playTempleBell(1.1);
    setBellRung(true);
    setTimeout(() => setBellRung(false), 2400);
  };

  const current = bannerSlides[activeSlideIndex];

  return (
    <section className="temple-hero-standard-section" aria-label="Temple Main Banner">
      {/* Background Imagery with Smooth Fade */}
      <div className="hero-backdrop-viewport">
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-backdrop-item ${index === activeSlideIndex ? 'active' : ''}`}
          >
            <div
              className="hero-backdrop-img"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          </div>
        ))}
        {/* Soft Left Ambient Gradient Scrim (Leaves right image bright and radiant) */}
        <div className="hero-directional-overlay" />
      </div>

      <div className="container hero-standard-container">
        <div className="hero-standard-grid">
          {/* Left Column: Sacred Identity, Commanding Title & CTAs */}
          <div className="hero-identity-column" key={current.id}>
            {/* Eyebrow Pill */}
            <div className="hero-gold-eyebrow">
              <Sparkles size={14} className="eyebrow-sparkle" />
              <span>{lang === 'en' ? current.eyebrowEn : current.eyebrowMl}</span>
            </div>

            {/* Regal Heading */}
            <h1 className={`hero-headline-serif ${lang === 'ml' ? 'text-malayalam' : ''}`}>
              <span className="headline-part-plain">{lang === 'en' ? current.headingLine1En : current.headingLine1Ml}</span>{' '}
              <span className="headline-part-of">{lang === 'en' ? current.headingLine2En : current.headingLine2Ml}</span>{' '}
              <br />
              <span className="headline-part-gold">{lang === 'en' ? current.headingLine3En : current.headingLine3Ml}</span>
            </h1>

            {/* Devotional Tagline */}
            <p className={`hero-sub-tagline ${lang === 'ml' ? 'text-malayalam' : ''}`}>
              {lang === 'en' ? current.taglineEn : current.taglineMl}
            </p>

            {/* CTAs */}
            <div className="hero-action-buttons">
              <button className="btn-hero-solid-gold" onClick={current.primaryAction}>
                <span>{lang === 'en' ? current.primaryCtaEn : current.primaryCtaMl}</span>
                <ChevronRight size={17} className="btn-arrow-icon" />
              </button>

              <button className="btn-hero-outline-glass" onClick={current.secondaryAction}>
                <span>{lang === 'en' ? current.secondaryCtaEn : current.secondaryCtaMl}</span>
              </button>
            </div>

            {/* Subtle Minimal Slide Dots */}
            <div className="hero-slide-dots-row">
              {bannerSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  className={`hero-dot-pill ${index === activeSlideIndex ? 'active' : ''}`}
                  onClick={() => setActiveSlideIndex(index)}
                  aria-label={`Slide ${index + 1}`}
                  title={slide.id}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Standard Floating Darshan Timings Card */}
          <div className="hero-darshan-card-column">
            <div className="standard-darshan-floating-card">
              {/* Card Header */}
              <div className="card-status-header">
                <div className="status-indicator-wrap">
                  <span className={`status-live-beacon ${isTempleOpen ? 'open' : 'closed'}`} />
                  <div>
                    <strong className="status-live-title">
                      {isTempleOpen
                        ? (lang === 'en' ? 'DARSHAN OPEN' : 'നട തുറന്നിരിക്കുന്നു')
                        : (lang === 'en' ? 'DARSHAN CLOSED' : 'നട അടച്ചിരിക്കുന്നു')}
                    </strong>
                    <span className="status-live-sub">
                      {isTempleOpen
                        ? (lang === 'en' ? 'Sanctum currently active' : 'ദർശന സമയം ഇപ്പോൾ')
                        : (lang === 'en' ? 'Opens today 05:00 PM' : 'അടുത്ത ദർശനം വൈകിട്ട് 5:00 മണി')}
                    </span>
                  </div>
                </div>

                <div className="card-est-badge">
                  <span>{lang === 'en' ? '500+ Yrs' : '500+ വർഷം'}</span>
                </div>
              </div>

              {/* 3 Info Rows with Clean Rounded Icon Boxes */}
              <div className="card-info-rows">
                {/* Row 1: Morning Hours */}
                <div className="card-info-row">
                  <div className="row-icon-box">
                    <Sun size={18} className="row-icon-color" />
                  </div>
                  <div className="row-text-content">
                    <span className="row-label">
                      {lang === 'en' ? 'Morning Pooja Hours' : 'പ്രഭാത പൂജാ സമയം'}
                    </span>
                    <strong className="row-time">05:30 AM – 11:00 AM</strong>
                    <span className="row-sub">
                      {lang === 'en' ? 'Nirmalyam, Usha Pooja & Ucha Pooja' : 'നിർമ്മാല്യം, ഉഷഃപൂജ, ഉച്ചപൂജ'}
                    </span>
                  </div>
                </div>

                {/* Row 2: Evening Hours */}
                <div className="card-info-row">
                  <div className="row-icon-box">
                    <Flame size={18} className="row-icon-color" />
                  </div>
                  <div className="row-text-content">
                    <span className="row-label">
                      {lang === 'en' ? 'Evening Deeparadhana' : 'സന്ധ്യാ ദീപാരാധന'}
                    </span>
                    <strong className="row-time">05:00 PM – 08:00 PM</strong>
                    <span className="row-sub">
                      {lang === 'en' ? 'Deeparadhana & Athazha Pooja' : 'ദീപാരാധന & അത്താഴപൂജ'}
                    </span>
                  </div>
                </div>

                {/* Row 3: Location */}
                <div className="card-info-row">
                  <div className="row-icon-box">
                    <MapPin size={18} className="row-icon-color" />
                  </div>
                  <div className="row-text-content">
                    <span className="row-label">{lang === 'en' ? 'Location' : 'ക്ഷേത്ര സന്നിധി'}</span>
                    <strong className="row-location-name">
                      {lang === 'en' ? 'Thurayilkunnu, Karunagappally' : 'തുറയിൽക്കുന്ന്, കരുനാഗപ്പള്ളി'}
                    </strong>
                    <span className="row-sub">
                      {lang === 'en' ? 'Kollam District, Kerala' : 'കൊല്ലം ജില്ല, കേരളം'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="card-footer-actions">
                <button
                  className="card-route-link"
                  onClick={() => onNavigate && onNavigate('contact')}
                >
                  <span>{lang === 'en' ? 'View Directions & Location Map →' : 'വഴികാട്ടി ഭൂപടം കാണുക →'}</span>
                </button>

                <button
                  className={`card-bell-btn ${bellRung ? 'rung' : ''}`}
                  onClick={handleRingBell}
                  title={lang === 'en' ? 'Ring Sacred Temple Bell' : 'ക്ഷേത്രമണി മുഴക്കുക'}
                >
                  <Bell size={15} className={bellRung ? 'animate-wiggle' : ''} />
                  <span>
                    {bellRung
                      ? (lang === 'en' ? 'Chimed' : 'മുഴങ്ങി')
                      : (lang === 'en' ? 'Ring Bell' : 'മണി')}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
