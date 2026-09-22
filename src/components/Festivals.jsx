import React, { useState, useEffect } from 'react';
import { festivals } from '../data/templeData';
import { Sparkles, Calendar, Flame, Clock } from 'lucide-react';

export function Festivals({ onOpenDonation }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown to next Bharani Mahotsavam
  useEffect(() => {
    // Bharani festival target
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
        setTimeLeft({ days: 12, hours: 8, minutes: 45, seconds: 30 }); // Graceful fallback
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="festivals" className="section-padding festivals-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">
            <Flame size={15} /> ഉത്സവ മഹോത്സവങ്ങൾ • Sacred Festivals
          </span>
          <h2 className="section-title">ക്ഷേത്രോത്സവങ്ങൾ & വിശേഷങ്ങൾ</h2>
          <h3 className="section-title-ml">Annual Festivals & Celebrations</h3>
          <div className="section-divider">
            <div className="section-divider-line"></div>
            <img src="/lamp-icon.svg" alt="Lamp" width="22" height="22" />
            <div className="section-divider-line"></div>
          </div>
          <p className="section-desc">
            Experience the divine fervor, traditional temple percussion, and sacred rituals during the holy festivals celebrated with grand devotion at Bharanatheril Temple.
          </p>
        </div>

        {/* Grand Festival Countdown Hero Card */}
        <div className="festival-countdown-card kasavu-border-card">
          <div className="countdown-card-bg">
            <img 
              src="/images/festival-pongala.jpg" 
              alt="Bharanatheril Pongala Mahotsavam" 
              className="countdown-bg-image" 
            />
            <div className="countdown-overlay"></div>
          </div>

          <div className="countdown-card-content">
            <div className="countdown-header">
              <span className="festival-badge">
                <Sparkles size={14} /> പ്രധാന വാർഷിക ഉത്സവം (Grand Annual Mahotsavam)
              </span>
              <h3 className="countdown-festival-title-ml text-malayalam">
                കുംഭ / മീന ഭരണി മഹോത്സവം & മഹാ പൊങ്കാല
              </h3>
              <h4 className="countdown-festival-title-en">
                Bharani Mahotsavam & Maha Pongala Festival
              </h4>
              <p className="countdown-location">തുറയിൽക്കുന്ന് ശ്രീ ഭദ്ര ഭഗവതി ക്ഷേത്രം, കരുനാഗപ്പള്ളി</p>
            </div>

            {/* Countdown Clock Grid */}
            <div className="countdown-timer-grid">
              <div className="timer-box">
                <span className="timer-number">{timeLeft.days}</span>
                <span className="timer-label">ദിവസങ്ങൾ (Days)</span>
              </div>
              <div className="timer-box">
                <span className="timer-number">{timeLeft.hours}</span>
                <span className="timer-label">മണിക്കൂറുകൾ (Hours)</span>
              </div>
              <div className="timer-box">
                <span className="timer-number">{timeLeft.minutes}</span>
                <span className="timer-label">മിനിറ്റുകൾ (Mins)</span>
              </div>
              <div className="timer-box">
                <span className="timer-number">{timeLeft.seconds}</span>
                <span className="timer-label">സെക്കൻഡുകൾ (Secs)</span>
              </div>
            </div>

            <div className="countdown-action-row">
              <button 
                className="btn-gold"
                onClick={onOpenDonation}
              >
                <Sparkles size={16} />
                <span>ഉത്സവ ഫണ്ടിലേക്ക് സംഭാവന നൽകുക (Festival Fund)</span>
              </button>
            </div>
          </div>
        </div>

        {/* All Festivals Cards Grid */}
        <div className="festivals-grid">
          {festivals.map((fest) => (
            <div key={fest.id} className="festival-item-card kasavu-border-card">
              <div className="fest-header">
                <span className="fest-month-tag">
                  <Calendar size={13} /> {fest.month}
                </span>
              </div>
              <h4 className="fest-title-ml text-malayalam">{fest.titleMl}</h4>
              <h5 className="fest-title-en">{fest.titleEn}</h5>

              <div className="fest-highlight-pill">
                <Sparkles size={13} className="text-gold" />
                <span>{fest.highlight}</span>
              </div>

              <p className="fest-desc">{fest.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
