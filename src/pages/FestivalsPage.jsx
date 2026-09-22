import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/PageHeader';
import { festivals, templeInfo } from '../data/templeData';
import { 
  Flame, 
  Sparkles, 
  Calendar, 
  Clock, 
  HeartHandshake, 
  MapPin, 
  Users, 
  Award,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function FestivalsPage({ onNavigate, onOpenDonation }) {
  const { lang, t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(festivals[0].dateTarget).getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 12, hours: 8, minutes: 45, seconds: 30 });
      }
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inner-page-view festivals-page">
      <PageHeader 
        titleEn="Sacred Festivals & Celebrations"
        titleMl="ക്ഷേത്രോത്സവങ്ങൾ & വിശേഷങ്ങൾ"
        subtitle={lang === 'en' 
          ? "Annual Bharani Mahotsavam, Maha Pongala, Navaratri Vidyarambham, and Karkidaka Masacharanam"
          : "വാർഷിക ഭരണി മഹോത്സവം, മഹാ പൊങ്കാല, നവരാത്രി വിദ്യാരംഭം, കർക്കടക മാസചരണം"}
        breadcrumb={lang === 'en' ? "Festivals" : "ഉത്സവങ്ങൾ"}
        onNavigate={onNavigate}
      />

      <div className="container inner-page-container">
        {/* Grand Bharani Mahotsavam Countdown Banner */}
        <div className="festival-main-countdown kasavu-border-card">
          <div className="countdown-flex-layout">
            <div className="countdown-info-side">
              <span className="section-eyebrow">
                <Flame size={14} /> {t('grandAnnualFestivalTitle')}
              </span>
              <h2 className={lang === 'ml' ? "fest-title-ml text-malayalam" : "fest-title-en"} style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>
                {t('annualBharaniTitle')}
              </h2>
              <p className="fest-summary">
                {t('festivalHomeSummary')}
              </p>

              {/* Countdown Numbers */}
              <div className="cd-timer-row">
                <div className="cd-box-lg">
                  <span className="cd-number">{timeLeft.days}</span>
                  <span className="cd-label">{t('daysUnit')}</span>
                </div>
                <div className="cd-colon">:</div>
                <div className="cd-box-lg">
                  <span className="cd-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="cd-label">{t('hoursUnit')}</span>
                </div>
                <div className="cd-colon">:</div>
                <div className="cd-box-lg">
                  <span className="cd-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="cd-label">{t('minutesUnit')}</span>
                </div>
                <div className="cd-colon">:</div>
                <div className="cd-box-lg">
                  <span className="cd-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="cd-label">{t('secondsUnit')}</span>
                </div>
              </div>

              <div className="fest-cta-row">
                <button className="btn-gold" onClick={onOpenDonation}>
                  <HeartHandshake size={16} />
                  <span>{t('donateFestival')}</span>
                </button>
                <button className="btn-outline-gold" onClick={() => onNavigate('vazhipadu')}>
                  <Sparkles size={16} />
                  <span>{t('bookFestivalOffering')}</span>
                </button>
              </div>
            </div>

            <div className="countdown-media-side">
              <img 
                src="/images/festival-pongala.jpg" 
                alt="Bharani Mahotsavam" 
                className="fest-hero-img"
              />
            </div>
          </div>
        </div>

        {/* Detailed Festivals Catalog */}
        <div className="festivals-detailed-grid">
          {festivals.map((fest) => (
            <div key={fest.id} className="festival-detail-card kasavu-border-card">
              <div className="fest-card-header">
                <div className="fest-badge-month">
                  <Calendar size={14} />
                  <span>{lang === 'ml' ? (fest.monthMl || fest.month) : (fest.monthEn || fest.month)}</span>
                </div>
                <h3 className={lang === 'ml' ? "fest-item-title-ml text-malayalam" : "fest-item-title-en"} style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>
                  {lang === 'en' ? fest.titleEn : fest.titleMl}
                </h3>
              </div>

              <div className="fest-card-body">
                <div className="fest-highlight-pill">
                  <Sparkles size={14} className="text-gold" />
                  <strong>{t('festivalsHighlights')}:</strong> {lang === 'ml' ? (fest.highlightMl || fest.highlight) : (fest.highlightEn || fest.highlight)}
                </div>
                <p className="fest-card-desc">{lang === 'ml' ? (fest.descMl || fest.description) : (fest.descEn || fest.description)}</p>
              </div>

              <div className="fest-card-footer">
                <button 
                  className="btn-gold-sm"
                  onClick={() => onNavigate('vazhipadu')}
                >
                  <span>{t('bookPoojas')}</span>
                  <ArrowRight size={14} />
                </button>
                <button 
                  className="btn-secondary-sm"
                  onClick={onOpenDonation}
                >
                  <span>{t('festivalDonate')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Festival Sponsorship / Seva Opportunities */}
        <div className="festival-sponsorship-box kasavu-border-card">
          <div className="sponsorship-inner">
            <div className="sponsorship-icon">
              <Award size={32} className="text-gold" />
            </div>
            <div className="sponsorship-text">
              <h3 className={lang === 'ml' ? 'text-malayalam' : ''}>{t('festivalSponsorship')}</h3>
              <p>
                {t('festivalSponsorshipDesc')}
              </p>
            </div>
            <button className="btn-primary" onClick={onOpenDonation}>
              <HeartHandshake size={18} />
              <span>{t('sponsorDay')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
