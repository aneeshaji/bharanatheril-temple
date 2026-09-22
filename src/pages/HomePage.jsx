import React, { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import {
  templeInfo,
  darshanSchedule,
  deities,
  vazhipaduList,
  festivals,
  nakshathras
} from '../data/templeData';
import {
  Clock,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  Calendar,
  MapPin,
  Shield,
  Flame,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Image as ImageIcon,
  Compass,
  Star,
  Quote,
  Check
} from 'lucide-react';
import { playTempleBell } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

export function HomePage({ onNavigate, onOpenDonation, onSelectDeityForPooja }) {
  const { lang, t } = useLanguage();

  // Live Festival Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 8, minutes: 45, seconds: 30 });

  // Architectural Heritage Active Tab
  const [activeHeritageTab, setActiveHeritageTab] = useState('srikovil');

  // Vazhipadu Filter State
  const [activeOfferingCategory, setActiveOfferingCategory] = useState('All');

  // Virtual Diya Offering State
  const [selectedNakshatram, setSelectedNakshatram] = useState('Bharani');
  const [diyaDevoteeName, setDiyaDevoteeName] = useState('');
  const [virtualDiyaSubmitted, setVirtualDiyaSubmitted] = useState(false);
  const [virtualDiyasCount, setVirtualDiyasCount] = useState(1842);

  // Active Darshan Phase tracker
  const [darshanPhase, setDarshanPhase] = useState('morning');

  useEffect(() => {
    const targetDate = new Date(festivals[0]?.dateTarget || '2026-03-22T00:00:00').getTime();
    const updateCountdown = () => {
      const diff = targetDate - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff % 86400000) / 3600000),
          minutes: Math.floor((diff % 3600000) / 60000),
          seconds: Math.floor((diff % 60000) / 1000),
        });
      } else {
        setTimeLeft({ days: 14, hours: 6, minutes: 20, seconds: 15 });
      }
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update Darshan status based on current IST time
  useEffect(() => {
    const checkPhase = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const istDate = new Date(utc + (3600000 * 5.5));
      const hours = istDate.getHours();
      const minutes = istDate.getMinutes();
      const totalMinutes = hours * 60 + minutes;

      // 5:30 AM to 11:00 AM (330 to 660 mins)
      // 5:00 PM to 8:00 PM (1020 to 1200 mins)
      if (totalMinutes >= 330 && totalMinutes <= 660) {
        setDarshanPhase('morning');
      } else if (totalMinutes >= 1020 && totalMinutes <= 1200) {
        setDarshanPhase('evening');
      } else {
        setDarshanPhase('closed');
      }
    };
    checkPhase();
    const intv = setInterval(checkPhase, 30000);
    return () => clearInterval(intv);
  }, []);

  // Filter offerings
  const filteredOfferings = activeOfferingCategory === 'All'
    ? vazhipaduList.filter(v => v.popular).slice(0, 8)
    : vazhipaduList.filter(v => v.deity.toLowerCase().includes(activeOfferingCategory.toLowerCase())).slice(0, 8);

  // Architectural tabs data
  const heritageTabs = [
    {
      id: 'srikovil',
      labelEn: 'Srikovil Sanctum',
      labelMl: 'ശ്രീകോവിൽ സന്നിധി',
      titleEn: 'Sacred Traditional Laterite Srikovil',
      titleMl: 'പവിത്രമായ തച്ചുശാസ്ത്ര ശ്രീകോവിൽ',
      descEn: 'Erected according to sacred Kerala Vastu Vidya (Thachu-shastra), the square sanctum is crafted from seasoned laterite stone and teak wood, crowned with copper tiles. It retains immense spiritual energy where Sree Bhadrakali presides in full divine benevolence.',
      descMl: 'പരമ്പരാഗത തച്ചുശാസ്ത്ര വിധിപ്രകാരം നിർമ്മിച്ച ചതുര ശ്രീകോവിലും ചുറ്റമ്പലവും. ചെമ്പ് മേഞ്ഞ മേൽക്കൂരയും കൊത്തുപണികളും നിറഞ്ഞ ഈ സന്നിധിയിൽ ശ്രീ ഭദ്രകാളി സർവ്വാഭരണവിഭൂഷിതയായി കുടികൊള്ളുന്നു.',
      image: '/images/temple-exterior.jpg',
      statLabelEn: 'Vastu Vidya Structure',
      statLabelMl: 'തച്ചുശാസ്ത്ര നിർമ്മിതി',
      statVal: '100% Traditional'
    },
    {
      id: 'sarpakavu',
      labelEn: 'Ancient Sarpa Kavu',
      labelMl: 'പുരാതന സർപ്പക്കാവ്',
      titleEn: 'Sacred Grove of Nagaraja & Nagayakshi',
      titleMl: 'ഔഷധ സമൃദ്ധമായ പവിത്ര സർപ്പക്കാവ്',
      descEn: 'A lush, untouched ecological haven preserving indigenous medicinal trees, creepers, and pristine flora. Daily rituals of Noorum Palum and Manjal Podi are performed at the consecrated granite serpent idols to dispel Sarpa Doshas and usher in prosperity.',
      descMl: 'വിശുദ്ധമായ വൃക്ഷലതാദികളും ഔഷധ സസ്യങ്ങളും സംരക്ഷിക്കപ്പെടുന്ന പുരാതന സർപ്പക്കാവ്. സർപ്പദോഷ ശാന്തിക്കും സന്താന സൗഭാഗ്യത്തിനുമായി നൂറും പാലും മഞ്ഞൾപ്പൊടി ആട്ടവും ഇവിടെ അനുഷ്ഠിക്കുന്നു.',
      image: '/images/sarpa-kavu.jpg',
      statLabelEn: 'Sacred Flora & Trees',
      statLabelMl: 'ഔഷധ വൃക്ഷങ്ങൾ',
      statVal: 'Eco Sanctuary'
    },
    {
      id: 'annadanam',
      labelEn: 'Holy Prasada Oottu',
      labelMl: 'നിത്യ അന്നദാനം',
      titleEn: 'Sacred Nithya Annadanam Seva',
      titleMl: 'സഹസ്രങ്ങൾക്ക് അന്നം നൽകുന്ന മഹാപുണ്യം',
      descEn: 'The sanctified temple kitchen (Thidappally) prepares pure vegetarian feast (Prasada Oottu) served daily to hundreds of visiting pilgrims without caste, creed, or distinction, upholding the timeless Kerala adage "Annadanam Mahadanam".',
      descMl: 'ക്ഷേത്ര തിടപ്പള്ളിയിൽ അതീവ ശുദ്ധിയോടെ പാകം ചെയ്യുന്ന ഭഗവതിയുടെ അമൃതേത്ത്. ജാതിമത ഭേദമില്ലാതെ നിത്യേന നൂറുകണക്കിന് ഭക്തജനങ്ങൾക്ക് അന്നപ്രസാദം നൽകുന്ന പുണ്യസേവനം.',
      image: '/images/festival-pongala.jpg',
      statLabelEn: 'Devotees Fed Daily',
      statLabelMl: 'നിത്യേന അന്നദാനം',
      statVal: '350+ Devotees'
    }
  ];

  const activeTabData = heritageTabs.find(t => t.id === activeHeritageTab) || heritageTabs[0];

  const handleVirtualDiyaSubmit = (e) => {
    e.preventDefault();
    setVirtualDiyaSubmitted(true);
    setVirtualDiyasCount(prev => prev + 1);
    playTempleBell(1.2);
  };

  // Devotee Testimonials Data
  const testimonials = [
    {
      name: 'Ramesh K. Pillai',
      location: 'Karunagappally',
      quoteEn: 'Visiting Bharanatheril Temple brings an incomparable sense of motherly solace. By Devi’s grace, my family experienced immense relief from long-standing health concerns.',
      quoteMl: 'ഭരണത്തേരിൽ അമ്മയുടെ സന്നിധിയിൽ എത്തുമ്പോൾ ലഭിക്കുന്ന സമാധാനം വാക്കുകൾക്കതീതമാണ്. അമ്മയുടെ അനുഗ്രഹത്താൽ കുടുംബത്തിൽ ഐശ്വര്യവും മനഃസമാധാനവും നിറഞ്ഞു.',
      rating: 5,
      offering: 'Bhagavathi Seva'
    },
    {
      name: 'Dr. Lekshmi Priya',
      location: 'Thiruvananthapuram',
      quoteEn: 'The spiritual energy in the Chuttambalam and the sacred Sarpa Kavu is truly tangible. The online Vazhipadu booking and instant confirmation receipt were seamless.',
      quoteMl: 'സർപ്പക്കാവിലെ സാന്നിധ്യവും ശ്രീകോവിലിലെ ദീപാരാധനയും മനസ്സിൽ എന്നും മായാതെ നിൽക്കുന്നു. ഓൺലൈൻ വഴി വഴിപാടുകൾ വളരെ എളുപ്പത്തിൽ ബുക്ക് ചെയ്യാനായി.',
      rating: 5,
      offering: 'Noorum Palum'
    },
    {
      name: 'Gopakumar Nair',
      location: 'Dubai, UAE',
      quoteEn: 'Even living miles away in the Gulf, being able to offer E-Kanikka and light a virtual diya for our family’s star makes us feel deeply connected to Mother Bhadrakali.',
      quoteMl: 'വിദേശത്താണെങ്കിലും അമ്മയ്ക്ക് കാണിക്ക സമർപ്പിക്കാനും ജന്മനക്ഷത്രത്തിൽ വഴിപാട് കഴിപ്പിക്കാനും സാധിക്കുന്നത് വലിയൊരു പുണ്യമായി കരുതുന്നു.',
      rating: 5,
      offering: 'Ganapathy Homam'
    }
  ];

  return (
    <div className="home-page-view modern-home">
      {/* Modern Clean Hero Section */}
      <Hero
        onOpenVazhipadu={() => onNavigate('vazhipadu')}
        onOpenDonation={onOpenDonation}
        onNavigate={onNavigate}
      />

      {/* Realtime Animated Darshan Schedule Timeline Ribbon */}
      <section className="modern-darshan-strip">
        <div className="container">
          <div className="modern-strip-card animated-glass-surface">
            {/* Live Status indicator */}
            <div className="strip-col live-status-col">
              <div className="strip-col-icon pulse-glow">
                <Clock size={20} className="text-gold" />
              </div>
              <div className="strip-col-text">
                <div className="strip-badge-row">
                  <span className={`strip-live-pill ${darshanPhase !== 'closed' ? 'open' : 'closed'}`}>
                    <span className="strip-pulse-dot"></span>
                    {darshanPhase !== 'closed' ? t('nadaOpen') : t('nadaClosed')}
                  </span>
                </div>
                <strong className="strip-col-val">
                  {darshanPhase === 'morning'
                    ? (lang === 'en' ? 'Morning Darshan Active' : 'പ്രഭാത ദർശനം തുടരുന്നു')
                    : darshanPhase === 'evening'
                    ? (lang === 'en' ? 'Evening Deeparadhana Active' : 'സന്ധ്യാ ദീപാരാധന തുടരുന്നു')
                    : (lang === 'en' ? 'Temple Reopens at 5:00 PM' : 'വൈകുന്നേരം 5:00-ന് നട തുറക്കും')}
                </strong>
              </div>
            </div>

            <div className="strip-pipe"></div>

            {/* Morning Darshan Slot */}
            <div className="strip-col">
              <div className="strip-col-icon">
                <Flame size={18} className="text-gold" />
              </div>
              <div className="strip-col-text">
                <span className="strip-col-label">{t('morningDarshan')}</span>
                <strong className="strip-col-val">5:30 AM – 11:00 AM</strong>
              </div>
            </div>

            <div className="strip-pipe"></div>

            {/* Evening Darshan Slot */}
            <div className="strip-col">
              <div className="strip-col-icon">
                <Sparkles size={18} className="text-gold" />
              </div>
              <div className="strip-col-text">
                <span className="strip-col-label">{t('eveningDarshan')}</span>
                <strong className="strip-col-val">5:00 PM – 8:00 PM</strong>
              </div>
            </div>

            <div className="strip-pipe"></div>

            {/* Action Link */}
            <div className="strip-col-action">
              <button className="btn-modern-gold-sm" onClick={() => onNavigate('darshan')}>
                <span>{t('viewFullTimings')}</span>
                <ArrowRight size={14} className="hover-arrow" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Sanctum & Heritage Editorial Section */}
      <section className="home-welcome-section modern-section section-padding">
        <div className="container">
          <div className="welcome-modern-grid">
            {/* Visual Column with Geometric Gold Frame */}
            <div className="welcome-modern-visual">
              <div className="modern-img-wrapper hover-card-tilt">
                <img
                  src={activeTabData.image}
                  alt={lang === 'en' ? activeTabData.titleEn : activeTabData.titleMl}
                  className="welcome-hero-img crossfade-img"
                  key={activeHeritageTab}
                />
                <div className="welcome-gold-accent-border"></div>
                <div className="welcome-glass-badge animated-glass-float">
                  <div className="badge-glow-icon">
                    <Sparkles size={20} className="text-gold animate-flame" />
                  </div>
                  <div>
                    <h5 className="badge-strong">{activeTabData.statVal}</h5>
                    <p className="badge-sub">{lang === 'en' ? activeTabData.statLabelEn : activeTabData.statLabelMl}</p>
                  </div>
                </div>
              </div>

              {/* 4 Stat Badges */}
              <div className="heritage-metrics-grid">
                <div className="metric-box">
                  <span className="metric-num">500+</span>
                  <span className="metric-label">{lang === 'en' ? 'Years of Sanctity' : 'വർഷത്തെ പാരമ്പര്യം'}</span>
                </div>
                <div className="metric-box">
                  <span className="metric-num">5</span>
                  <span className="metric-label">{lang === 'en' ? 'Consecrated Shrines' : 'പുണ്യ സന്നിധികൾ'}</span>
                </div>
                <div className="metric-box">
                  <span className="metric-num">365</span>
                  <span className="metric-label">{lang === 'en' ? 'Days Annadanam' : 'നിത്യ അന്നദാനം'}</span>
                </div>
                <div className="metric-box">
                  <span className="metric-num">80G</span>
                  <span className="metric-label">{lang === 'en' ? 'Tax-Exempt Trust' : 'നികുതി ഇളവ്'}</span>
                </div>
              </div>
            </div>

            {/* Content Column with Interactive Tabs */}
            <div className="welcome-modern-content">
              <div className="modern-eyebrow">
                <Sparkles size={14} className="text-gold" />
                <span>{lang === 'en' ? 'Sacred Abode of Bhadrakali' : 'ശ്രീ ഭദ്രകാളിയുടെ പുണ്യസന്നിധി'}</span>
              </div>
              
              <h2 className={`welcome-headline ${lang === 'ml' ? 'text-malayalam' : ''}`}>
                {lang === 'en' ? (
                  <>Sacred Abode of Divine Grace & <span className="gold-shimmer-text">Motherly Protection</span></>
                ) : (
                  <>മാതൃവാത്സല്യവും ദിവ്യാനുഗ്രഹവും നിറയുന്ന <span className="gold-shimmer-text">പുണ്യസന്നിധി</span></>
                )}
              </h2>

              <p className="welcome-paragraph">
                {t('welcomeDescText')}
              </p>

              {/* Interactive Heritage Tabs */}
              <div className="heritage-tabs-pills">
                {heritageTabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`heritage-pill-btn ${activeHeritageTab === tab.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveHeritageTab(tab.id);
                      playTempleBell(1.1);
                    }}
                  >
                    <span>{lang === 'en' ? tab.labelEn : tab.labelMl}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic Feature Details Card */}
              <div className="welcome-feature-card dynamic-heritage-card" key={activeHeritageTab}>
                <div className="feature-card-icon">
                  <Shield size={20} className="text-gold" />
                </div>
                <div className="feature-card-body">
                  <strong>{lang === 'en' ? activeTabData.titleEn : activeTabData.titleMl}</strong>
                  <p>{lang === 'en' ? activeTabData.descEn : activeTabData.descMl}</p>
                </div>
              </div>

              <div className="welcome-actions-row">
                <button className="btn-modern-wine" onClick={() => onNavigate('about')}>
                  <BookOpen size={16} />
                  <span>{t('readHistory')}</span>
                  <ArrowRight size={16} className="btn-arrow" />
                </button>
                <button className="btn-modern-outline" onClick={() => onNavigate('deities')}>
                  <span>{t('viewDeities')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Consecrated Shrines Showcase */}
      <section className="home-deities-section modern-section section-padding-bg">
        <div className="container">
          <div className="section-header-modern">
            <span className="modern-eyebrow">
              <Shield size={14} className="text-gold" />
              <span>{lang === 'en' ? 'Consecrated Upadevathas' : 'പ്രതിഷ്ഠകളും ഉപദേവതകളും'}</span>
            </span>
            <h2 className={`modern-section-title ${lang === 'ml' ? 'text-malayalam' : ''}`}>
              {lang === 'en' ? 'The 5 Sacred Shrines' : 'പവിത്രമായ 5 സന്നിധികൾ'}
            </h2>
            <p className="modern-section-subtitle">
              {lang === 'en'
                ? 'Pay homage to Presiding Mother Bhadrakali and the consecrated guardian deities at Thurayilkunnu.'
                : 'തുറയിൽക്കുന്നിലെ പ്രധാന പ്രതിഷ്ഠയായ ശ്രീ ഭദ്രകാളിയെയും പുണ്യ ഉപദേവതകളെയും വണങ്ങി അനുഗ്രഹം നേടൂ.'}
            </p>
            <div className="modern-golden-rule"></div>
          </div>

          <div className="modern-deities-showcase-grid">
            {deities.map((deity, idx) => (
              <div
                key={deity.id}
                className={`modern-deity-card hover-lift-card ${idx === 0 ? 'primary-deity-card' : ''}`}
              >
                <div className="deity-card-img-wrap">
                  <img src={deity.image} alt={lang === 'en' ? deity.nameEn : deity.nameMl} className="deity-img" />
                  <div className="deity-card-overlay-gradient"></div>
                  <span className="deity-card-role-chip">
                    <Shield size={12} />
                    <span>{lang === 'ml' ? (deity.roleMl || deity.role) : (deity.roleEn || deity.role)}</span>
                  </span>
                </div>

                <div className="deity-card-content">
                  <h4 className={lang === 'ml' ? 'deity-card-title text-malayalam' : 'deity-card-title'}>
                    {lang === 'en' ? deity.nameEn : deity.nameMl}
                  </h4>
                  <p className="deity-card-desc">
                    {(lang === 'ml' ? (deity.descMl || deity.description) : deity.descEn || deity.description).slice(0, 110)}…
                  </p>
                  
                  <div className="deity-card-bottom">
                    <button
                      className="btn-deity-book"
                      onClick={() => onSelectDeityForPooja(deity.nameEn)}
                    >
                      <Sparkles size={14} />
                      <span>{t('bookOffering')}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="section-center-action">
            <button className="btn-modern-outline-lg" onClick={() => onNavigate('deities')}>
              <span>{t('viewAllShrines')}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Curated Vazhipadu Offerings Showcase */}
      <section className="home-vazhipadu-section modern-section section-padding">
        <div className="container">
          <div className="section-header-modern">
            <span className="modern-eyebrow">
              <Sparkles size={14} className="text-gold" />
              <span>{t('devotionalOfferings')}</span>
            </span>
            <h2 className={`modern-section-title ${lang === 'ml' ? 'text-malayalam' : ''}`}>
              {lang === 'en' ? 'Sacred Vazhipadu Offerings' : 'പ്രധാന വഴിപാടുകൾ'}
            </h2>
            <p className="modern-section-subtitle">
              {lang === 'en'
                ? 'Offer sacred poojas, pushpanjalis, and payasam to invoke Mother Bhadrakali’s protection and blessings.'
                : 'അമ്മയുടെ അനുഗ്രഹത്തിനായി നിത്യ പൂജകളും പുഷ്പാഞ്ജലികളും പായസ നിവേദ്യങ്ങളും ഓൺലൈനായി ബുക്ക് ചെയ്യാം.'}
            </p>
            <div className="modern-golden-rule"></div>
          </div>

          {/* Category Filter Chips */}
          <div className="offering-filter-chips-row">
            {['All', 'Bhadrakali', 'Ganapathy', 'Nagaraja'].map(category => (
              <button
                key={category}
                className={`filter-chip-btn ${activeOfferingCategory === category ? 'active' : ''}`}
                onClick={() => {
                  setActiveOfferingCategory(category);
                  playTempleBell(1.15);
                }}
              >
                <span>
                  {category === 'All'
                    ? (lang === 'en' ? 'All Top Offerings' : 'എല്ലാ വഴിപാടുകളും')
                    : category}
                </span>
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="modern-offerings-grid">
            {filteredOfferings.map((offering) => (
              <div key={offering.id} className="modern-offering-card hover-glow-card">
                <div className="offering-top-meta">
                  <span className="offering-deity-tag">{offering.deity}</span>
                  <span className="offering-price-pill">₹{offering.price}</span>
                </div>

                <div className="offering-body-wrap">
                  <h4 className={lang === 'ml' ? 'offering-name text-malayalam' : 'offering-name'}>
                    {lang === 'en' ? offering.nameEn : offering.nameMl}
                  </h4>
                  <p className="offering-description">{offering.desc}</p>
                </div>

                <div className="offering-card-cta">
                  <button className="btn-modern-book-offering" onClick={() => onNavigate('vazhipadu')}>
                    <Sparkles size={14} />
                    <span>{t('bookNow')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="section-center-action">
            <button className="btn-modern-wine-lg" onClick={() => onNavigate('vazhipadu')}>
              <span>{t('viewFullCatalog')}</span>
              <ArrowRight size={16} className="btn-arrow" />
            </button>
          </div>
        </div>
      </section>

      {/* Dedicated Interactive Virtual Nilavilakku Diya Samarppanam */}
      <section className="virtual-diya-section modern-section section-padding-dark">
        <div className="container">
          <div className="virtual-diya-card">
            <div className="virtual-diya-grid">
              {/* Lamp Visual Column */}
              <div className="virtual-diya-visual-col">
                <div className={`nilavilakku-podium ${virtualDiyaSubmitted ? 'lit' : ''}`}>
                  <div className="lamp-glow-aura"></div>
                  <div className="brass-nilavilakku-graphic">
                    <Flame size={44} className={`podium-flame ${virtualDiyaSubmitted ? 'flame-dancing' : ''}`} />
                    <img src="/lamp-icon.svg" alt="Sacred Nilavilakku" className="podium-lamp-img animate-flame" />
                  </div>
                  <div className="podium-base-reflection"></div>
                </div>

                <div className="virtual-diya-counter-box">
                  <Flame size={15} className="text-gold" />
                  <span>
                    <strong>{virtualDiyasCount.toLocaleString()}</strong> {lang === 'en' ? 'Sacred Lamps Lit Today' : 'വിളക്കുകൾ ഇന്ന് തെളിഞ്ഞു'}
                  </span>
                </div>
              </div>

              {/* Form & Devotional Offering Column */}
              <div className="virtual-diya-form-col">
                <span className="modern-eyebrow eyebrow-light">
                  <Flame size={14} className="text-gold" />
                  <span>{lang === 'en' ? 'Sacred Virtual Samarppanam' : 'നെയ്‌വിളക്ക് സമർപ്പണം'}</span>
                </span>

                <h3 className="virtual-diya-title">
                  {lang === 'en'
                    ? 'Light a Sacred Lamp for Mother Bhadrakali'
                    : 'ഭഗവതിയുടെ തിരുമുമ്പിൽ ഭക്തിപൂർവ്വം ഒരു തിരി തെളിയിക്കൂ'}
                </h3>

                <p className="virtual-diya-desc">
                  {lang === 'en'
                    ? 'Wherever you are in the world, offer a virtual ghee lamp with your Nakshathram. May the sacred flame dispel darkness and bestow health, peace, and auspicious grace.'
                    : 'ലോകത്തിന്റെ ഏത് കോണിലിരുന്നും നിങ്ങളുടെ ജന്മനക്ഷത്രത്തിൽ ഭഗവതിക്ക് ഒരു നെയ്‌വിളക്ക് തെളിയിച്ച് പ്രാർത്ഥിക്കാം. അമ്മയുടെ കാരുണ്യം സദാ നിങ്ങളെ തുണയ്ക്കട്ടെ.'}
                </p>

                {!virtualDiyaSubmitted ? (
                  <form onSubmit={handleVirtualDiyaSubmit} className="virtual-diya-form">
                    <div className="diya-form-row">
                      <div className="form-group-item">
                        <label>{lang === 'en' ? 'Devotee Name' : 'ഭക്തന്റെ പേര്'}</label>
                        <input
                          type="text"
                          placeholder={lang === 'en' ? 'Enter your name' : 'പേര് രേഖപ്പെടുത്തുക'}
                          value={diyaDevoteeName}
                          onChange={(e) => setDiyaDevoteeName(e.target.value)}
                          className="diya-input-field"
                          required
                        />
                      </div>

                      <div className="form-group-item">
                        <label>{lang === 'en' ? 'Birth Star (Nakshathram)' : 'ജന്മനക്ഷത്രം'}</label>
                        <select
                          value={selectedNakshatram}
                          onChange={(e) => setSelectedNakshatram(e.target.value)}
                          className="diya-select-field"
                        >
                          {nakshathras.map(star => (
                            <option key={star.id} value={star.en}>
                              {lang === 'en' ? star.en : star.ml}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="btn-light-virtual-diya">
                      <Flame size={18} />
                      <span>{lang === 'en' ? 'Light Sacred Ghee Lamp' : 'നെയ്‌വിളക്ക് തെളിയിക്കുക'}</span>
                    </button>
                  </form>
                ) : (
                  <div className="virtual-diya-success-card animate-fade-in">
                    <div className="success-badge-icon">
                      <CheckCircle2 size={32} className="text-gold" />
                    </div>
                    <h4>{lang === 'en' ? 'Sacred Diya Lit with Devotion' : 'നെയ്‌വിളക്ക് ഭക്തിപൂർവ്വം തെളിഞ്ഞു'}</h4>
                    <p className="blessing-person">
                      {diyaDevoteeName ? `${diyaDevoteeName} • ` : ''}{selectedNakshatram} {lang === 'en' ? 'Nakshathram' : 'നക്ഷത്രം'}
                    </p>
                    <p className="blessing-text">
                      {lang === 'en'
                        ? '"Om Sree Bhadrakalyai Namah • May Divine Mother bless you with boundless health, peace, and auspicious grace."'
                        : '"ഓം ശ്രീ ഭദ്രകാള്യൈ നമഃ • ഭഗവതിയുടെ കാരുണ്യവും അനുഗ്രഹവും സദാ ഉണ്ടാകട്ടെ."'}
                    </p>
                    <button
                      className="btn-light-again"
                      onClick={() => setVirtualDiyaSubmitted(false)}
                    >
                      <span>{lang === 'en' ? 'Light Another Lamp' : 'മറ്റൊരു തിരി തെളിയിക്കുക'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grand Bharani Mahotsavam Spotlight */}
      <section className="home-festival-spotlight modern-section section-padding-dark">
        <div className="container">
          <div className="modern-festival-spotlight-card">
            <div className="spotlight-content-side">
              <div className="spotlight-badge">
                <Flame size={15} className="text-gold" />
                <span>{lang === 'en' ? 'Grand Annual Mahotsavam' : 'വാർഷിക ഭരണി മഹോത്സവം'}</span>
              </div>

              <h2 className={`spotlight-heading ${lang === 'ml' ? 'text-malayalam' : ''}`}>
                {lang === 'en' ? 'Annual Bharani Mahotsavam' : 'ഭരണി മഹോത്സവം'}
              </h2>
              
              <h3 className="spotlight-subtitle">
                {lang === 'en'
                  ? 'Kumbham/Meenam • Thalappoli, Chenda Melam & Midnight Guruthi'
                  : 'കുംഭം/മീനം • താലപ്പൊലി, ചെണ്ടമേളം, കുത്തിയോട്ടം & പവിത്രമായ ഗുരുതി'}
              </h3>

              <p className="spotlight-text">
                {t('festivalHomeSummary')}
              </p>

              {/* Modern Live Glowing Countdown */}
              <div className="modern-countdown-cluster">
                {[
                  { val: timeLeft.days, unit: lang === 'en' ? 'Days' : 'ദിവസം' },
                  { val: String(timeLeft.hours).padStart(2, '0'), unit: lang === 'en' ? 'Hours' : 'മണിക്കൂർ' },
                  { val: String(timeLeft.minutes).padStart(2, '0'), unit: lang === 'en' ? 'Mins' : 'മിനിറ്റ്' },
                  { val: String(timeLeft.seconds).padStart(2, '0'), unit: lang === 'en' ? 'Secs' : 'സെക്കൻഡ്' },
                ].map((cd, i) => (
                  <React.Fragment key={i}>
                    <div className="modern-cd-tile glow-tile">
                      <span className="cd-digit">{cd.val}</span>
                      <span className="cd-caption">{cd.unit}</span>
                    </div>
                    {i < 3 && <div className="cd-dot-sep">:</div>}
                  </React.Fragment>
                ))}
              </div>

              {/* 4 Festival Highlights */}
              <div className="festival-highlights-row">
                <span className="fest-pill">{lang === 'en' ? '🌸 Pongala Mahotsavam' : '🌸 പൊങ്കാല മഹോത്സവം'}</span>
                <span className="fest-pill">{lang === 'en' ? '🥁 Traditional Melam' : '🥁 പഞ്ചവാദ്യം & മേളം'}</span>
                <span className="fest-pill">{lang === 'en' ? '🪔 Thalappoli Procession' : '🪔 താലപ്പൊലി ഘോഷയാത്ര'}</span>
                <span className="fest-pill">{lang === 'en' ? '🔥 Midnight Guruthi' : '🔥 അർദ്ധരാത്രി ഗുരുതി'}</span>
              </div>

              <div className="spotlight-actions-group">
                <button className="btn-modern-gold" onClick={() => onNavigate('festivals')}>
                  <Calendar size={16} />
                  <span>{t('viewFestivalSchedule')}</span>
                </button>
                <button className="btn-modern-glass" onClick={onOpenDonation}>
                  <HeartHandshake size={16} />
                  <span>{t('festivalDonate')}</span>
                </button>
              </div>
            </div>

            <div className="spotlight-visual-side">
              <div className="spotlight-img-frame">
                <img
                  src="/images/festival-pongala.jpg"
                  alt="Bharani Mahotsavam"
                  className="spotlight-img"
                />
                <div className="spotlight-frame-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nithya Annadanam Holy Food Offering Banner */}
      <section className="home-annadanam-callout modern-section section-padding">
        <div className="container">
          <div className="modern-annadanam-banner animated-gold-border">
            <div className="annadanam-flex-wrap">
              <div className="annadanam-icon-box">
                <HeartHandshake size={38} className="text-gold animate-flame" />
              </div>
              <div className="annadanam-copy">
                <span className="annadanam-eyebrow">
                  {t('annadanamLabel')}
                </span>
                <h3 className={`annadanam-header ${lang === 'ml' ? 'text-malayalam' : ''}`}>
                  {t('annadanamTitle')}
                </h3>
                <p className="annadanam-subtext">
                  {t('annadanamDesc')}
                </p>

                {/* Daily Meals Progress Bar */}
                <div className="annadanam-progress-wrap">
                  <div className="progress-labels">
                    <span>{lang === 'en' ? "Today's Annadanam Sponsorship: 290 / 350 Meals" : 'ഇന്നത്തെ അന്നദാന സംഭാവന: 290 / 350 പേർ'}</span>
                    <strong className="text-gold">83%</strong>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: '83%' }}></div>
                  </div>
                </div>
              </div>

              <div className="annadanam-cta-box">
                <button className="btn-modern-gold-lg" onClick={onOpenDonation}>
                  <HeartHandshake size={18} />
                  <span>{t('donateNow')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Devotee Experiences (Clean 3-Card Grid) */}
      <section className="home-testimonials-section modern-section section-padding-bg">
        <div className="container">
          <div className="section-header-modern">
            <span className="modern-eyebrow">
              <Quote size={14} className="text-gold" />
              <span>{lang === 'en' ? 'Devotee Experiences' : 'ഭക്തജന അനുഭവങ്ങൾ'}</span>
            </span>
            <h2 className={`modern-section-title ${lang === 'ml' ? 'text-malayalam' : ''}`}>
              {lang === 'en' ? 'Testimonies of Divine Grace' : 'ഭഗവതിയുടെ കൃപാകടാക്ഷം'}
            </h2>
            <p className="modern-section-subtitle">
              {lang === 'en'
                ? 'Heartfelt blessings and divine experiences shared by pilgrims and devotees across the globe.'
                : 'അമ്മയുടെ കാരുണ്യത്താൽ അനുഗ്രഹം പ്രാപിച്ച ഭക്തജനങ്ങളുടെ ഹൃദയസ്പർശിയായ അനുഭവങ്ങൾ.'}
            </p>
            <div className="modern-golden-rule"></div>
          </div>

          <div className="testimonies-modern-grid">
            {testimonials.map((item, idx) => (
              <div key={idx} className="testimony-card hover-lift-card">
                <div className="testimony-card-header">
                  <div className="testimony-rating">
                    {Array.from({ length: item.rating }).map((_, rIdx) => (
                      <Star key={rIdx} size={15} className="star-icon filled text-gold" />
                    ))}
                  </div>
                  <span className="testimony-verified-chip">
                    <CheckCircle2 size={13} className="text-gold" />
                    <span>{lang === 'en' ? 'Verified Devotee' : 'ഭക്തജന സാക്ഷ്യം'}</span>
                  </span>
                </div>

                <div className="testimony-body">
                  <Quote size={24} className="quote-watermark text-gold" />
                  <p className="testimony-quote">
                    "{lang === 'en' ? item.quoteEn : item.quoteMl}"
                  </p>
                </div>

                <div className="testimony-card-footer">
                  <div className="author-avatar-circle">
                    {item.name.charAt(0)}
                  </div>
                  <div className="author-details">
                    <h5 className="author-name">{item.name}</h5>
                    <span className="author-location-text">
                      <MapPin size={12} className="text-gold" />
                      <span>{item.location} • <strong className="text-gold">{item.offering}</strong></span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="testimony-callout-strip">
            <div className="testimony-callout-content">
              <Sparkles size={18} className="text-gold" />
              <p>
                {lang === 'en'
                  ? 'Have you experienced Mother Bhadrakali’s divine protection? Connect with our temple office to share your prayer or testimony.'
                  : 'ഭരണത്തേരിലമ്മയുടെ കൃപാകടാക്ഷം അനുഭവിച്ചറിഞ്ഞിട്ടുണ്ടോ? നിങ്ങളുടെ പ്രാർത്ഥനകളും അനുഭവങ്ങളും ക്ഷേത്ര സമിതിയുമായി പങ്കുവെക്കാം.'}
              </p>
            </div>
            <button className="btn-modern-outline" onClick={() => onNavigate('contact')}>
              <span>{t('contact')}</span>
              <ArrowRight size={14} className="btn-arrow" />
            </button>
          </div>
        </div>
      </section>

      {/* Pilgrimage Essentials & Visitor Guide */}
      <section className="home-essentials-section modern-section section-padding">
        <div className="container">
          <div className="section-header-modern">
            <span className="modern-eyebrow">
              <Compass size={14} className="text-gold" />
              <span>{lang === 'en' ? 'Pilgrimage Essentials' : 'തീർത്ഥാടന വഴികാട്ടി'}</span>
            </span>
            <h2 className={`modern-section-title ${lang === 'ml' ? 'text-malayalam' : ''}`}>
              {lang === 'en' ? 'Plan Your Sacred Visit' : 'ക്ഷേത്ര ദർശന വിവരങ്ങൾ'}
            </h2>
            <div className="modern-golden-rule"></div>
          </div>

          <div className="modern-essentials-grid">
            <div className="essential-card hover-lift-card" onClick={() => onNavigate('darshan')}>
              <div className="essential-icon-circle">
                <Clock size={22} className="text-gold" />
              </div>
              <h4>{t('darshan')}</h4>
              <p>{lang === 'en' ? 'Daily sanctum opening, deeparadhana, and special pooja calendar.' : 'നിത്യ പൂജാക്രമങ്ങളും ദീപാരാധന സമയങ്ങളും.'}</p>
              <span className="essential-link-arrow">
                <span>{lang === 'en' ? 'View Schedule' : 'സമയക്രമം'}</span>
                <ArrowRight size={14} />
              </span>
            </div>

            <div className="essential-card hover-lift-card" onClick={() => onNavigate('vazhipadu')}>
              <div className="essential-icon-circle">
                <Sparkles size={22} className="text-gold" />
              </div>
              <h4>{t('vazhipadu')}</h4>
              <p>{lang === 'en' ? 'Book Payasam, Archana, and Homam offerings online with digital receipt.' : 'വഴിപാടുകൾ ഓൺലൈനായി ബുക്ക് ചെയ്യാം.'}</p>
              <span className="essential-link-arrow">
                <span>{lang === 'en' ? 'Book Online' : 'വഴിപാട് ബുക്കിംഗ്'}</span>
                <ArrowRight size={14} />
              </span>
            </div>

            <div className="essential-card hover-lift-card" onClick={() => onNavigate('kanikka')}>
              <div className="essential-icon-circle">
                <HeartHandshake size={22} className="text-gold" />
              </div>
              <h4>{t('kanikka')}</h4>
              <p>{lang === 'en' ? 'Official temple trust account, online UPI, and 80G tax exemption.' : 'ക്ഷേത്ര ട്രസ്റ്റ് അക്കൗണ്ട്, 80G നികുതി ഇളവ്.'}</p>
              <span className="essential-link-arrow">
                <span>{lang === 'en' ? 'Donate Online' : 'കാണിക്ക സമർപ്പിക്കുക'}</span>
                <ArrowRight size={14} />
              </span>
            </div>

            <div className="essential-card hover-lift-card" onClick={() => onNavigate('contact')}>
              <div className="essential-icon-circle">
                <Compass size={22} className="text-gold" />
              </div>
              <h4>{t('contact')}</h4>
              <p>{lang === 'en' ? 'NH 66 Karunagappally road, train routes, and temple office helpline.' : 'യാത്രാ വഴികളും ക്ഷേത്ര ഓഫീസ് ഫോൺ നമ്പറും.'}</p>
              <span className="essential-link-arrow">
                <span>{lang === 'en' ? 'Get Directions' : 'വഴികാട്ടി'}</span>
                <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
