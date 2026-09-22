import React, { useState, useEffect } from 'react';
import { Clock, Sun, Moon, Sparkles, CheckCircle2 } from 'lucide-react';
import { darshanSchedule } from '../data/templeData';

export function DarshanTimings() {
  const [activeTab, setActiveTab] = useState(0); // 0: Morning, 1: Evening
  const [currentTimeStr, setCurrentTimeStr] = useState('');
  const [isCurrentlyOpen, setIsCurrentlyOpen] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Calculate IST time (UTC + 5:30)
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const istDate = new Date(utc + (3600000 * 5.5));
      
      const hours = istDate.getHours();
      const minutes = istDate.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      setCurrentTimeStr(`${formattedHours}:${formattedMinutes} ${ampm} IST`);

      const totalMins = hours * 60 + minutes;
      const morningOpen = totalMins >= 330 && totalMins <= 660;
      const eveningOpen = totalMins >= 1020 && totalMins <= 1200;
      setIsCurrentlyOpen(morningOpen || eveningOpen);

      // Auto switch active tab based on time of day
      if (hours >= 12 && activeTab === 0) {
        // Can remain user selectable, but default smartly
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="timings" className="section-padding timings-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">
            <Clock size={15} /> പൂജാ സമയക്രമം • Daily Schedule
          </span>
          <h2 className="section-title">ദർശന & പൂജാ സമയങ്ങൾ</h2>
          <h3 className="section-title-ml">Daily Darshan & Pooja Timings</h3>
          <div className="section-divider">
            <div className="section-divider-line"></div>
            <img src="/lamp-icon.svg" alt="Lamp" width="22" height="22" />
            <div className="section-divider-line"></div>
          </div>
          <p className="section-desc">
            Devotees are cordially welcomed to experience the sublime divine presence of Devi Bhadrakali at Bharanatheril Temple during the morning and evening sacred darshan hours.
          </p>
        </div>

        {/* Current Live Status Box */}
        <div className="live-status-banner kasavu-border-card">
          <div className="live-status-info">
            <div className="status-badge-wrapper">
              <span className={`status-pill ${isCurrentlyOpen ? 'open' : 'closed'}`}>
                <span className="status-indicator-dot"></span>
                {isCurrentlyOpen ? 'ഇപ്പോൾ നട തുറന്നിരിക്കുന്നു (Nada Currently Open)' : 'ഇപ്പോൾ നട അടച്ചിരിക്കുന്നു (Nada Currently Closed)'}
              </span>
            </div>
            <div className="current-ist-time">
              <Clock size={16} className="text-gold" />
              <span>Current Time: <strong>{currentTimeStr || 'Loading...'}</strong></span>
            </div>
          </div>

          <div className="special-days-tag">
            <Sparkles size={16} className="text-gold" />
            <span>പ്രത്യേക ദർശന ദിനങ്ങൾ: ചൊവ്വ, വെള്ളി, ഞായർ, ഭരണി നക്ഷത്രം, ആയില്യം</span>
          </div>
        </div>

        {/* Tabs: Morning / Evening */}
        <div className="timings-tabs-wrapper">
          <div className="timings-tabs">
            <button 
              className={`timing-tab-btn ${activeTab === 0 ? 'active' : ''}`}
              onClick={() => setActiveTab(0)}
            >
              <Sun size={20} />
              <div className="tab-btn-text">
                <span className="tab-title">പ്രഭാത പൂജകൾ (Morning)</span>
                <span className="tab-sub">05:30 AM – 11:00 AM</span>
              </div>
            </button>

            <button 
              className={`timing-tab-btn ${activeTab === 1 ? 'active' : ''}`}
              onClick={() => setActiveTab(1)}
            >
              <Moon size={20} />
              <div className="tab-btn-text">
                <span className="tab-title">സന്ധ്യാ & രാത്രി പൂജകൾ (Evening)</span>
                <span className="tab-sub">05:00 PM – 08:00 PM</span>
              </div>
            </button>
          </div>
        </div>

        {/* Schedule Timeline Content */}
        <div className="schedule-timeline-container">
          <div className="timeline-card-grid">
            {darshanSchedule[activeTab].events.map((event, idx) => (
              <div key={idx} className="timeline-item kasavu-border-card">
                <div className="timeline-time-col">
                  <span className="timeline-time-badge">{event.time}</span>
                  <span className="timeline-step-num">#{idx + 1}</span>
                </div>
                <div className="timeline-content-col">
                  <h4 className="timeline-event-name-ml text-malayalam">{event.nameMl}</h4>
                  <h5 className="timeline-event-name-en">{event.nameEn}</h5>
                  <p className="timeline-event-desc">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traditional Customary Guidelines */}
        <div className="temple-customs-box">
          <h4 className="customs-heading">
            <CheckCircle2 size={18} className="text-gold" /> ക്ഷേത്ര ആചാര മര്യാദകൾ (Devotee Guidelines)
          </h4>
          <ul className="customs-list">
            <li>ഭക്തർ പരമ്പരാഗത കേരളീയ വസ്ത്രധാരണ രീതി പാലിക്കേണ്ടതാണ് (Men: Dhoti / Mundu, Women: Saree, Set Mundu, Salwar).</li>
            <li>ശ്രീകോവിലിനുള്ളിൽ മൊബൈൽ ഫോൺ ഉപയോഗവും ഫോട്ടോഗ്രാഫിയും അനുവദനീയമല്ല.</li>
            <li>നിർമ്മാല്യ ദർശനത്തിനും ദീപാരാധനയ്ക്കും പ്രത്യേക സവിശേഷ പുണ്യം കൽപ്പിക്കപ്പെടുന്നു.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
