import React, { useState, useEffect } from 'react';
import {
  sacredSloka,
  darshanSchedule,
  deities,
  vazhipaduList,
  festivals,
  nakshathras
} from '../data/templeData';
import {
  Sparkles,
  ArrowRight,
  Clock,
  MapPin,
  Flame,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  HeartHandshake,
  Star,
  Quote,
  Compass,
  Sun,
  Bell,
  Calendar,
  Check
} from 'lucide-react';
import { playTempleBell } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

const BANNER_SLIDES = [
  {
    id: 'devi',
    image: '/images/hero-devi-portrait.jpg',
    kickerEn: 'The Sacred Abode · Thurayilkunnu',
    kickerMl: 'ശാക്തേയ സന്നിധി · തുറയിൽക്കുന്ന്',
    headEn: 'Sacred Mother',
    headMl: 'ശ്രീ ഭദ്രകാളി',
    accentEn: 'Bhadrakali',
    accentMl: 'ഭഗവതി',
    subEn: 'Presiding Goddess of divine grace, fierce protection and unbroken Kerala tantric tradition.',
    subMl: 'ദിവ്യ കാരുണ്യത്തിന്റെയും ശക്തമായ സംരക്ഷണത്തിന്റെയും പ്രധാന ശക്തി സന്നിധി.',
    taglineEn: 'Five centuries of maternal benevolence, blessing every seeker who climbs the sacred mound of Thurayilkunnu.',
    taglineMl: 'തുറയിൽക്കുന്നിന്റെ പുണ്യശ്രേണിയിൽ അഞ്ച് നൂറ്റാണ്ടുകളായി ഒഴുകുന്ന അമ്മയുടെ കാരുണ്യം.',
    cta1En: 'Book Vazhipadu',
    cta1Ml: 'വഴിപാട് ബുക്ക് ചെയ്യുക',
    cta1Action: 'vazhipadu',
    cta2En: 'Explore History',
    cta2Ml: 'ക്ഷേത്ര ചരിത്രം',
    cta2Action: 'about'
  },
  {
    id: 'festival',
    image: '/images/festival-pongala.jpg',
    kickerEn: 'Grand Annual Kumbham / Meenam Festival',
    kickerMl: 'വാർഷിക കുംഭ / മീന മഹോത്സവം',
    headEn: 'Bharani',
    headMl: 'ഭരണി മഹോത്സവം',
    accentEn: 'Pongala',
    accentMl: 'പൊങ്കാല',
    subEn: 'Thalappoli, majestic Chenda Melam, Kuthiyottam and the midnight Guruthi of the goddess.',
    subMl: 'താലപ്പൊലി, ചെണ്ടമേളം, കുത്തിയോട്ടം, അർദ്ധരാത്രി ഗുരുതി എന്നിവയാൽ ശോഭിക്കുന്ന മഹോത്സവം.',
    taglineEn: 'Witness the grand festival of Thurayilkunnu where thousands gather beneath the sacred flame.',
    taglineMl: 'ദിവ്യതീർത്ഥത്തിന് സാക്ഷ്യം വഹിക്കാൻ ആയിരങ്ങൾ ഒഴുകുന്ന തുറയിൽക്കുന്നിന്റെ പെരുമ.',
    cta1En: 'Festival Schedule',
    cta1Ml: 'ഉത്സവ വിവരങ്ങൾ',
    cta1Action: 'festivals',
    cta2En: 'Offer Kanikka',
    cta2Ml: 'കാണിക്ക സമർപ്പിക്കുക',
    cta2Action: 'donate'
  },
  {
    id: 'sarpakavu',
    image: '/images/hero-sarpakavu-bright.jpg',
    kickerEn: 'Ancient Sacred Nature Grove',
    kickerMl: 'പുരാതന പുണ്യ സർപ്പക്കാവ്',
    headEn: 'Nagaraja',
    headMl: 'നാഗരാജാവും',
    accentEn: '& Nagayakshi',
    accentMl: 'നാഗയക്ഷിയും',
    subEn: 'A sanctum of ancient sacred flora with daily Ayilyam Pooja, Noorum Palum and turmeric abhishekam.',
    subMl: 'ആയില്യപൂജ, നൂറുംപാലും, മഞ്ഞൾപ്പൊടി അഭിഷേകം എന്നിവയാല് അനുഗൃഹീതമായ പുണ്യസാന്നിധ്യം.',
    taglineEn: 'Honour the serpent deities whose serene presence guards the temple grove and its devotees.',
    taglineMl: 'ക്ഷേത്രക്കാവിനെയും ഭക്തരെയും കാത്ത് ഒരുമിച്ചു വാഴുന്ന നാഗസാന്നിധ്യം.',
    cta1En: 'Book Sarpa Pooja',
    cta1Ml: 'സർപ്പപൂജ ബുക്ക് ചെയ്യുക',
    cta1Action: 'vazhipadu',
    cta2En: 'View All Shrines',
    cta2Ml: 'എല്ലാ സന്നിധികളും',
    cta2Action: 'deities'
  }
];

