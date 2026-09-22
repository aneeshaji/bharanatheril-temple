import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Calendar,
  HeartHandshake,
  Bell,
  MapPin,
  Shield,
  Award,
  ChevronRight,
  Flame,
  Clock,
  ArrowRight,
  Quote
} from 'lucide-react';
import { sacredSloka, darshanSchedule, festivals } from '../data/templeData';
import { playTempleBell } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

export function Hero({ onOpenVazhipadu, onOpenDonation, onNavigate }) {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('darshan'); // 'darshan' | 'sloka' | 'festival'
  const [bellRung, setBellRung] = useState(false);
  const [isTempleOpen, setIsTempleOpen] = useState(true);
  const [currentTimeStr, setCurrentTimeStr] = useState('');
  const [countdown, setCountdown] = useState({ days: 12, hours: 8, minutes: 45 });

  // Update IST time and open/close status
  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const istDate = new Date(utc + (3600000 * 5.5));
      const hours = istDate.getHours();
      const minutes = istDate.getMinutes();
      const totalMinutes = hours * 60 + minutes;

      const morningOpen = totalMinutes >= 330 && totalMinutes <= 660; // 5:30 AM to 11:00 AM
      const eveningOpen = totalMinutes >= 1020 && totalMinutes <= 1200; // 5:00 PM to 8:00 PM
      setIsTempleOpen(morningOpen || eveningOpen);

      const ampm = hours >= 12 ? 'PM' : 'AM';
      const h12 = hours % 12 || 12;
      const mm = minutes < 10 ? '0' + minutes : minutes;
      setCurrentTimeStr(`${h12}:${mm} ${ampm} IST`);
    };

    checkStatus();
    const timer = setInterval(checkStatus, 15000);
    return () => clearInterval(timer);
  }, []);

  // Festival countdown
  useEffect(() => {
    const target = new Date(festivals[0]?.dateTarget || '2026-03-22T00:00:00').getTime();
    const updateCountdown = () => {
      const diff = target - Date.now();
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff % 86400000) / 3600000),
          minutes: Math.floor((diff % 3600000) / 60000),
        });
      } else {
        setCountdown({ days: 14, hours: 6, minutes: 20 });
      }
    };
    updateCountdown();
    const intv = setInterval(updateCountdown, 60000);
    return () => clearInterval(intv);
  }, []);

  const handleRingBell = () => {
    playTempleBell(1.1);
    setBellRung(true);
    setTimeout(() => setBellRung(false), 2400);
  };

  return (
    <section className="hero-sanctum-section">
      {/* Background with Sanctum Imagery, Deep Vignettes & Golden Dust */}
      <div className="hero-sanctum-bg">
        <img
          src="/images/hero-sanctum.jpg"
          alt="Bharanatheril Sree Bhadra Bhagavathy Temple Sanctum"
          className="hero-sanctum-bg-img"
        />
        <div className="hero-sanctum-overlay"></div>
        <div className="hero-sanctum-radial-spotlight"></div>
        <div className="hero-kasavu-strip"></div>
      </div>

      <div className="container hero-sanctum-container">
        <div className="hero-sanctum-grid">
          {/* Left Column: Majestic Identity, Sacred Title & Primary CTAs */}
          <div className="hero-left-column">
            {/* Top Sacred Eyebrow Pill */}
            <div className="hero-sacred-eyebrow">
              <Flame size={14} className="text-gold animate-flame" />
              <span>
                {lang === 'en'
                  ? 'Ancient Shakta Peedam • Thurayilkunnu, Karunagappally'
                  : 'പുരാതന ശാക്തേയ പീഠം • തുറയിൽക്കുന്ന്, കരുനാഗപ്പള്ളി'}
              </span>
            </div>

            {/* Regal Heading with Gold Highlight */}
            {lang === 'en' ? (
              <h1 className="hero-sanctum-heading">
                Abode of Supreme <br />
                <span className="hero-gold-glow">Mother Bhadrakali</span>
              </h1>
            ) : (
              <h1 className="hero-sanctum-heading text-malayalam">
                ശ്രീ ഭദ്രകാളിയുടെ <br />
                <span className="hero-gold-glow">പുണ്യ ശാക്തേയ പീഠം</span>
              </h1>
            )}

            {/* Noble Temple Title Tag */}
            <div className="hero-temple-name-badge">
              <span className="badge-bullet">✦</span>
              <span>
                {lang === 'en'
                  ? 'Bharanatheril Sree Bhadra Bhagavathy Temple'
                  : 'ഭരണത്തേരിൽ ശ്രീ ഭദ്ര ഭഗവതി ക്ഷേത്രം'}
              </span>
            </div>

            {/* Sacred Narrative Description */}
            <p className={`hero-sanctum-desc ${lang === 'ml' ? 'text-malayalam' : ''}`}>
              {lang === 'en'
                ? 'Immerse in centuries of divine maternal grace, fierce protection, and authentic Kerala temple traditions. Devotees from across the world seek Mother Bhadrakali’s boundless blessings for health, prosperity, and spiritual solace.'
                : 'മാതൃവാത്സല്യവും ദിവ്യാനുഗ്രഹവും സർവ്വാഭീഷ്ട വരദാനവും നിറയുന്ന തുറയിൽക്കുന്നിലെ പുണ്യ ശാക്തേയ സന്നിധി. അമ്മയുടെ കാരുണ്യത്താൽ സർവ്വഭയങ്ങളും അകന്ന് ഐശ്വര്യവും കുടുംബ സമാധാനവും കൈവരുന്നു.'}
            </p>

            {/* Action Buttons */}
            <div className="hero-sanctum-actions">
              <button className="btn-gold-sanctum" onClick={onOpenVazhipadu}>
                <Sparkles size={17} />
                <span>{t('bookVazhipaduFull')}</span>
                <ChevronRight size={16} className="btn-arrow" />
              </button>

              <button
                className="btn-glass-sanctum"
                onClick={() => onNavigate && onNavigate('about')}
              >
                <span>{t('readHistory')}</span>
              </button>

              <button className="btn-wine-sanctum" onClick={onOpenDonation}>
                <HeartHandshake size={17} />
                <span>{t('annadanam')}</span>
              </button>
            </div>

            {/* 4 Trust Highlights Strip */}
            <div className="hero-sanctum-metrics">
              <div className="sanctum-metric-item">
                <strong className="metric-val">500+</strong>
                <span className="metric-lbl">{lang === 'en' ? 'Yrs Sanctity' : 'വർഷത്തെ പാരമ്പര്യം'}</span>
              </div>
              <div className="metric-divider"></div>
              <div className="sanctum-metric-item">
                <strong className="metric-val">5</strong>
                <span className="metric-lbl">{lang === 'en' ? 'Sacred Shrines' : 'പുണ്യ സന്നിധികൾ'}</span>
              </div>
              <div className="metric-divider"></div>
              <div className="sanctum-metric-item">
                <strong className="metric-val">365</strong>
                <span className="metric-lbl">{lang === 'en' ? 'Days Annadanam' : 'നിത്യ അന്നദാനം'}</span>
              </div>
              <div className="metric-divider"></div>
              <div className="sanctum-metric-item">
                <strong className="metric-val">80G</strong>
                <span className="metric-lbl">{lang === 'en' ? 'Tax Exempt' : 'നികുതി ഇളവ്'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: The "Sannidhi" Interactive Glass Portal Card */}
          <div className="hero-right-column">
            <div className="sannidhi-portal-card">
              {/* Card Header with Status & Time */}
              <div className="sannidhi-card-top">
                <div className="sannidhi-status-pill">
                  <span className={`live-pulse-dot ${isTempleOpen ? 'active' : 'inactive'}`}></span>
                  <span className="status-text">
                    {isTempleOpen
                      ? (lang === 'en' ? 'Sanctum Open' : 'നട തുറന്നിരിക്കുന്നു')
                      : (lang === 'en' ? 'Sanctum Closed' : 'നട അടച്ചിരിക്കുന്നു')}
                  </span>
                </div>
                <div className="sannidhi-clock-badge">
                  <Clock size={13} className="text-gold" />
                  <span>{currentTimeStr || '5:30 AM – 8:00 PM'}</span>
                </div>
              </div>

              {/* 3-Tab Interactive Switcher */}
              <div className="sannidhi-nav-tabs">
                <button
                  className={`sannidhi-tab-btn ${activeTab === 'darshan' ? 'active' : ''}`}
                  onClick={() => setActiveTab('darshan')}
                >
                  <Clock size={14} />
                  <span>{lang === 'en' ? 'Darshan Timings' : 'ദർശന സമയം'}</span>
                </button>
                <button
                  className={`sannidhi-tab-btn ${activeTab === 'sloka' ? 'active' : ''}`}
                  onClick={() => setActiveTab('sloka')}
                >
                  <Bell size={14} />
                  <span>{lang === 'en' ? 'Sacred Sloka' : 'ധ്യാന ശ്ലോകം'}</span>
                </button>
                <button
                  className={`sannidhi-tab-btn ${activeTab === 'festival' ? 'active' : ''}`}
                  onClick={() => setActiveTab('festival')}
                >
                  <Flame size={14} />
                  <span>{lang === 'en' ? 'Bharani Fest' : 'ഭരണി മഹോത്സവം'}</span>
                </button>
              </div>

              {/* Dynamic Tab 1: Live Darshan Timings */}
              {activeTab === 'darshan' && (
                <div className="sannidhi-tab-panel animate-fade-in">
                  <div className="darshan-slot-box">
                    <div className="slot-icon-wrap">
                      <Flame size={18} className="text-gold" />
                    </div>
                    <div className="slot-details">
                      <span className="slot-title">{lang === 'en' ? 'Morning Darshan' : 'പ്രഭാത ദർശനം'}</span>
                      <strong className="slot-time">5:30 AM – 11:00 AM</strong>
                      <p className="slot-sub">{lang === 'en' ? 'Nirmalyam, Usha Pooja & Ucha Pooja' : 'നിർമ്മാല്യ ദർശനം, ഉഷഃപൂജ & ഉച്ചപൂജ'}</p>
                    </div>
                  </div>

                  <div className="darshan-slot-box">
                    <div className="slot-icon-wrap">
                      <Sparkles size={18} className="text-gold" />
                    </div>
                    <div className="slot-details">
                      <span className="slot-title">{lang === 'en' ? 'Evening Deeparadhana' : 'സന്ധ്യാ ദീപാരാധന'}</span>
                      <strong className="slot-time">5:00 PM – 8:00 PM</strong>
                      <p className="slot-sub">{lang === 'en' ? 'Deeparadhana, Bhagavathy Seva & Athazha Pooja' : 'ദീപാരാധന, ഭഗവതി സേവ & അത്താഴപൂജ'}</p>
                    </div>
                  </div>

                  <div className="sannidhi-panel-footer">
                    <button
                      className="sannidhi-footer-link"
                      onClick={() => onNavigate && onNavigate('darshan')}
                    >
                      <span>{lang === 'en' ? 'View Full Pooja Schedule' : 'പൂർണ്ണ പൂജാ സമയക്രമം'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Dynamic Tab 2: Sacred Sloka with Audio Bell Chime */}
              {activeTab === 'sloka' && (
                <div className="sannidhi-tab-panel animate-fade-in">
                  <div className="sloka-sacred-quote">
                    <Quote size={20} className="text-gold" />
                    {lang === 'ml' ? (
                      <p className="sloka-sanskrit-text text-malayalam">{sacredSloka.sanskrit}</p>
                    ) : (
                      <p className="sloka-sanskrit-text">{sacredSloka.english}</p>
                    )}
                    <p className={`sloka-meaning-text ${lang === 'ml' ? 'text-malayalam' : ''}`}>
                      "{lang === 'ml' ? (sacredSloka.meaningMl || t('slokaMeaning')) : sacredSloka.meaning}"
                    </p>
                  </div>

                  <div className="sloka-chime-action">
                    <button
                      className={`btn-sannidhi-bell ${bellRung ? 'rung' : ''}`}
                      onClick={handleRingBell}
                      title={lang === 'en' ? 'Ring Sacred Temple Bell' : 'ക്ഷേത്രമണി മുഴക്കുക'}
                      aria-label="Ring Temple Bell"
                    >
                      <Bell size={16} className={bellRung ? 'animate-wiggle' : ''} />
                      <span>
                        {bellRung
                          ? (lang === 'en' ? 'Divine Bell Chimed • Blessed' : 'മണിനാദം മുഴങ്ങി • അനുഗ്രഹീതം')
                          : (lang === 'en' ? 'Ring Sacred Temple Bell' : 'ക്ഷേത്രമണി മുഴക്കുക')}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* Dynamic Tab 3: Grand Bharani Festival Countdown */}
              {activeTab === 'festival' && (
                <div className="sannidhi-tab-panel animate-fade-in">
                  <div className="fest-spotlight-inner">
                    <span className="fest-tag">
                      <Flame size={13} className="text-gold" />
                      <span>{lang === 'en' ? 'Annual Kumbham/Meenam Festival' : 'കുംഭം/മീനം വാർഷികോത്സവം'}</span>
                    </span>
                    <h4 className={`fest-heading ${lang === 'ml' ? 'text-malayalam' : ''}`}>
                      {lang === 'en' ? 'Grand Bharani Mahotsavam' : 'ഭരണി മഹോത്സവം & പൊങ്കാല'}
                    </h4>
                    
                    <div className="fest-countdown-row">
                      <div className="cd-block">
                        <strong className="cd-val">{countdown.days}</strong>
                        <span className="cd-unit">{lang === 'en' ? 'Days' : 'ദിവസം'}</span>
                      </div>
                      <span className="cd-sep">:</span>
                      <div className="cd-block">
                        <strong className="cd-val">{String(countdown.hours).padStart(2, '0')}</strong>
                        <span className="cd-unit">{lang === 'en' ? 'Hours' : 'മണി'}</span>
                      </div>
                      <span className="cd-sep">:</span>
                      <div className="cd-block">
                        <strong className="cd-val">{String(countdown.minutes).padStart(2, '0')}</strong>
                        <span className="cd-unit">{lang === 'en' ? 'Mins' : 'മിനിറ്റ്'}</span>
                      </div>
                    </div>

                    <div className="sannidhi-panel-footer">
                      <button
                        className="sannidhi-footer-link"
                        onClick={() => onNavigate && onNavigate('festivals')}
                      >
                        <span>{lang === 'en' ? 'Explore Festival Events' : 'ഉത്സവ പരിപാടികൾ'}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Card Bottom Location & Direct Route */}
              <div className="sannidhi-card-bottom">
                <div className="location-snippet">
                  <MapPin size={14} className="text-gold" />
                  <span>
                    {lang === 'en'
                      ? 'Thurayilkunnu, Karunagappally, Kollam'
                      : 'തുറയിൽക്കുന്ന്, കരുനാഗപ്പള്ളി, കൊല്ലം'}
                  </span>
                </div>
                <button
                  className="btn-sannidhi-directions"
                  onClick={() => onNavigate && onNavigate('contact')}
                >
                  <span>{lang === 'en' ? 'Route Directions →' : 'വഴികാട്ടി →'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
