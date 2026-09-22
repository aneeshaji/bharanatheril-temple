import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/PageHeader';
import { darshanSchedule } from '../data/templeData';
import { 
  Clock, 
  Sun, 
  Moon, 
  Flame, 
  Sparkles, 
  Calendar, 
  Bell, 
  CheckCircle,
  ArrowRight 
} from 'lucide-react';
import { playTempleBell } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

export function DarshanPage({ onNavigate }) {
  const { lang, t } = useLanguage();
  const [isTempleOpen, setIsTempleOpen] = useState(true);
  const [currentPooja, setCurrentPooja] = useState('');
  const [timeUntilNext, setTimeUntilNext] = useState('');

  useEffect(() => {
    const evaluateTimings = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const istDate = new Date(utc + (3600000 * 5.5));
      const hours = istDate.getHours();
      const minutes = istDate.getMinutes();
      const totalMins = hours * 60 + minutes;

      // Morning: 5:30 (330) to 11:00 (660)
      // Evening: 17:00 (1020) to 20:00 (1200)
      const morningOpen = totalMins >= 330 && totalMins <= 660;
      const eveningOpen = totalMins >= 1020 && totalMins <= 1200;

      setIsTempleOpen(morningOpen || eveningOpen);

      if (morningOpen) {
        const remaining = 660 - totalMins;
        const remH = Math.floor(remaining / 60);
        const remM = remaining % 60;
        setTimeUntilNext(lang === 'en'
          ? `Sanctum closes for afternoon in ${remH > 0 ? `${remH}h ` : ''}${remM}m`
          : `ഉച്ചയ്ക്ക് നട അടയ്ക്കാൻ ${remH > 0 ? `${remH} മണിക്കൂർ ` : ''}${remM} മിനിറ്റ് ബാക്കി`);
      } else if (eveningOpen) {
        const remaining = 1200 - totalMins;
        const remH = Math.floor(remaining / 60);
        const remM = remaining % 60;
        setTimeUntilNext(lang === 'en'
          ? `Sanctum closes for night in ${remH > 0 ? `${remH}h ` : ''}${remM}m`
          : `രാത്രി നട അടയ്ക്കാൻ ${remH > 0 ? `${remH} മണിക്കൂർ ` : ''}${remM} മിനിറ്റ് ബാക്കി`);
      } else if (totalMins < 330) {
        const remaining = 330 - totalMins;
        const remH = Math.floor(remaining / 60);
        const remM = remaining % 60;
        setTimeUntilNext(lang === 'en'
          ? `Morning sanctum opens in ${remH > 0 ? `${remH}h ` : ''}${remM}m (Opens at 5:30 AM)`
          : `പ്രഭാത നട തുറക്കാൻ ${remH > 0 ? `${remH} മണിക്കൂർ ` : ''}${remM} മിനിറ്റ് ബാക്കി (5:30 AM)`);
      } else if (totalMins > 660 && totalMins < 1020) {
        const remaining = 1020 - totalMins;
        const remH = Math.floor(remaining / 60);
        const remM = remaining % 60;
        setTimeUntilNext(lang === 'en'
          ? `Evening sanctum opens in ${remH > 0 ? `${remH}h ` : ''}${remM}m (Opens at 5:00 PM)`
          : `സന്ധ്യാ നട തുറക്കാൻ ${remH > 0 ? `${remH} മണിക്കൂർ ` : ''}${remM} മിനിറ്റ് ബാക്കി (5:00 PM)`);
      } else {
        setTimeUntilNext(lang === 'en'
          ? 'Sanctum opens tomorrow morning at 5:30 AM'
          : 'പ്രഭാത നട നാളെ രാവിലെ 5:30 ന് തുറക്കും');
      }
    };

    evaluateTimings();
    const interval = setInterval(evaluateTimings, 30000);
    return () => clearInterval(interval);
  }, [lang]);

  const specialDays = [
    {
      titleMl: "ഭരണി നക്ഷത്രം",
      titleEn: "Bharani Nakshathram (Every Month)",
      descEn: "Sacred monthly birth star of Devi. Special Pongala, continuous pushpanjali, and deeparadhana.",
      descMl: "ദേവിയുടെ പുണ്യ ജന്മനക്ഷത്രം. പ്രത്യേക പൊങ്കാല, നിരന്തര പുഷ്പാഞ്ജലി, ദീപാരാധന.",
      timingEn: "Morning 5:00 AM – 12:00 PM & 4:30 PM – 8:30 PM",
      timingMl: "രാവിലെ 5:00 AM – 12:00 PM & വൈകുന്നേരം 4:30 PM – 8:30 PM"
    },
    {
      titleMl: "ചൊവ്വ & വെള്ളി ദിവസങ്ങൾ",
      titleEn: "Tuesdays & Fridays",
      descEn: "Most propitious days for Shakta worship. Grand Bhagavathy Seva at dusk, Naranga Vilakku lighting, and Lalitha Sahasranama archana.",
      descMl: "ശാക്തേയ ആരാധനയിലെ അതിവിശേഷ ദിനങ്ങൾ. സന്ധ്യാ ഭഗവതി സേവ, നാരങ്ങാ വിളക്ക്, ലളിതാ സഹസ്രനാമാർച്ചന.",
      timingEn: "Special Sandhya Pooja at 6:30 PM",
      timingMl: "പ്രത്യേക സന്ധ്യാ പൂജ വൈകുന്നേരം 6:30 PM"
    },
    {
      titleMl: "ആയില്യം നക്ഷത്രം (സർപ്പക്കാവ്)",
      titleEn: "Ayilyam Nakshathram (Serpent Grove)",
      descEn: "Sacred day of serpent deities. Noorum Palum, Manjal Podi Charthal, and Pulluvan Pattu at Sarpa Kavu.",
      descMl: "നാഗദൈവങ്ങളുടെ പുണ്യദിനം. സർപ്പക്കാവിൽ നൂറും പാലും, മഞ്ഞൾപ്പൊടി ചാർത്തൽ, പുള്ളുവൻ പാട്ട്.",
      timingEn: "Morning 8:30 AM – 11:00 AM",
      timingMl: "രാവിലെ 8:30 AM – 11:00 AM"
    },
    {
      titleMl: "അമാവാസി & പൗർണ്ണമി",
      titleEn: "Amavasi & Pournami",
      descEn: "Auspicious new moon and full moon rituals, special Payasa nivedyams and Chuttuvilakku illumination.",
      descMl: "പുണ്യ അമാവാസി, പൗർണ്ണമി ചടങ്ങുകൾ, പ്രത്യേക പായസ നിവേദ്യങ്ങൾ, ചുറ്റുവിളക്ക് ദർശനം.",
      timingEn: "Full Day Observance",
      timingMl: "മുഴുവൻ ദിവസത്തെയും വിശേഷാൽ ചടങ്ങുകൾ"
    }
  ];

  return (
    <div className="inner-page-view darshan-page">
      <PageHeader 
        titleEn="Darshan Timings & Pooja Schedule"
        titleMl="ദർശന സമയവും പൂജാക്രമങ്ങളും"
        subtitle={lang === 'en'
          ? "Daily ritual calendar, sanctum timings, deeparadhana, and special day poojas at Bharanatheril Temple"
          : "ഭരണത്തേരിൽ ക്ഷേത്രത്തിലെ നിത്യ പൂജാക്രമങ്ങളും ദർശന സമയങ്ങളും വിശേഷാൽ പൂജകളും"}
        breadcrumb={lang === 'en' ? "Darshan Timings" : "ദർശന സമയം"}
        onNavigate={onNavigate}
      />

      <div className="container inner-page-container">
        {/* Realtime Live Status Hero Banner */}
        <div className="darshan-status-card kasavu-border-card">
          <div className="darshan-status-inner">
            <div className="status-indicator-badge">
              <span className={`status-pill ${isTempleOpen ? 'open' : 'closed'}`}>
                <span className="status-indicator-dot"></span>
                {isTempleOpen ? t('templeOpen') : t('templeClosed')}
              </span>
            </div>

            <div className="status-detail">
              <h3 className={`status-title ${lang === 'ml' ? 'text-malayalam' : ''}`}>
                {isTempleOpen ? t('darshanAvailable') : t('nextDarshanSoon')}
              </h3>
              <p className="status-time-left">
                <Clock size={16} />
                <span>{timeUntilNext}</span>
              </p>
            </div>

            <div className="status-action">
              <button 
                className="bell-chime-btn-lg"
                onClick={() => playTempleBell(1.0)}
                title="Ring Sacred Bell"
              >
                <Bell size={18} className="animate-wiggle" />
                <span>{t('ringBell')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Morning & Evening Pooja Schedules */}
        <div className="darshan-sessions-grid">
          {darshanSchedule.map((session, idx) => (
            <div key={idx} className="session-card kasavu-border-card">
              <div className="session-header">
                <div className="session-icon">
                  {idx === 0 ? <Sun size={26} className="text-gold" /> : <Moon size={26} className="text-gold" />}
                </div>
                <div>
                  <h3 className={`session-title ${lang === 'ml' ? 'text-malayalam' : ''}`}>
                    {lang === 'ml' ? (session.sessionMl || session.session) : (session.sessionEn || session.session)}
                  </h3>
                  <div className="session-time-badge">
                    <Clock size={14} />
                    <span>{session.timings}</span>
                  </div>
                </div>
              </div>

              <div className="session-events-list">
                {session.events.map((evt, eIdx) => (
                  <div key={eIdx} className="event-item">
                    <div className="event-time">{evt.time}</div>
                    <div className="event-marker">
                      <div className="marker-dot"></div>
                      {eIdx !== session.events.length - 1 && <div className="marker-line"></div>}
                    </div>
                    <div className="event-details">
                      <h4 className={lang === 'ml' ? "event-name-ml text-malayalam" : "event-name-en"}>
                        {lang === 'en' ? evt.nameEn : evt.nameMl}
                      </h4>
                      <p className="event-desc">{lang === 'ml' ? (evt.descMl || evt.desc) : evt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Special Days & Observances */}
        <div className="special-days-section">
          <div className="section-header">
            <span className="section-eyebrow">
              <Calendar size={14} /> {t('monthlyObservances')}
            </span>
            <h3 className={`section-title ${lang === 'ml' ? 'text-malayalam' : ''}`}>{t('specialPoojasDays')}</h3>
            <div className="section-divider">
              <div className="section-divider-line"></div>
              <img src="/lamp-icon.svg" alt="Lamp" width="22" height="22" />
              <div className="section-divider-line"></div>
            </div>
          </div>

          <div className="special-days-grid">
            {specialDays.map((sd, i) => (
              <div key={i} className="special-day-card kasavu-border-card">
                <div className="sd-header">
                  <Flame size={20} className="text-gold" />
                  <div>
                    <h5 className={lang === 'ml' ? 'text-malayalam' : ''}>
                      {lang === 'en' ? sd.titleEn : sd.titleMl}
                    </h5>
                  </div>
                </div>
                <p className="sd-desc">{lang === 'ml' ? sd.descMl : sd.descEn}</p>
                <div className="sd-timing">
                  <Clock size={13} />
                  <span>{lang === 'ml' ? sd.timingMl : sd.timingEn}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Booking CTA */}
        <div className="darshan-booking-cta kasavu-border-card">
          <div className="cta-flex">
            <div>
              <h3 className={lang === 'ml' ? 'text-malayalam' : ''}>{t('bookSpecialPoojaBirthStar')}</h3>
              <p>{t('bookSpecialPoojaDesc')}</p>
            </div>
            <button className="btn-primary" onClick={() => onNavigate('vazhipadu')}>
              <Sparkles size={16} />
              <span>{t('bookVazhipaduFull')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