export function HomePage({ onNavigate, onOpenDonation, onSelectDeityForPooja }) {
  const { lang, t } = useLanguage();

  const [activeSlide, setActiveSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 8, minutes: 45, seconds: 30 });
  const [darshanPhase, setDarshanPhase] = useState('morning');
  const [currentIstTime, setCurrentIstTime] = useState('');
  const [bellRung, setBellRung] = useState(false);

  const [activeOfferingCategory, setActiveOfferingCategory] = useState('All');

  const [selectedNakshatram, setSelectedNakshatram] = useState('Bharani');
  const [diyaDevoteeName, setDiyaDevoteeName] = useState('');
  const [virtualDiyaSubmitted, setVirtualDiyaSubmitted] = useState(false);
  const [virtualDiyasCount, setVirtualDiyasCount] = useState(1842);

  // Live festival countdown
  useEffect(() => {
    const targetDate = new Date(festivals[0]?.dateTarget || '2027-03-24T06:00:00').getTime();
    const updateCountdown = () => {
      const diff = targetDate - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff % 86400000) / 3600000),
          minutes: Math.floor((diff % 3600000) / 60000),
          seconds: Math.floor((diff % 60000) / 1000)
        });
      }
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Live IST darshan phase
  useEffect(() => {
    const checkPhase = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const istDate = new Date(utc + 3600000 * 5.5);
      const hours = istDate.getHours();
      const minutes = istDate.getMinutes();
      const totalMinutes = hours * 60 + minutes;
      if (totalMinutes >= 330 && totalMinutes <= 660) setDarshanPhase('morning');
      else if (totalMinutes >= 1020 && totalMinutes <= 1200) setDarshanPhase('evening');
      else setDarshanPhase('closed');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const h12 = hours % 12 || 12;
      const mm = minutes < 10 ? '0' + minutes : minutes;
      setCurrentIstTime(`${h12}:${mm} ${ampm} IST`);
    };
    checkPhase();
    const intv = setInterval(checkPhase, 30000);
    return () => clearInterval(intv);
  }, []);

  // Hero auto-advance
  useEffect(() => {
    const timer = setInterval(() => setActiveSlide((p) => (p + 1) % BANNER_SLIDES.length), 7000);
    return () => clearInterval(timer);
  }, []);

  // Scroll reveal on view
  useEffect(() => {
    const els = document.querySelectorAll('.kt-reveal');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('kt-in');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const slide = BANNER_SLIDES[activeSlide];

  const isOpen = darshanPhase !== 'closed';

  const offeringCategories = [
    { id: 'All', deps: [] },
    { id: 'Bhadrakali', deps: ['bhadra'] },
    { id: 'Ganapathy', deps: ['ganapathi'] },
    { id: 'Nagaraja', deps: ['nagaraja'] }
  ];

  const filteredOfferings = (() => {
    const cat = offeringCategories.find((c) => c.id === activeOfferingCategory);
    if (!cat || cat.deps.length === 0) {
      return vazhipaduList.filter((v) => v.popular).slice(0, 6);
    }
    return vazhipaduList
      .filter((v) => cat.deps.some((d) => v.deity.toLowerCase().includes(d)))
      .slice(0, 6);
  })();

  const handleVirtualDiyaSubmit = (e) => {
    e.preventDefault();
    setVirtualDiyaSubmitted(true);
    setVirtualDiyasCount((prev) => prev + 1);
    playTempleBell(1.2);
  };

  const handleRingBell = () => {
    playTempleBell(1.1);
    setBellRung(true);
    setTimeout(() => setBellRung(false), 2400);
  };

  const navigateTo = (target) => {
    if (target === 'donate') onOpenDonation();
    else onNavigate(target);
  };

  const heroCTA = (action) => () => navigateTo(action);

  const morning = darshanSchedule[0];
  const evening = darshanSchedule[1];

  const metrics = [
    { value: '500+', labelEn: 'Years of Sanctity', labelMl: 'വർഷത്തെ സാന്നിധ്യം' },
    { value: '5', labelEn: 'Consecrated Shrines', labelMl: 'പുണ്യ സന്നിധികൾ' },
    { value: '365', labelEn: 'Days of Annadanam', labelMl: 'നിത്യ അന്നദാനം' },
    { value: '80G', labelEn: 'Tax-Exempt Trust', labelMl: 'നികുതി ഇളവ്' }
  ];

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

  const essentials = [
    {
      id: 'darshan',
      icon: Clock,
      titleEn: 'Darshan Timings',
      titleMl: 'ദർശന സമയം',
      descEn: 'Daily sanctum opening, deeparadhana, and the special pooja calendar.',
      descMl: 'നിത്യ പൂജാക്രമങ്ങളും ദീപാരാധന സമയങ്ങളും.',
      ctaEn: 'View Schedule',
      ctaMl: 'സമയക്രമം'
    },
    {
      id: 'vazhipadu',
      icon: Sparkles,
      titleEn: 'Vazhipadu Booking',
      titleMl: 'വഴിപാട് ബുക്കിംഗ്',
      descEn: 'Book payasam, archana, and homam offerings online with an instant digital receipt.',
      descMl: 'വഴിപാടുകൾ ഓൺലൈനായി ബുക്ക് ചെയ്ത് രസീത് നേടാം.',
      ctaEn: 'Book Online',
      ctaMl: 'ഓൺലൈൻ ബുക്കിംഗ്'
    },
    {
      id: 'kanikka',
      icon: HeartHandshake,
      titleEn: 'E-Kanikka',
      titleMl: 'E-കാണിക്ക',
      descEn: 'Official temple trust account, online UPI, and 80G tax exemption.',
      descMl: 'ക്ഷേത്ര ട്രസ്റ്റ് അക്കൗണ്ട്, 80G നികുതി ഇളവ്.',
      ctaEn: 'Donate Online',
      ctaMl: 'കാണിക്ക സമർപ്പിക്കുക'
    },
    {
      id: 'contact',
      icon: Compass,
      titleEn: 'How to Reach',
      titleMl: 'വഴികാട്ടി',
      descEn: 'NH 66 Karunagappally road, train routes, and the temple office helpline.',
      descMl: 'യാത്രാ വഴികളും ക്ഷേത്ര ഓഫീസ് വിവരങ്ങളും.',
      ctaEn: 'Get Directions',
      ctaMl: 'വഴികാട്ടി'
    }
  ];

  return (
    <div className="kt-home">
      {/* ============ HERO / BANNER ============ */}
      <section className="kt-hero" aria-label="Temple Main Banner">
        <div className="kt-hero-bg" aria-hidden="true" />
        <div className="kt-kasavu-top" aria-hidden="true" />

        <div className="container kt-hero-inner">
          <div className="kt-hero-copy" key={slide.id}>
            <p className="kt-mantra">
              <Sparkles size={11} />
              <span>{lang === 'en' ? 'Om Sree Bhadrakalyai Namah' : 'ഓം ശ്രീ ഭദ്രകാള്യൈ നമഃ'}</span>
              <span className="kt-mantra-dot" />
              <span>{lang === 'en' ? 'Thurayilkunnu · Karunagappally' : 'തുറയിൽക്കുന്ന് · കരുനാഗപ്പള്ളി'}</span>
            </p>

            <div className="kt-status-row">
              <span className={`kt-status ${isOpen ? 'open' : 'closed'}`}>
                <span className="kt-status-dot" />
                <span>{isOpen ? t('nadaOpen') : t('nadaClosed')}</span>
                <i>{currentIstTime}</i>
              </span>
            </div>

            <p className="kt-kicker">{lang === 'en' ? slide.kickerEn : slide.kickerMl}</p>

            <h1 className={`kt-hero-title ${lang === 'ml' ? 'text-malayalam' : ''}`}>
              {lang === 'en' ? slide.headEn : slide.headMl}
              <em> {lang === 'en' ? slide.accentEn : slide.accentMl}</em>
            </h1>

            <p className={`kt-hero-sub ${lang === 'ml' ? 'text-malayalam' : ''}`}>
              {lang === 'en' ? slide.subEn : slide.subMl}
            </p>

            <p className="kt-hero-tag">{lang === 'en' ? slide.taglineEn : slide.taglineMl}</p>

            <div className="kt-hero-ctas">
              <button className="kt-btn kt-btn-gold" onClick={heroCTA(slide.cta1Action)}>
                <span>{lang === 'en' ? slide.cta1En : slide.cta1Ml}</span>
                <ArrowRight size={16} />
              </button>
              <button className="kt-btn kt-btn-outline" onClick={heroCTA(slide.cta2Action)}>
                <span>{lang === 'en' ? slide.cta2En : slide.cta2Ml}</span>
              </button>
            </div>

            <div className="kt-dots" role="tablist" aria-label="Banner slides">
              {BANNER_SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  className={`kt-dot ${i === activeSlide ? 'active' : ''}`}
                  onClick={() => setActiveSlide(i)}
                  aria-label={`Slide ${i + 1}: ${s.id}`}
                  title={s.id}
                />
              ))}
            </div>
          </div>

          <div className="kt-hero-media">
            <div className="kt-hero-frame">
              {BANNER_SLIDES.map((s, i) => (
                <img
                  key={s.id}
                  src={s.image}
                  alt={lang === 'en' ? s.kickerEn : s.kickerMl}
                  className={i === activeSlide ? 'active' : ''}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              ))}
              <span className="kt-frame-kasavu" aria-hidden="true" />
            </div>
            <div className="kt-hero-badge">
              <strong>500+</strong>
              <span>{lang === 'en' ? 'Years of Sanctity' : 'വർഷത്തെ സാന്നിധ്യം'}</span>
            </div>
            <div className="kt-hero-index" aria-hidden="true">
              <span>0{activeSlide + 1}</span>
              <i>/</i>
              <span>0{BANNER_SLIDES.length}</span>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="kt-darshan-bar">
            <div className="kt-bar-item">
              <Sun size={17} />
              <span>
                <small>{lang === 'en' ? 'Morning Darshan' : 'പ്രഭാത ദർശനം'}</small>
                <strong>{morning.timings}</strong>
              </span>
              <i className={`kt-bar-dot ${darshanPhase === 'morning' ? 'on' : ''}`} />
            </div>
            <div className="kt-bar-item">
              <Flame size={17} />
              <span>
                <small>{lang === 'en' ? 'Evening Deeparadhana' : 'സന്ധ്യാ ദീപാരാധന'}</small>
                <strong>{evening.timings}</strong>
              </span>
              <i className={`kt-bar-dot ${darshanPhase === 'evening' ? 'on' : ''}`} />
            </div>
            <div className="kt-bar-cta">
              <button
                className={`kt-bell ${bellRung ? 'rung' : ''}`}
                onClick={handleRingBell}
                title={lang === 'en' ? 'Ring Sacred Temple Bell' : 'ക്ഷേത്രമണി മുഴക്കുക'}
                aria-label="Ring temple bell"
              >
                <Bell size={16} className={bellRung ? 'animate-wiggle' : ''} />
              </button>
              <button className="kt-btn kt-btn-outline kt-btn-sm" onClick={() => onNavigate('darshan')}>
                <span>{lang === 'en' ? 'View Timings' : 'സമയക്രമം'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SLOKA ============ */}
      <section className="kt-sloka" aria-hidden="true">
        <div className="kt-sloka-kasavu" />
        <div className="container kt-sloka-inner">
          <span className="kt-sloka-line" />
          <p>{lang === 'en' ? sacredSloka.english : sacredSloka.sanskrit}</p>
          <span className="kt-sloka-line" />
        </div>
      </section>

      {/* ============ INTRO ============ */}
      <section className="kt-intro">
        <div className="container">
          <div className="kt-intro-grid">
            <div className="kt-intro-media kt-reveal">
              <div className="kt-frame">
                <img src="/images/temple-exterior.jpg" alt="Bharanatheril Temple" />
                <span className="kt-frame-chip">
                  {lang === 'en' ? 'The Sanctum at Thurayilkunnu' : 'തുറയിൽക്കുന്നിലെ പുണ്യക്ഷേത്രം'}
                </span>
                <span className="kt-frame-kasavu" aria-hidden="true" />
              </div>
              <div className="kt-plaque">
                <strong>500+</strong>
                <span>{lang === 'en' ? 'Years of Unbroken Worship' : 'വർഷങ്ങളായുള്ള ആരാധന'}</span>
              </div>
            </div>

            <div className="kt-intro-copy kt-reveal">
              <div className="kt-eyebrow">
                <span className="kt-rule" />
                <span>{lang === 'en' ? 'The Sacred Abode of Bhadrakali' : 'ശ്രീ ഭദ്രകാളിയുടെ പുണ്യസന്നിധി'}</span>
              </div>

              <h2 className={`kt-title ${lang === 'ml' ? 'text-malayalam' : ''}`}>
                {lang === 'en' ? (
                  <>Grace that has shielded <em>generations</em> of devotees</>
                ) : (
                  <>തലമുറകളെ <em>കാത്തുരക്ഷിച്ച</em> മാതൃകാരുണ്യം</>
                )}
              </h2>

              <p className="kt-intro-body">{t('welcomeDescText')}</p>

              <ul className="kt-points">
                <li><Check size={15} /><span>{t('welcomePt1')}</span></li>
                <li><Check size={15} /><span>{t('welcomePt2')}</span></li>
                <li><Check size={15} /><span>{t('welcomePt3')}</span></li>
              </ul>

              <button className="kt-link" onClick={() => onNavigate('about')}>
                <BookOpen size={16} />
                <span>{lang === 'en' ? 'Read the Temple History' : 'ക്ഷേത്ര ചരിത്രം വായിക്കുക'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="kt-metrics kt-reveal">
            {metrics.map((m, i) => (
              <div className="kt-metric" key={i}>
                <strong>{m.value}</strong>
                <span>{lang === 'en' ? m.labelEn : m.labelMl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SHRINES ============ */}
      <section className="kt-shrines">
        <div className="container">
          <div className="kt-head kt-reveal">
            <div className="kt-eyebrow">
              <span className="kt-rule" />
              <span>{lang === 'en' ? 'Presiding & Guardian Deities' : 'പ്രതിഷ്ഠകളും ഉപദേവതകളും'}</span>
            </div>
            <h2 className={`kt-title ${lang === 'ml' ? 'text-malayalam' : ''}`}>
              {lang === 'en' ? (
                <>The Five <em>Sacred Shrines</em></>
              ) : (
                <>പവിത്രമായ അഞ്ച് സന്നിധികൾ</>
              )}
            </h2>
            <p className="kt-sub">
              {lang === 'en'
                ? 'Pay homage to presiding Mother Bhadrakali and the consecrated guardian deities at Thurayilkunnu.'
                : 'തുറയിൽക്കുന്നിലെ പ്രധാന പ്രതിഷ്ഠയായ ശ്രീ ഭദ്രകാളിയെയും പുണ്യ ഉപദേവതകളെയും വണങ്ങി അനുഗ്രഹം നേടൂ.'}
            </p>
          </div>

          <div className="kt-shrines-grid">
            {deities.map((deity, idx) => (
              <article
                key={deity.id}
                className={`kt-shrine-card kt-reveal ${idx === 0 ? 'featured' : ''}`}
              >
                <div className="kt-shrine-media">
                  <img src={deity.image} alt={lang === 'en' ? deity.nameEn : deity.nameMl} />
                  <span className="kt-shrine-idx">{String(idx + 1).padStart(2, '0')}</span>
                  {idx === 0 && (
                    <span className="kt-featured">{lang === 'en' ? 'Presiding Deity' : 'പ്രധാന പ്രതിഷ്ഠ'}</span>
                  )}
                </div>
                <div className="kt-shrine-body">
                  <p className="kt-shrine-role">
                    {lang === 'ml' ? deity.roleMl || deity.role : deity.roleEn || deity.role}
                  </p>
                  <h3 className={lang === 'ml' ? 'text-malayalam' : ''}>
                    {lang === 'en' ? deity.nameEn : deity.nameMl}
                  </h3>
                  <p className="kt-shrine-desc">
                    {(lang === 'ml' ? deity.descMl || deity.description : deity.descEn || deity.description).slice(0, 96)}…
                  </p>
                  <button className="kt-link" onClick={() => onSelectDeityForPooja(deity.nameEn)}>
                    <span>{t('bookOffering')}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="kt-center">
            <button className="kt-btn kt-btn-outline" onClick={() => onNavigate('deities')}>
              <span>{lang === 'en' ? 'View All Five Shrines' : 'എല്ലാ സന്നിധികളും കാണുക'}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ============ OFFERINGS ============ */}
      <section className="kt-offerings">
        <div className="container">
          <div className="kt-head kt-reveal">
            <div className="kt-eyebrow">
              <span className="kt-rule" />
              <span>{t('devotionalOfferings')}</span>
            </div>
            <h2 className={`kt-title ${lang === 'ml' ? 'text-malayalam' : ''}`}>
              {lang === 'en' ? (
                <>Sacred <em>Vazhipadu</em> Offerings</>
              ) : (
                <>പ്രധാന വഴിപാടുകൾ</>
              )}
            </h2>
            <p className="kt-sub">
              {lang === 'en'
                ? 'Offer sacred poojas, pushpanjalis, and payasam to invoke Mother Bhadrakali’s protection and blessings.'
                : 'അമ്മയുടെ അനുഗ്രഹത്തിനായി നിത്യ പൂജകളും പുഷ്പാഞ്ജലികളും പായസ നിവേദ്യങ്ങളും ഓൺലൈനായി ബുക്ക് ചെയ്യാം.'}
            </p>
          </div>

          <div className="kt-chips kt-reveal">
            {offeringCategories.map((c) => (
              <button
                key={c.id}
                className={`kt-chip ${activeOfferingCategory === c.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveOfferingCategory(c.id);
                  playTempleBell(1.15);
                }}
              >
                {c.id === 'All'
                  ? (lang === 'en' ? 'All Top Offerings' : 'എല്ലാ വഴിപാടുകളും')
                  : c.id}
              </button>
            ))}
          </div>

          <div className="kt-menu kt-reveal">
            {filteredOfferings.map((offering, i) => (
              <button key={offering.id} className="kt-menu-row" onClick={() => onNavigate('vazhipadu')}>
                <span className="kt-menu-idx">{String(i + 1).padStart(2, '0')}</span>
                <span className="kt-menu-main">
                  <span className="kt-menu-deity">{offering.deity}</span>
                  <strong className={lang === 'ml' ? 'text-malayalam' : ''}>
                    {lang === 'en' ? offering.nameEn : offering.nameMl}
                  </strong>
                  <span className="kt-menu-desc">{offering.desc}</span>
                </span>
                <span className="kt-menu-meta">
                  <span className="kt-menu-price">₹{offering.price}</span>
                  <span className="kt-menu-book">
                    <span>{lang === 'en' ? 'Book' : 'ബുക്ക് ചെയ്യുക'}</span>
                    <ArrowRight size={14} />
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className="kt-center">
            <button className="kt-btn kt-btn-gold" onClick={() => onNavigate('vazhipadu')}>
              <span>{lang === 'en' ? 'View Full Catalogue' : 'മുഴുവൻ വഴിപാട് പട്ടിക'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ============ VIRTUAL DIYA ============ */}
      <section className="kt-diya">
        <div className="container">
          <div className="kt-diya-card kt-reveal">
            <div className="kt-diya-grid">
              <div className="kt-diya-visual">
                <div className={`kt-lamp ${virtualDiyaSubmitted ? 'lit' : ''}`}>
                  <div className="kt-lamp-halo" />
                  <div className="kt-lamp-stand">
                    <Flame size={36} className={`kt-lamp-flame ${virtualDiyaSubmitted ? 'dance' : ''}`} />
                    <img src="/lamp-icon.svg" alt="" className="kt-lamp-icon animate-flame" />
                  </div>
                  <div className="kt-lamp-base" />
                </div>
                <div className="kt-diya-counter">
                  <Flame size={14} />
                  <span>
                    <strong>{virtualDiyasCount.toLocaleString()}</strong>
                    {lang === 'en' ? ' Sacred Lamps Lit Today' : ' വിളക്കുകൾ ഇന്ന് തെളിഞ്ഞു'}
                  </span>
                </div>
              </div>

              <div className="kt-diya-copy">
                <div className="kt-eyebrow">
                  <span className="kt-rule" />
                  <span>{lang === 'en' ? 'Sacred Virtual Samarppanam' : 'നെയ്‌വിളക്ക് സമർപ്പണം'}</span>
                </div>

                <h3 className={`kt-diya-title ${lang === 'ml' ? 'text-malayalam' : ''}`}>
                  {lang === 'en'
                    ? 'Light a Sacred Lamp for Mother Bhadrakali'
                    : 'ഭഗവതിയുടെ തിരുമുമ്പിൽ ഭക്തിപൂർവ്വം ഒരു നെയ്‌വിളക്ക് തെളിയിക്കൂ'}
                </h3>

                <p className="kt-diya-desc">
                  {lang === 'en'
                    ? 'Wherever you are in the world, offer a virtual ghee lamp with your Nakshathram. May the sacred flame dispel darkness and bestow health, peace, and auspicious grace.'
                    : 'ലോകത്തിന്റെ ഏത് കോണിലിരുന്നും നിങ്ങളുടെ ജന്മനക്ഷത്രത്തിൽ ഭഗവതിക്ക് ഒരു നെയ്‌വിളക്ക് തെളിയിച്ച് പ്രാർത്ഥിക്കാം.'}
                </p>

                {!virtualDiyaSubmitted ? (
                  <form className="kt-diya-form" onSubmit={handleVirtualDiyaSubmit}>
                    <div className="kt-field-row">
                      <label className="kt-field">
                        <span>{lang === 'en' ? 'Devotee Name' : 'ഭക്തന്റെ പേര്'}</span>
                        <input
                          type="text"
                          value={diyaDevoteeName}
                          onChange={(e) => setDiyaDevoteeName(e.target.value)}
                          placeholder={lang === 'en' ? 'Enter your name' : 'പേര് രേഖപ്പെടുത്തുക'}
                          required
                        />
                      </label>
                      <label className="kt-field">
                        <span>{lang === 'en' ? 'Birth Star (Nakshathram)' : 'ജന്മനക്ഷത്രം'}</span>
                        <select
                          value={selectedNakshatram}
                          onChange={(e) => setSelectedNakshatram(e.target.value)}
                        >
                          {nakshathras.map((star) => (
                            <option key={star.id} value={star.en}>
                              {lang === 'en' ? star.en : star.ml}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <button type="submit" className="kt-btn kt-btn-gold kt-btn-block">
                      <Flame size={17} />
                      <span>{lang === 'en' ? 'Light Sacred Ghee Lamp' : 'നെയ്‌വിളക്ക് തെളിയിക്കുക'}</span>
                    </button>
                  </form>
                ) : (
                  <div className="kt-diya-success">
                    <div className="kt-success-ic"><CheckCircle2 size={30} /></div>
                    <h4 className={lang === 'ml' ? 'text-malayalam' : ''}>
                      {lang === 'en' ? 'Sacred Diya Lit with Devotion' : 'നെയ്‌വിളക്ക് ഭക്തിപൂർവ്വം തെളിഞ്ഞു'}
                    </h4>
                    <p className="kt-success-person">
                      {diyaDevoteeName ? `${diyaDevoteeName} • ` : ''}{selectedNakshatram} {lang === 'en' ? 'Nakshathram' : 'നക്ഷത്രം'}
                    </p>
                    <p className="kt-success-bless">
                      {lang === 'en'
                        ? '"Om Sree Bhadrakalyai Namah · May Divine Mother bless you with boundless health, peace, and auspicious grace."'
                        : '"ഓം ശ്രീ ഭദ്രകാള്യൈ നമഃ · ഭഗവതിയുടെ കാരുണ്യവും അനുഗ്രഹവും സദാ ഉണ്ടാകട്ടെ."'}
                    </p>
                    <button className="kt-btn kt-btn-outline kt-btn-sm" onClick={() => setVirtualDiyaSubmitted(false)}>
                      <span>{lang === 'en' ? 'Light Another Lamp' : 'മറ്റൊരു നെയ്‌വിളക്ക്'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FESTIVAL ============ */}
      <section className="kt-festival">
        <div className="kt-fest-kasavu" aria-hidden="true" />
        <div className="container kt-fest-inner">
          <div className="kt-fest-copy kt-reveal">
            <div className="kt-fest-badge">
              <Flame size={14} />
              <span>{lang === 'en' ? 'Grand Annual Mahotsavam' : 'വാർഷിക ഭരണി മഹോത്സവം'}</span>
            </div>

            <h2 className={`kt-fest-title ${lang === 'ml' ? 'text-malayalam' : ''}`}>
              {lang === 'en' ? (
                <>Annual <em>Bharani Mahotsavam</em></>
              ) : (
                <>ഭരണി മഹോത്സവം</>
              )}
            </h2>

            <p className="kt-fest-subtitle">
              {lang === 'en'
                ? 'Kumbham / Meenam · Thalappoli, Chenda Melam & Midnight Guruthi'
                : 'കുംഭം / മീനം · താലപ്പൊലി, ചെണ്ടമേളം & അർദ്ധരാത്രി ഗുരുതി'}
            </p>

            <div className="kt-fest-count">
              {[
                { val: timeLeft.days, unit: lang === 'en' ? 'Days' : 'ദിവസം' },
                { val: String(timeLeft.hours).padStart(2, '0'), unit: lang === 'en' ? 'Hours' : 'മണിക്കൂർ' },
                { val: String(timeLeft.minutes).padStart(2, '0'), unit: lang === 'en' ? 'Mins' : 'മിനിറ്റ്' },
                { val: String(timeLeft.seconds).padStart(2, '0'), unit: lang === 'en' ? 'Secs' : 'സെക്കൻഡ്' }
              ].map((cd, i) => (
                <React.Fragment key={i}>
                  <div className="kt-cd-tile">
                    <strong>{cd.val}</strong>
                    <span>{cd.unit}</span>
                  </div>
                  {i < 3 && <span className="kt-cd-sep">:</span>}
                </React.Fragment>
              ))}
            </div>

            <p className="kt-fest-text">{t('festivalHomeSummary')}</p>

            <ul className="kt-fest-points">
              <li>{lang === 'en' ? 'Pongala Mahotsavam' : 'പൊങ്കാല മഹോത്സവം'}</li>
              <li>{lang === 'en' ? 'Traditional Melam' : 'പഞ്ചവാദ്യം & മേളം'}</li>
              <li>{lang === 'en' ? 'Thalappoli Procession' : 'താലപ്പൊലി ഘോഷയാത്ര'}</li>
              <li>{lang === 'en' ? 'Midnight Guruthi' : 'അർദ്ധരാത്രി ഗുരുതി'}</li>
            </ul>

            <div className="kt-fest-actions">
              <button className="kt-btn kt-btn-gold" onClick={() => onNavigate('festivals')}>
                <Calendar size={16} />
                <span>{t('viewFestivalSchedule')}</span>
              </button>
              <button className="kt-btn kt-btn-ghost" onClick={onOpenDonation}>
                <HeartHandshake size={16} />
                <span>{t('festivalDonate')}</span>
              </button>
            </div>
          </div>

          <div className="kt-fest-media kt-reveal">
            <img src="/images/festival-pongala.jpg" alt={lang === 'en' ? 'Bharani Mahotsavam' : 'ഭരണി മഹോത്സവം'} />
            <span className="kt-fest-caption">
              {lang === 'en' ? 'The grand festival of Thurayilkunnu' : 'തുറയിൽക്കുന്നിലെ മഹോത്സവം'}
            </span>
            <span className="kt-fest-frame-kasavu" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ============ ANNADANAM ============ */}
      <section className="kt-annadanam">
        <div className="container">
          <div className="kt-ann-card kt-reveal">
            <div className="kt-ann-ic"><HeartHandshake size={30} /></div>
            <div className="kt-ann-copy">
              <span className="kt-ann-eyebrow">{t('annadanamLabel')}</span>
              <h3 className={`kt-ann-title ${lang === 'ml' ? 'text-malayalam' : ''}`}>
                {lang === 'en' ? 'Annadanam Mahādānam · Sacred Food Offering' : 'അന്നദാനം മഹാദാനം'}
              </h3>
              <p className="kt-ann-desc">{t('annadanamDesc')}</p>
              <div className="kt-ann-progress">
                <div className="kt-ann-progress-head">
                  <span>
                    {lang === 'en' ? "Today's Sponsorship: 290 / 350 Meals" : 'ഇന്നത്തെ അന്നദാനം: 290 / 350 പേർ'}
                  </span>
                  <strong>83%</strong>
                </div>
                <div className="kt-ann-track">
                  <div className="kt-ann-fill" style={{ width: '83%' }} />
                </div>
              </div>
            </div>
            <div className="kt-ann-cta">
              <button className="kt-btn kt-btn-gold" onClick={onOpenDonation}>
                <HeartHandshake size={17} />
                <span>{t('donateNow')}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="kt-testimonials">
        <div className="container">
          <div className="kt-head kt-reveal">
            <div className="kt-eyebrow">
              <span className="kt-rule" />
              <span>{lang === 'en' ? 'Devotee Experiences' : 'ഭക്തജന അനുഭവങ്ങൾ'}</span>
            </div>
            <h2 className={`kt-title ${lang === 'ml' ? 'text-malayalam' : ''}`}>
              {lang === 'en' ? (
                <>Testimonies of <em>Divine Grace</em></>
              ) : (
                <>ഭഗവതിയുടെ കൃപാകടാക്ഷം</>
              )}
            </h2>
          </div>

          <div className="kt-testi-grid">
            {testimonials.map((item, idx) => (
              <article key={idx} className="kt-testi-card kt-reveal">
                <div className="kt-testi-top">
                  <span className="kt-testi-ic"><Quote size={20} /></span>
                  <div className="kt-testi-stars">
                    {Array.from({ length: item.rating }).map((_, s) => (
                      <Star key={s} size={14} className="filled" />
                    ))}
                  </div>
                </div>
                <p className="kt-testi-quote">"{lang === 'en' ? item.quoteEn : item.quoteMl}"</p>
                <div className="kt-testi-foot">
                  <span className="kt-testi-avatar">{item.name.charAt(0)}</span>
                  <span className="kt-testi-who">
                    <strong>{item.name}</strong>
                    <span>
                      <MapPin size={12} />
                      {item.location} · <em>{item.offering}</em>
                    </span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ESSENTIALS ============ */}
      <section className="kt-essentials">
        <div className="container">
          <div className="kt-head kt-reveal">
            <div className="kt-eyebrow">
              <span className="kt-rule" />
              <span>{lang === 'en' ? 'Pilgrimage Essentials' : 'തീർത്ഥാടന വഴികാട്ടി'}</span>
            </div>
            <h2 className={`kt-title ${lang === 'ml' ? 'text-malayalam' : ''}`}>
              {lang === 'en' ? (
                <>Plan Your <em>Sacred Visit</em></>
              ) : (
                <>ക്ഷേത്ര ദർശന വിവരങ്ങൾ</>
              )}
            </h2>
          </div>

          <div className="kt-essentials-grid">
            {essentials.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`kt-essential-card kt-reveal ${item.id === 'kanikka' ? 'wine' : ''}`}
                  onClick={() => (item.id === 'kanikka' ? onOpenDonation() : onNavigate(item.id))}
                >
                  <span className="kt-essential-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="kt-essential-ic"><Icon size={21} /></span>
                  <span className="kt-essential-title">
                    {lang === 'en' ? item.titleEn : item.titleMl}
                  </span>
                  <span className="kt-essential-desc">
                    {lang === 'en' ? item.descEn : item.descMl}
                  </span>
                  <span className="kt-essential-cta">
                    <span>{lang === 'en' ? item.ctaEn : item.ctaMl}</span>
                    <ArrowRight size={14} />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
