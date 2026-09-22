import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { templeInfo, travelGuide } from '../data/templeData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Navigation, 
  Train, 
  Bus, 
  Plane, 
  Send, 
  CheckCircle2, 
  Compass,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function ContactPage({ onNavigate }) {
  const { lang, t } = useLanguage();
  const [formSent, setFormSent] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setContactData({ name: '', phone: '', email: '', subject: '', message: '' });
      setFormSent(false);
    }, 4000);
  };

  return (
    <div className="inner-page-view contact-page">
      <PageHeader 
        titleEn="Pilgrimage Guide & Contact"
        titleMl="ക്ഷേത്ര ദർശന വഴികാട്ടിയും ബന്ധപ്പെടാനുള്ള വിവരങ്ങളും"
        subtitle={lang === 'en' ? 'How to reach Bharanatheril Temple at Thurayilkunnu, Karunagappally, office timings, and devotee enquiries' : 'തുറയിൽകുന്ന് ഭരണത്തേരിൽ ക്ഷേത്രത്തിലേക്കുള്ള യാത്രാമാർഗ്ഗങ്ങൾ, ഓഫീസ് സമയം, ഭക്തജന അന്വേഷണങ്ങൾ'}
        breadcrumb={lang === 'en' ? 'Contact & Route' : 'വഴികാട്ടിയും വിവരങ്ങളും'}
        onNavigate={onNavigate}
      />

      <div className="container inner-page-container">
        {/* Contact Info Overview Cards */}
        <div className="contact-overview-grid">
          <div className="contact-info-card kasavu-border-card">
            <div className="contact-icon-circle">
              <MapPin size={22} className="text-gold" />
            </div>
            <h4>{lang === 'en' ? 'Temple Location' : 'ക്ഷേത്ര സന്നിധി'}</h4>
            <p className="contact-card-text">{templeInfo.location}</p>
          </div>

          <div className="contact-info-card kasavu-border-card">
            <div className="contact-icon-circle">
              <Phone size={22} className="text-gold" />
            </div>
            <h4>{lang === 'en' ? 'Helpline Numbers' : 'ഫോൺ നമ്പർ'}</h4>
            <p className="contact-card-text">{templeInfo.phone}</p>
          </div>

          <div className="contact-info-card kasavu-border-card">
            <div className="contact-icon-circle">
              <Mail size={22} className="text-gold" />
            </div>
            <h4>{lang === 'en' ? 'Email Address' : 'ഇമെയിൽ വിലാസം'}</h4>
            <p className="contact-card-text">{templeInfo.email}</p>
          </div>

          <div className="contact-info-card kasavu-border-card">
            <div className="contact-icon-circle">
              <Clock size={22} className="text-gold" />
            </div>
            <h4>{lang === 'en' ? 'Office Hours' : 'ഓഫീസ് സമയം'}</h4>
            <p className="contact-card-text">{templeInfo.officeHours}</p>
          </div>
        </div>

        {/* Travel Guide: How to reach */}
        <div className="pilgrimage-travel-section">
          <div className="section-header">
            <span className="section-eyebrow">
              <Compass size={14} /> {lang === 'en' ? 'Pilgrimage Route Guide' : 'തീർത്ഥാടന വഴികാട്ടി'}
            </span>
            <h3 className={`section-title ${lang === 'ml' ? 'text-malayalam' : ''}`}>
              {lang === 'en' ? 'How to Reach Bharanatheril Temple' : 'ക്ഷേത്രത്തിൽ എങ്ങനെ എത്തിച്ചേരാം?'}
            </h3>
            <div className="section-divider">
              <div className="section-divider-line"></div>
              <img src="/lamp-icon.svg" alt="Lamp" width="22" height="22" />
              <div className="section-divider-line"></div>
            </div>
            <p className="section-desc">
              {lang === 'en' 
                ? 'Conveniently located near NH 66 in Karunagappally, Kollam district, with seamless rail and road connectivity from across Kerala.' 
                : 'കൊല്ലം ജില്ലയിലെ കരുനാഗപ്പള്ളിയിൽ ദേശീയപാത 66-ന് സമീപം സ്ഥിതിചെയ്യുന്ന ക്ഷേത്രത്തിലേക്ക് റോഡ്, റെയിൽ മാർഗ്ഗങ്ങളിൽ എളുപ്പത്തിൽ എത്തിച്ചേരാം.'}
            </p>
          </div>

          <div className="travel-modes-grid">
            <div className="travel-mode-card kasavu-border-card">
              <Train size={28} className="text-gold" />
              <div className="mode-details">
                <span className="mode-label">{lang === 'en' ? 'By Train' : 'ട്രെയിൻ മാർഗ്ഗം'}</span>
                <h5>{travelGuide.nearestRailway}</h5>
                <p>
                  {lang === 'en'
                    ? 'All major express trains halt at Karunagappally. Auto-rickshaws and taxis are available round-the-clock.'
                    : 'എല്ലാ പ്രധാന എക്സ്പ്രസ് ട്രെയിനുകൾക്കും കരുനാഗപ്പള്ളിയിൽ സ്റ്റോപ്പുണ്ട്. റെയിൽവേ സ്റ്റേഷനിൽ നിന്ന് ഓട്ടോ, ടാക്സി സൗകര്യം ലഭ്യമാണ്.'}
                </p>
              </div>
            </div>

            <div className="travel-mode-card kasavu-border-card">
              <Bus size={28} className="text-gold" />
              <div className="mode-details">
                <span className="mode-label">{lang === 'en' ? 'By Bus' : 'ബസ്സ് മാർഗ്ഗം'}</span>
                <h5>{travelGuide.nearestBusStand}</h5>
                <p>
                  {lang === 'en'
                    ? 'Regular KSRTC Superfast, Fast Passenger, and local private buses connect Karunagappally to all major cities.'
                    : 'കെ.എസ്.ആർ.ടി.സി സൂപ്പർഫാസ്റ്റ്, ഫാസ്റ്റ് പാസഞ്ചർ ബസുകളും സ്വകാര്യ ബസുകളും കരുനാഗപ്പള്ളി വഴി സർവീസ് നടത്തുന്നു.'}
                </p>
              </div>
            </div>

            <div className="travel-mode-card kasavu-border-card">
              <Navigation size={28} className="text-gold" />
              <div className="mode-details">
                <span className="mode-label">{lang === 'en' ? 'By Road' : 'റോഡ് മാർഗ്ഗം'}</span>
                <h5>{travelGuide.nearestHighway}</h5>
                <p>
                  {lang === 'en'
                    ? 'From NH 66 Karunagappally junction, proceed along the Thurayilkunnu link road directly to the temple gate.'
                    : 'ദേശീയപാത 66 കരുനാഗപ്പള്ളി ജംഗ്ഷനിൽ നിന്ന് തുറയിൽകുന്ന് ലിങ്ക് റോഡ് വഴി നേരിട്ട് ക്ഷേത്ര കവാടത്തിലെത്താം.'}
                </p>
              </div>
            </div>

            <div className="travel-mode-card kasavu-border-card">
              <Plane size={28} className="text-gold" />
              <div className="mode-details">
                <span className="mode-label">{lang === 'en' ? 'By Air' : 'വിമാന മാർഗ്ഗം'}</span>
                <h5>{travelGuide.nearestAirport}</h5>
                <p>
                  {lang === 'en'
                    ? 'Trivandrum International Airport is well connected via NH 66 and train line to Karunagappally.'
                    : 'തിരുവനന്തപുരം അന്താരാഷ്ട്ര വിമാനത്താവളത്തിൽ നിന്ന് ദേശീയപാത 66, ട്രെയിൻ മാർഗ്ഗങ്ങളിലൂടെ കരുനാഗപ്പള്ളിയിലെത്താം.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map and Contact Enquiry Form */}
        <div className="contact-main-grid">
          {/* Interactive Map Card */}
          <div className="contact-map-col">
            <div className="map-frame-card kasavu-border-card">
              <div className="map-frame-header">
                <MapPin size={20} className="text-gold" />
                <div>
                  <h4>{lang === 'en' ? 'Temple Location Map' : 'ക്ഷേത്ര ലൊക്കേഷൻ മാപ്പ്'}</h4>
                  <span>Thurayilkunnu, Karunagappally, Kollam</span>
                </div>
              </div>

              <div className="map-embed-wrapper">
                <iframe 
                  title="Bharanatheril Temple Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15750.31602497672!2d76.5245!3d9.0558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05e0c5c5b16167%3A0x6b9076f8e77c449e!2sKarunagappally%2C%20Kerala!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
                  width="100%" 
                  height="360" 
                  style={{ border: 0, borderRadius: '8px' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="map-route-text">
                <strong>{lang === 'en' ? 'Directions:' : 'വഴികാട്ടി:'}</strong>
                <p>{lang === 'en' ? (travelGuide.directionsEn || travelGuide.directions) : (travelGuide.directionsMl || travelGuide.directions)}</p>
              </div>
            </div>
          </div>

          {/* Devotee Enquiry Form */}
          <div className="contact-form-col">
            <div className="enquiry-card kasavu-border-card">
              <div className="enquiry-header">
                <MessageSquare size={22} className="text-gold" />
                <div>
                  <h3 className={lang === 'ml' ? "text-malayalam" : ""}>
                    {lang === 'en' ? 'Devotee Enquiry / Prayer Request' : 'ഭക്തജന അന്വേഷണങ്ങൾ'}
                  </h3>
                </div>
              </div>

              {formSent ? (
                <div className="enquiry-success-message animated-fade-in">
                  <CheckCircle2 size={36} className="text-green" />
                  <h4>{lang === 'en' ? 'Message Sent Successfully!' : 'സന്ദേശം വിജയകരമായി ലഭിച്ചു!'}</h4>
                  <p>
                    {lang === 'en' 
                      ? 'Thank you for reaching out. The temple office will respond to your enquiry shortly. May Devi bless you.' 
                      : 'നന്ദി. താങ്കളുടെ സന്ദേശത്തിന് ക്ഷേത്ര ഓഫീസിൽ നിന്ന് ഉടൻ മറുപടി നൽകുന്നതാണ്. ഭഗവതിയുടെ അനുഗ്രഹം സദാ ഉണ്ടായിരിക്കട്ടെ.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="enquiry-form">
                  <div className="form-group">
                    <label>{lang === 'en' ? 'Full Name *' : 'പൂർണ്ണ നാമം *'}</label>
                    <input 
                      type="text" 
                      required 
                      placeholder={lang === 'en' ? 'Your name' : 'താങ്കളുടെ പേര്'}
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>{lang === 'en' ? 'Mobile Number *' : 'മൊബൈൽ നമ്പർ *'}</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder={lang === 'en' ? '10-digit number' : '10 അക്ക നമ്പർ'}
                        value={contactData.phone}
                        onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>{lang === 'en' ? 'Email Address' : 'ഇമെയിൽ വിലാസം'}</label>
                      <input 
                        type="email" 
                        placeholder="devotee@example.com"
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>{lang === 'en' ? 'Subject' : 'വിഷയം'}</label>
                    <input 
                      type="text" 
                      placeholder={lang === 'en' ? 'Pooja enquiry / Darshan timing / General enquiry' : 'പൂജ അന്വേഷണം / ദർശന സമയം / പൊതുവിവരം'}
                      value={contactData.subject}
                      onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>{lang === 'en' ? 'Message / Prayer Request *' : 'സന്ദേശം / പ്രാർത്ഥന *'}</label>
                    <textarea 
                      rows="4" 
                      required
                      placeholder={lang === 'en' ? 'Write your questions or prayer request here...' : 'താങ്കളുടെ ചോദ്യങ്ങളോ പ്രാർത്ഥനയോ ഇവിടെ കുറിക്കുക...'}
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-primary full-width">
                    <Send size={16} />
                    <span>{lang === 'en' ? 'Send Enquiry' : 'സന്ദേശം അയക്കുക'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
