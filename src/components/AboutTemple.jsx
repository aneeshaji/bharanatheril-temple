import React from 'react';
import { templeInfo, templeHistory } from '../data/templeData';
import { Shield, Sparkles, Building, Users } from 'lucide-react';

export function AboutTemple() {
  return (
    <section id="about" className="section-padding about-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">
            <Sparkles size={15} /> ചരിത്രവും മാഹാത്മ്യവും • Heritage & Glory
          </span>
          <h2 className="section-title">ക്ഷേത്ര ചരിത്രം & സവിശേഷതകൾ</h2>
          <h3 className="section-title-ml">Sacred Abode of Bharanatheril Amma</h3>
          <div className="section-divider">
            <div className="section-divider-line"></div>
            <img src="/lamp-icon.svg" alt="Lamp" width="22" height="22" />
            <div className="section-divider-line"></div>
          </div>
          <p className="section-desc">
            Nestled upon the sacred terrain of Thurayilkunnu in Karunagappally, Bharanatheril Sree Bhadra Bhagavathy Temple radiates spiritual energy and divine motherly benevolence.
          </p>
        </div>

        <div className="about-main-grid">
          {/* Left Text Narrative */}
          <div className="about-text-col">
            <div className="about-story-card kasavu-border-card">
              <h4 className="about-subtitle-ml text-malayalam">
                തുറയിൽക്കുന്നിലെ ദിവ്യ സാന്നിധ്യം (The Divine Presence)
              </h4>
              <p className="about-paragraph">{templeHistory.summary}</p>
              <p className="about-paragraph">{templeHistory.lore}</p>
              <p className="about-paragraph">{templeHistory.architecture}</p>

              <div className="about-highlights-grid">
                <div className="highlight-pill-item">
                  <Shield size={20} className="text-gold" />
                  <div>
                    <h6>സർവ്വ രക്ഷാ കവചം</h6>
                    <small>Protection from distress & fears</small>
                  </div>
                </div>

                <div className="highlight-pill-item">
                  <Building size={20} className="text-gold" />
                  <div>
                    <h6>പരമ്പരാഗത തച്ചുശാസ്ത്രം</h6>
                    <small>Kerala Vastu Architecture</small>
                  </div>
                </div>

                <div className="highlight-pill-item">
                  <Sparkles size={20} className="text-gold" />
                  <div>
                    <h6>പവിത്രമായ സർപ്പക്കാവ്</h6>
                    <small>Ancient Sacred Serpent Grove</small>
                  </div>
                </div>

                <div className="highlight-pill-item">
                  <Users size={20} className="text-gold" />
                  <div>
                    <h6>നിത്യ അന്നദാന പാരമ്പര്യം</h6>
                    <small>Sacred Prasada Oottu</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="about-image-col">
            <div className="about-image-frame kasavu-border-card">
              <img 
                src="/images/temple-exterior.jpg" 
                alt="Bharanatheril Temple Architecture" 
                className="about-temple-image"
              />
              <div className="about-image-caption">
                <span className="caption-tag">തുറയിൽക്കുന്ന് സന്നിധി</span>
                <p>Traditional Chuttambalam illuminated with twilight oil lamps</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
