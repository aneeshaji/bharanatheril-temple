import React, { useState } from 'react';
import { templeInfo, travelGuide } from '../data/templeData';
import { MapPin, Phone, Mail, Clock, Train, Bus, Navigation, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export function ContactLocation() {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Enquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.7 }
    });
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">
            <Navigation size={15} /> വഴികാട്ടിയും ബന്ധപ്പെടലും • Reach Us
          </span>
          <h2 className="section-title">ക്ഷേത്രത്തിലേക്ക് എങ്ങനെ എത്തിച്ചേരാം?</h2>
          <h3 className="section-title-ml">Location & Devotee Helpdesk</h3>
          <div className="section-divider">
            <div className="section-divider-line"></div>
            <img src="/lamp-icon.svg" alt="Lamp" width="22" height="22" />
            <div className="section-divider-line"></div>
          </div>
          <p className="section-desc">
            Bharanatheril Sree Bhadra Bhagavathy Temple is conveniently located at Thurayilkunnu, easily accessible from Karunagappally town center and NH 66.
          </p>
        </div>

        <div className="contact-main-grid">
          {/* Left Column: Address & How to Reach */}
          <div className="contact-info-col">
            <div className="contact-details-card kasavu-border-card">
              <h4 className="contact-card-title text-malayalam">ക്ഷേത്ര വിലാസം (Temple Address)</h4>
              
              <div className="contact-info-item">
                <MapPin size={22} className="contact-icon text-gold" />
                <div>
                  <strong>{templeInfo.nameEn}</strong>
                  <p className="text-malayalam">{templeInfo.nameMl}</p>
                  <p>{templeInfo.location}</p>
                </div>
              </div>

              <div className="contact-info-item">
                <Phone size={20} className="contact-icon text-gold" />
                <div>
                  <strong>ഫോൺ നമ്പറുകൾ (Helpline):</strong>
                  <p>{templeInfo.phone}</p>
                </div>
              </div>

              <div className="contact-info-item">
                <Mail size={20} className="contact-icon text-gold" />
                <div>
                  <strong>ഇമെയിൽ വിലാസം (Email):</strong>
                  <p>{templeInfo.email}</p>
                </div>
              </div>

              <div className="contact-info-item">
                <Clock size={20} className="contact-icon text-gold" />
                <div>
                  <strong>ഓഫീസ് സമയം (Office Timings):</strong>
                  <p>{templeInfo.officeHours}</p>
                </div>
              </div>
            </div>

            {/* Travel Directions Card */}
            <div className="travel-guide-card kasavu-border-card">
              <h4 className="travel-card-title text-malayalam">യാത്രാ മാർഗ്ഗങ്ങൾ (Travel Guide)</h4>

              <div className="travel-route-item">
                <Train size={18} className="text-gold" />
                <div>
                  <strong>റെയിൽവേ സ്റ്റേഷൻ (Railway):</strong>
                  <p>{travelGuide.nearestRailway}</p>
                </div>
              </div>

              <div className="travel-route-item">
                <Bus size={18} className="text-gold" />
                <div>
                  <strong>കെ.എസ്.ആർ.ടി.സി ബസ് സ്റ്റാൻഡ് (Bus Stand):</strong>
                  <p>{travelGuide.nearestBusStand}</p>
                </div>
              </div>

              <div className="travel-route-item">
                <Navigation size={18} className="text-gold" />
                <div>
                  <strong>ദേശീയപാത (Highway):</strong>
                  <p>{travelGuide.nearestHighway}</p>
                </div>
              </div>

              <div className="directions-note">
                <p><strong>Note:</strong> {travelGuide.directions}</p>
              </div>

              <a 
                href="https://maps.google.com/?q=Karunagappally+Thurayilkunnu+Kerala" 
                target="_blank" 
                rel="noreferrer"
                className="btn-outline-gold map-link-btn"
              >
                <MapPin size={16} />
                <span>Google Maps-ൽ കാണുക (Open in Maps)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Devotee Enquiry / Prayer Form */}
          <div className="contact-form-col">
            <div className="enquiry-form-card kasavu-border-card">
              <h4 className="enquiry-title-ml text-malayalam">ഭക്തജന അന്വേഷണങ്ങൾ & പ്രാർത്ഥനാ സന്ദേശങ്ങൾ</h4>
              <p className="enquiry-sub">Send your spiritual enquiries, pooja booking queries, or festival feedback.</p>

              {!formSent ? (
                <form onSubmit={handleSubmit} className="enquiry-form">
                  <div className="form-group">
                    <label className="form-label">പേര് (Your Name) *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">ഫോൺ നമ്പർ (Mobile Number) *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email ID</label>
                      <input 
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">വിഷയം (Subject)</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="form-input"
                    >
                      <option value="General Enquiry">General Enquiry (പൊതുവായ കാര്യങ്ങൾ)</option>
                      <option value="Special Pooja Booking">Special Pooja Booking (പ്രത്യേക പൂജകൾ)</option>
                      <option value="Festival Thalappoli">Festival / Thalappoli Registration</option>
                      <option value="Annadanam Offering">Annadanam Offering (അന്നദാനം)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">സന്ദേശം / പ്രാർത്ഥന (Your Message) *</label>
                    <textarea 
                      rows="4"
                      required
                      placeholder="Write your message or prayer here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="form-input"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-gold form-submit-btn">
                    <Send size={16} />
                    <span>സന്ദേശം അയക്കുക (Submit Message)</span>
                  </button>
                </form>
              ) : (
                <div className="enquiry-success-box">
                  <CheckCircle2 size={44} className="text-gold success-icon-large" />
                  <h4 className="text-malayalam">നന്ദി! നിങ്ങളുടെ സന്ദേശം ലഭിച്ചു.</h4>
                  <p>
                    Temple committee officials will respond to your contact details promptly. May Sree Bhadra Bhagavathy bless you and your family with health and prosperity.
                  </p>
                  <button 
                    className="btn-secondary mt-3"
                    onClick={() => {
                      setFormSent(false);
                      setFormData({ name: '', phone: '', email: '', subject: 'General Enquiry', message: '' });
                    }}
                  >
                    മറ്റൊരു സന്ദേശം അയക്കുക (Send Another Message)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
