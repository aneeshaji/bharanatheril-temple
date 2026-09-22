import React from 'react';
import { templeInfo } from '../data/templeData';
import { Heart, MapPin, Phone, Mail, Clock, ArrowUp, Sparkles, Building, ShieldCheck } from 'lucide-react';
import { playTempleBell } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

export function Footer({ onNavigate, onOpenDonation }) {
  const { lang, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playTempleBell(1.4);
  };

  return (
    <footer className="temple-footer">
      <div className="footer-gold-kasavu-bar"></div>

      <div className="container footer-content-container">
        <div className="footer-grid">
          {/* Col 1: Temple Branding */}
          <div className="footer-col brand-col">
            <div className="footer-brand" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
              <img src="/lamp-icon.svg" alt="Temple Lamp" width="36" height="36" className="footer-lamp" />
              <div>
                <h4 className={`footer-brand-title-primary ${lang === 'ml' ? 'text-malayalam' : ''}`}>
                  {lang === 'en' ? 'Bharanatheril' : 'ഭരണത്തേരിൽ'}
                </h4>
                <h5 className={`footer-brand-title-secondary ${lang === 'ml' ? 'text-malayalam' : ''}`}>
                  {lang === 'en' ? 'Sree Bhadra Bhagavathy Temple' : 'ശ്രീ ഭദ്ര ഭഗവതി ക്ഷേത്രം'}
                </h5>
              </div>
            </div>
            <p className={`footer-tagline ${lang === 'ml' ? 'text-malayalam' : ''}`}>
              {lang === 'en' ? templeInfo.taglineEn : templeInfo.taglineMl}
            </p>
            <p className="footer-location-text">
              <MapPin size={15} className="inline-icon text-gold" /> {templeInfo.location}
            </p>
            <div className="footer-trust-badge">
              <ShieldCheck size={14} className="text-gold" />
              <span>{lang === 'en' ? 'Registered Religious Trust • Section 80G' : 'രജിസ്ട്രേഡ് ക്ഷേത്ര ട്രസ്റ്റ് • 80G'}</span>
            </div>
          </div>

          {/* Col 2: Inner Page Navigation */}
          <div className="footer-col">
            <h5 className="footer-col-title">{t('quickLinks')}</h5>
            <ul className="footer-link-list">
              {[
                { id: 'home', label: t('home') },
                { id: 'about', label: t('about') },
                { id: 'deities', label: t('deities') },
                { id: 'darshan', label: t('darshan') },
                { id: 'vazhipadu', label: t('vazhipadu') },
                { id: 'festivals', label: t('festivals') },
                { id: 'gallery', label: t('gallery') },
                { id: 'kanikka', label: t('kanikka') },
                { id: 'contact', label: t('contact') },
              ].map(link => (
                <li key={link.id}>
                  <button className="footer-text-btn" onClick={() => onNavigate(link.id)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Darshan Timings */}
          <div className="footer-col">
            <h5 className="footer-col-title">{t('darshanFooter')}</h5>
            <div className="footer-timings-box">
              <div className="timing-line">
                <Clock size={14} className="text-gold" />
                <span>{lang === 'en' ? 'Morning: 5:30 AM – 11:00 AM' : 'പ്രഭാതം: 5:30 AM – 11:00 AM'}</span>
              </div>
              <div className="timing-line">
                <Clock size={14} className="text-gold" />
                <span>{lang === 'en' ? 'Evening: 5:00 PM – 8:00 PM' : 'സന്ധ്യ: 5:00 PM – 8:00 PM'}</span>
              </div>
            </div>
            <div className="footer-kanikka-cta">
              <button className="btn-primary-sm" onClick={onOpenDonation}>
                <span>{t('eKanikka')}</span>
              </button>
            </div>
          </div>

          {/* Col 4: Contact */}
          <div className="footer-col">
            <h5 className="footer-col-title">{t('contactFooter')}</h5>
            <div className="footer-contact-item">
              <Phone size={15} className="text-gold" />
              <span>{templeInfo.phone}</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={15} className="text-gold" />
              <span>{templeInfo.email}</span>
            </div>
            <div className="footer-contact-item">
              <Building size={15} className="text-gold" />
              <span>SBI: {templeInfo.accountDetails.accountNumber}</span>
            </div>
            <div className="footer-contact-item">
              <Sparkles size={15} className="text-gold" />
              <span>UPI: {templeInfo.upiId}</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            <p>{t('copyright')}</p>
            <p className="footer-devotee-blessing">
              {lang === 'en' ? 'Om Sree Bhadrakalyai Namah • May Peace Prevail Everywhere' : 'ഓം ശ്രീ ഭദ്രകാള്യൈ നമഃ • സർവ്വത്ര ശാന്തിർഭവതു'}
            </p>
          </div>
          <button className="scroll-top-btn" onClick={scrollToTop} title="Scroll to top" aria-label="Scroll to top">
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
