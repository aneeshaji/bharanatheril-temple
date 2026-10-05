import React from 'react';
import { templeInfo } from '../data/templeData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUp,
  Sparkles,
  Building,
  ShieldCheck,
  ChevronRight,
  HeartHandshake
} from 'lucide-react';
import { playTempleBell } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

export function Footer({ onNavigate, onOpenDonation }) {
  const { lang, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playTempleBell(1.4);
  };

  const navLinks = [
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

  return (
    <footer className="temple-footer">
      {/* Top Ornamental Kasavu Bar */}
      <div className="footer-gold-kasavu-bar" />

      <div className="container footer-content-container">
        <div className="footer-grid">
          {/* Col 1: Temple Branding & Heritage */}
          <div className="footer-col brand-col">
            <div
              className="footer-brand"
              onClick={() => onNavigate('home')}
              role="button"
              tabIndex={0}
              title="Bharanatheril Sree Bhadra Bhagavathy Temple"
            >
              <div className="footer-lamp-halo">
                <img
                  src="/lamp-icon.svg"
                  alt="Temple Lamp"
                  width="38"
                  height="38"
                  className="footer-lamp"
                />
              </div>
              <div className="footer-brand-headings">
                <h4 className={`footer-brand-title-primary ${lang === 'ml' ? 'text-malayalam' : ''}`}>
                  {lang === 'en' ? 'Bharanatheril' : 'ഭരണത്തേരിൽ'}
                </h4>
                <h5 className={`footer-brand-title-secondary ${lang === 'ml' ? 'text-malayalam' : ''}`}>
                  {lang === 'en' ? 'Sree Bhadra Bhagavathy Temple' : 'ശ്രീ ഭദ്ര ഭഗവതി ക്ഷേത്രം'}
                </h5>
              </div>
            </div>

            <p className={`footer-tagline ${lang === 'ml' ? 'text-malayalam' : ''}`}>
              {lang === 'en'
                ? 'Ancient Shakta Peedam • Abode of Supreme Motherly Grace, Fierce Protection & Spiritual Solace.'
                : 'പുരാതന ശാക്തേയ പീഠം • മാതൃവാത്സല്യവും ദിവ്യാനുഗ്രഹവും സർവ്വാഭീഷ്ട വരദാനവും നിറയുന്ന പുണ്യസന്നിധി.'}
            </p>

            <div className="footer-location-item">
              <MapPin size={15} className="text-gold flex-shrink-0" />
              <span>{lang === 'en' ? templeInfo.location : 'തുറയിൽക്കുന്ന്, കരുനാഗപ്പള്ളി, കൊല്ലം, കേരളം'}</span>
            </div>

            <div className="footer-trust-badge">
              <ShieldCheck size={15} className="text-gold" />
              <span>
                {lang === 'en'
                  ? 'Registered Religious Trust • Section 80G Tax Exempt'
                  : 'രജിസ്ട്രേഡ് ക്ഷേത്ര ട്രസ്റ്റ് • 80G നികുതി ഇളവ്'}
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h5 className="footer-col-title">{t('quickLinks')}</h5>
            <ul className="footer-link-list">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    className="footer-text-btn"
                    onClick={() => {
                      if (link.id === 'kanikka') {
                        onOpenDonation();
                      } else {
                        onNavigate(link.id);
                      }
                    }}
                  >
                    <ChevronRight size={13} className="link-arrow" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Darshan & Offerings */}
          <div className="footer-col">
            <h5 className="footer-col-title">{t('darshanFooter')}</h5>
            <div className="footer-timings-card">
              <div className="timing-line">
                <Clock size={14} className="text-gold" />
                <div>
                  <span className="timing-label">
                    {lang === 'en' ? 'Morning Darshan' : 'പ്രഭാത ദർശനം'}
                  </span>
                  <strong className="timing-hours">5:30 AM – 11:00 AM</strong>
                </div>
              </div>
              <div className="timing-sep" />
              <div className="timing-line">
                <Clock size={14} className="text-gold" />
                <div>
                  <span className="timing-label">
                    {lang === 'en' ? 'Evening Deeparadhana' : 'സന്ധ്യാ ദീപാരാധന'}
                  </span>
                  <strong className="timing-hours">5:00 PM – 8:00 PM</strong>
                </div>
              </div>
            </div>

            <div className="footer-cta-buttons">
              <button className="footer-btn-primary" onClick={onOpenDonation}>
                <HeartHandshake size={15} />
                <span>{t('eKanikka')}</span>
              </button>
              <button
                className="footer-btn-secondary"
                onClick={() => onNavigate('vazhipadu')}
              >
                <Sparkles size={15} />
                <span>{lang === 'en' ? 'Book Vazhipadu' : 'വഴിപാട് ബുക്കിംഗ്'}</span>
              </button>
            </div>
          </div>

          {/* Col 4: Official Helpline & Bank Details */}
          <div className="footer-col">
            <h5 className="footer-col-title">{t('contactFooter')}</h5>
            <div className="footer-contact-list">
              <a href={`tel:${templeInfo.phone}`} className="footer-contact-item link">
                <Phone size={15} className="text-gold" />
                <span>{templeInfo.phone}</span>
              </a>
              <a href={`mailto:${templeInfo.email}`} className="footer-contact-item link">
                <Mail size={15} className="text-gold" />
                <span>{templeInfo.email}</span>
              </a>
              <div className="footer-contact-item">
                <Building size={15} className="text-gold" />
                <div>
                  <span className="contact-sub-lbl">SBI Account</span>
                  <strong>{templeInfo.accountDetails.accountNumber}</strong>
                </div>
              </div>
              <div className="footer-contact-item">
                <Sparkles size={15} className="text-gold" />
                <div>
                  <span className="contact-sub-lbl">UPI ID</span>
                  <strong>{templeInfo.upiId}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-info">
            <p className="footer-copyright-text">
              {t('copyright')}
            </p>
            <p className="footer-devotee-blessing">
              {lang === 'en'
                ? 'Om Sree Bhadrakalyai Namah • May Peace & Auspiciousness Prevail Everywhere'
                : 'ഓം ശ്രീ ഭദ്രകാള്യൈ നമഃ • സർവ്വത്ര ശാന്തിർഭവതു'}
            </p>
          </div>

          {/* Sponsored & Powered by Section */}
          <div className="footer-sponsored-credit">
            <span className="sponsored-text">Sponsored & Powered by: </span>
            <a
              href="https://technobyteinnovations.com"
              target="_blank"
              rel="noopener noreferrer"
              className="powered-by-brand"
              title="Technobyte Innovations"
            >
              TechnobyteInnovations
            </a>
          </div>

          {/* Scroll to Top */}
          <button
            className="scroll-top-btn"
            onClick={scrollToTop}
            title={lang === 'en' ? 'Scroll to top' : 'മുകളിലേക്ക് പോവുക'}
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
