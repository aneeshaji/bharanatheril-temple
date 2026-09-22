import React, { useState } from 'react';
import { deities } from '../data/templeData';
import { Sparkles, Calendar, Award } from 'lucide-react';

export function DeitiesSection({ onSelectDeityForPooja }) {
  const [selectedDeity, setSelectedDeity] = useState(deities[0]);

  return (
    <section id="deities" className="section-padding deities-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">
            <Sparkles size={15} /> പ്രതിഷ്ഠാ മൂർത്തികൾ • Sacred Deities
          </span>
          <h2 className="section-title">ക്ഷേത്രത്തിലെ പ്രതിഷ്ഠകൾ</h2>
          <h3 className="section-title-ml">Presiding Mother & Guardian Deities</h3>
          <div className="section-divider">
            <div className="section-divider-line"></div>
            <img src="/lamp-icon.svg" alt="Lamp" width="22" height="22" />
            <div className="section-divider-line"></div>
          </div>
          <p className="section-desc">
            At Bharanatheril Temple, Mother Bhadrakali showers boundless grace alongside the sacred shrines of Lord Ganapathi, the holy Sarpa Kavu (Nagaraja & Nagayakshi), Brahmarakshas, and Yakshi Amma.
          </p>
        </div>

        {/* Deity Selector Pills */}
        <div className="deity-nav-pills">
          {deities.map((deity) => (
            <button
              key={deity.id}
              className={`deity-pill-btn ${selectedDeity.id === deity.id ? 'active' : ''}`}
              onClick={() => setSelectedDeity(deity)}
            >
              <span className="pill-ml text-malayalam">{deity.nameMl}</span>
              <span className="pill-en">{deity.nameEn}</span>
            </button>
          ))}
        </div>

        {/* Selected Deity Showcase Card */}
        <div className="deity-showcase-card kasavu-border-card">
          <div className="deity-showcase-grid">
            <div className="deity-showcase-image-col">
              <div className="deity-image-wrapper">
                <img 
                  src={selectedDeity.image} 
                  alt={selectedDeity.nameEn} 
                  className="deity-showcase-img"
                />
                <div className="deity-role-ribbon">
                  <Award size={15} />
                  <span>{selectedDeity.role}</span>
                </div>
              </div>
            </div>

            <div className="deity-showcase-info-col">
              <div className="deity-header">
                <h3 className="deity-name-ml text-malayalam">{selectedDeity.nameMl}</h3>
                <h4 className="deity-name-en">{selectedDeity.nameEn}</h4>
              </div>

              <p className="deity-description">{selectedDeity.description}</p>

              <div className="deity-meta-blocks">
                <div className="meta-block">
                  <span className="meta-label">
                    <Calendar size={15} className="text-gold" /> വിശേഷ ദിവസങ്ങൾ (Special Worship Days)
                  </span>
                  <span className="meta-value">{selectedDeity.specialDays}</span>
                </div>

                <div className="meta-block">
                  <span className="meta-label">
                    <Sparkles size={15} className="text-gold" /> പ്രധാന വഴിപാടുകൾ (Principal Offerings)
                  </span>
                  <span className="meta-value">{selectedDeity.keyOfferings}</span>
                </div>
              </div>

              <div className="deity-cta-row">
                <button 
                  className="btn-gold"
                  onClick={() => onSelectDeityForPooja(selectedDeity.nameEn)}
                >
                  <Sparkles size={16} />
                  <span>ഈ മൂർത്തിക്കുള്ള വഴിപാടുകൾ ബുക്ക് ചെയ്യുക</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* All Deities Quick Grid */}
        <div className="all-deities-grid">
          {deities.map((d) => (
            <div 
              key={d.id} 
              className={`deity-mini-card ${selectedDeity.id === d.id ? 'selected' : ''}`}
              onClick={() => setSelectedDeity(d)}
            >
              <img src={d.image} alt={d.nameEn} className="mini-card-thumb" />
              <div className="mini-card-details">
                <span className="mini-card-title-ml text-malayalam">{d.nameMl}</span>
                <span className="mini-card-title-en">{d.nameEn}</span>
                <span className="mini-card-role">{d.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
