import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { deities } from '../data/templeData';
import {
  Sparkles,
  Calendar,
  Gift,
  Shield,
  ArrowRight,
  Bell,
  CheckCircle2,
  HeartHandshake
} from 'lucide-react';
import { playTempleBell } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

export function DeitiesPage({ onNavigate, onSelectDeityForPooja }) {
  const { lang, t } = useLanguage();
  const [activeDeityId, setActiveDeityId] = useState(deities[0].id);

  const selectedDeity = deities.find(d => d.id === activeDeityId) || deities[0];

  const handleBookDeity = (deityName) => {
    onSelectDeityForPooja(deityName);
  };

  return (
    <div className="inner-page-view deities-page">
      <PageHeader 
        titleEn="Sacred Deities & Shrines"
        titleMl="പ്രധാന പ്രതിഷ്ഠകളും ഉപദേവതകളും"
        subtitle={lang === 'en'
          ? 'Sanctified abodes of Sree Bhadrakali, Vighnaharta Ganapathi, Nagaraja, Brahmarakshas, and Yakshi Amma'
          : 'ശ്രീ ഭദ്രകാളി, വിഘ്നേശ്വര ഗണപതി, നാഗരാജ, ബ്രഹ്മരക്ഷസ്സ്, യക്ഷി അമ്മ എന്നിവരുടെ ദൈവിക സന്നിധികൾ'}
        breadcrumb={lang === 'en' ? 'Deities' : 'പ്രതിഷ്ഠകൾ'}
        onNavigate={onNavigate}
      />

      <div className="container inner-page-container">
        {/* Deity Navigation Selector Chips */}
        <div className="deity-selector-chips">
          {deities.map((deity) => (
            <button
              key={deity.id}
              className={`deity-chip-btn ${activeDeityId === deity.id ? 'active' : ''}`}
              onClick={() => {
                setActiveDeityId(deity.id);
                playTempleBell(1.1);
              }}
            >
              <span className={lang === 'ml' ? "chip-name text-malayalam" : "chip-name"}>
                {lang === 'en' ? deity.nameEn : deity.nameMl}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Deity Main Showcase */}
        <div className="deity-showcase-panel kasavu-border-card animated-fade-in">
          <div className="deity-showcase-grid">
            {/* Visual Column */}
            <div className="deity-showcase-visual">
              <div className="deity-image-wrapper">
                <img 
                  src={selectedDeity.image} 
                  alt={selectedDeity.nameEn} 
                  className="deity-showcase-img"
                />
                <div className="deity-role-ribbon">
                  <Shield size={16} />
                  <span>{lang === 'ml' ? (selectedDeity.roleMl || selectedDeity.role) : (selectedDeity.roleEn || selectedDeity.role)}</span>
                </div>
              </div>

              <div className="deity-quick-action-card">
                <button 
                  className="btn-gold full-width"
                  onClick={() => handleBookDeity(selectedDeity.nameEn)}
                >
                  <Sparkles size={16} />
                  <span>{lang === 'en' ? `Book Offerings for ${selectedDeity.nameEn}` : `${selectedDeity.nameMl} വഴിപാടുകൾ ബുക്ക് ചെയ്യുക`}</span>
                </button>
              </div>
            </div>

            {/* Information Column */}
            <div className="deity-showcase-info">
              <span className="section-eyebrow">
                <Sparkles size={14} /> {t('deitySplendor')}
              </span>
              <h2 className={lang === 'ml' ? "deity-title-ml text-malayalam" : "deity-title-en"}>
                {lang === 'en' ? selectedDeity.nameEn : selectedDeity.nameMl}
              </h2>
              <p className="deity-role-highlight">
                {lang === 'ml' ? (selectedDeity.roleMl || selectedDeity.role) : (selectedDeity.roleEn || selectedDeity.role)}
              </p>

              <div className="deity-narrative-box">
                <p>{lang === 'ml' ? (selectedDeity.descMl || selectedDeity.description) : (selectedDeity.descEn || selectedDeity.description)}</p>
              </div>

              {/* Special Days & Key Offerings */}
              <div className="deity-metadata-grid">
                <div className="metadata-card kasavu-border-card">
                  <div className="meta-icon-row">
                    <Calendar size={20} className="text-gold" />
                    <strong>{t('specialDaysLabel')}</strong>
                  </div>
                  <p>{lang === 'ml' ? (selectedDeity.specialDaysMl || selectedDeity.specialDays) : (selectedDeity.specialDaysEn || selectedDeity.specialDays)}</p>
                </div>

                <div className="metadata-card kasavu-border-card">
                  <div className="meta-icon-row">
                    <Gift size={20} className="text-gold" />
                    <strong>{t('keyOfferingsLabel')}</strong>
                  </div>
                  <p>{lang === 'ml' ? (selectedDeity.keyOfferingsMl || selectedDeity.keyOfferings) : (selectedDeity.keyOfferingsEn || selectedDeity.keyOfferings)}</p>
                </div>
              </div>

              {/* Devotional Sloka Banner */}
              <div className="deity-dhyana-sloka">
                <div className="sloka-badge">
                  <Bell size={14} /> {t('dhyanaSloka')}
                </div>
                {selectedDeity.id === 'bhadrakali' && (
                  <p className={`sloka-text ${lang === 'ml' ? 'text-malayalam' : ''}`}>
                    {lang === 'ml' ? (
                      <>
                        "സർവ്വമംഗള മാംഗല്യേ ശിവേ സർവ്വാർത്ഥ സാധികേ |<br/>
                        ശരണ്യേ ത്ര്യംബകേ ഗൗരി നാരായണി നമോസ്തുതേ ||"
                      </>
                    ) : (
                      <>
                        "Sarva-mangala-mangalye Shive Sarvartha-sadhike |<br/>
                        Sharanye Tryambake Gauri Narayani Namo'stute ||"
                      </>
                    )}
                  </p>
                )}
                {selectedDeity.id === 'ganapathi' && (
                  <p className={`sloka-text ${lang === 'ml' ? 'text-malayalam' : ''}`}>
                    {lang === 'ml' ? (
                      <>
                        "ശുക്ലാംബരധരം വിഷ്ണും ശശിവർണ്ണം ചതുർഭുജം |<br/>
                        പ്രസന്നവദനം ധ്യായേത് സർവ്വവിഘ്നോപശാന്തയേ ||"
                      </>
                    ) : (
                      <>
                        "Shuklambaradharam Vishnum Shashivarnam Chaturbhujam |<br/>
                        Prasanna Vadanam Dhyayet Sarva Vighnopa Shantaye ||"
                      </>
                    )}
                  </p>
                )}
                {selectedDeity.id === 'nagaraja' && (
                  <p className={`sloka-text ${lang === 'ml' ? 'text-malayalam' : ''}`}>
                    {lang === 'ml' ? (
                      <>
                        "അനന്തം വാസുകിം ശേഷം പദ്മനാഭം ച കംബലം |<br/>
                        ശംഖപാലം ധൃതരാഷ്ട്രം തക്ഷകം കാളിയം തഥാ ||"
                      </>
                    ) : (
                      <>
                        "Anantham Vasukim Shesham Padmanabham Cha Kambalam |<br/>
                        Shankhapalam Dhritarashtram Thakshakam Kaaliyam Thatha ||"
                      </>
                    )}
                  </p>
                )}
                {selectedDeity.id !== 'bhadrakali' && selectedDeity.id !== 'ganapathi' && selectedDeity.id !== 'nagaraja' && (
                  <p className={`sloka-text ${lang === 'ml' ? 'text-malayalam' : ''}`}>
                    {lang === 'ml' ? '"ഓം ശാന്തി ശാന്തി ശാന്തിഃ | സർവ്വ മംഗളാനി ഭവന്തു ||"' : '"Om Shanti Shanti Shanti | Sarva Mangalani Bhavanthu ||"'}
                  </p>
                )}
              </div>

              <div className="deity-showcase-actions">
                <button 
                  className="btn-primary"
                  onClick={() => handleBookDeity(selectedDeity.nameEn)}
                >
                  <Sparkles size={16} />
                  <span>{t('bookOffering')}</span>
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => onNavigate('darshan')}
                >
                  <Calendar size={16} />
                  <span>{t('darshanTimingsBtn')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* All Deities Summary Cards Grid */}
        <div className="all-deities-grid-section">
          <div className="section-header">
            <h3 className={`section-title ${lang === 'ml' ? 'text-malayalam' : ''}`}>{lang === 'en' ? 'All Sacred Shrines' : 'എല്ലാ പുണ്യ സന്നിധികളും'}</h3>
            <h4 className={`section-title-ml ${lang === 'ml' ? 'text-malayalam' : ''}`}>{t('allShrinesBtn')}</h4>
            <div className="section-divider">
              <div className="section-divider-line"></div>
              <img src="/lamp-icon.svg" alt="Lamp" width="22" height="22" />
              <div className="section-divider-line"></div>
            </div>
          </div>

          <div className="deity-cards-cluster">
            {deities.map((deity) => (
              <div 
                key={deity.id} 
                className={`deity-mini-card kasavu-border-card ${activeDeityId === deity.id ? 'current' : ''}`}
                onClick={() => setActiveDeityId(deity.id)}
              >
                <img src={deity.image} alt={deity.nameEn} className="mini-thumb" />
                <div className="mini-info">
                  <span className="mini-role">
                    {lang === 'ml' ? (deity.roleMl || deity.role) : (deity.roleEn || deity.role)}
                  </span>
                  <h4 className={lang === 'ml' ? "text-malayalam" : "deity-name-en"}>
                    {lang === 'en' ? deity.nameEn : deity.nameMl}
                  </h4>
                  <p className="mini-special">
                    <small>{t('specialLabel')}</small> {(lang === 'ml' ? (deity.specialDaysMl || deity.specialDays) : (deity.specialDaysEn || deity.specialDays)).split(',')[0]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
