import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { templeInfo, templeHistory } from '../data/templeData';
import { 
  Shield, 
  Building, 
  Sparkles, 
  Users, 
  Scroll, 
  Info, 
  Compass, 
  CheckCircle, 
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function AboutPage({ onNavigate, onOpenDonation }) {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('history');

  const tabs = [
    { id: 'history', labelMl: 'ചരിത്രവും ഐതിഹ്യവും', labelEn: 'History & Lore', icon: Scroll },
    { id: 'architecture', labelMl: 'ക്ഷേത്ര വാസ്തുശില്പം', labelEn: 'Architecture', icon: Building },
    { id: 'trust', labelMl: 'ഭരണസമിതി & ട്രസ്റ്റ്', labelEn: 'Trust & Admin', icon: Users },
    { id: 'etiquette', labelMl: 'ക്ഷേത്ര ആചാര മര്യാദകൾ', labelEn: 'Etiquette & Rules', icon: Info },
  ];

  return (
    <div className="inner-page-view about-page">
      <PageHeader 
        titleEn="About Bharanatheril Temple"
        titleMl="ക്ഷേത്ര ചരിത്രവും മാഹാത്മ്യവും"
        subtitle={lang === 'en'
          ? "Abode of Supreme Motherly Grace, Protection & Spiritual Solace at Thurayilkunnu, Karunagappally"
          : "തുറയിൽക്കുന്നിലെ ശ്രീ ഭദ്രകാളി അമ്മയുടെ പരമമായ മാതൃവാത്സല്യവും ദിവ്യാനുഗ്രഹവും"}
        breadcrumb={lang === 'en' ? "About" : "ക്ഷേത്ര ചരിത്രം"}
        onNavigate={onNavigate}
      />

      <div className="container inner-page-container">
        {/* Navigation Tabs */}
        <div className="inner-tabs-bar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`inner-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={18} />
                <div className="tab-btn-text">
                  <span className={lang === 'ml' ? "tab-ml text-malayalam" : "tab-en"}>
                    {lang === 'ml' ? tab.labelMl : tab.labelEn}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tab 1: History & Lore */}
        {activeTab === 'history' && (
          <div className="tab-content-panel animated-fade-in">
            <div className="about-split-layout">
              <div className="about-text-content">
                <span className="section-eyebrow">
                  <Sparkles size={14} /> {t('divineOrigin')}
                </span>
                <h3 className={lang === 'ml' ? "content-heading-ml text-malayalam" : "content-heading-en"}>
                  {t('divinePresenceTitle')}
                </h3>
                
                <p className="lead-paragraph">{lang === 'ml' ? (templeHistory.summaryMl || templeHistory.summary) : (templeHistory.summaryEn || templeHistory.summary)}</p>
                <p>{lang === 'ml' ? (templeHistory.loreMl || templeHistory.lore) : (templeHistory.loreEn || templeHistory.lore)}</p>

                <div className="sacred-quote-box">
                  <p className={`quote-text ${lang === 'ml' ? 'text-malayalam' : ''}`}>
                    {t('quoteText')}
                  </p>
                  <span className="quote-author">{t('quoteAuthor')}</span>
                </div>

                <div className="feature-grid-2col">
                  <div className="feature-box kasavu-border-card">
                    <Shield size={24} className="text-gold" />
                    <div>
                      <h5>{t('shieldTitle')}</h5>
                      <p>{t('shieldDesc')}</p>
                    </div>
                  </div>
                  <div className="feature-box kasavu-border-card">
                    <Sparkles size={24} className="text-gold" />
                    <div>
                      <h5>{t('wishesTitle')}</h5>
                      <p>{t('wishesDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="about-visual-content">
                <div className="image-frame-royal kasavu-border-card">
                  <img 
                    src="/images/temple-exterior.jpg" 
                    alt="Bharanatheril Temple Thurayilkunnu" 
                    className="royal-hero-thumb"
                  />
                  <div className="frame-overlay-caption">
                    <strong>{lang === 'en' ? 'Bharanatheril Temple Sanctum' : 'ഭരണത്തേരിൽ ക്ഷേത്ര സന്നിധി'}</strong>
                    <span>{t('templeSanctumLocation')}</span>
                  </div>
                </div>

                <div className="temple-fast-facts kasavu-border-card">
                  <h5>{t('quickFacts')}</h5>
                  <ul>
                    <li>
                      <span className="fact-label">{t('locationLabel')}:</span>
                      <span className="fact-val">{t('templeLocation')}</span>
                    </li>
                    <li>
                      <span className="fact-label">{t('presidingDeityLabel')}:</span>
                      <span className="fact-val">{lang === 'en' ? 'Sree Bhadra Bhagavathy (Shakta)' : 'ശ്രീ ഭദ്ര ഭഗവതി (ശാക്തേയം)'}</span>
                    </li>
                    <li>
                      <span className="fact-label">{t('auspiciousStarLabel')}:</span>
                      <span className="fact-val">{lang === 'en' ? 'Bharani Nakshathram' : 'ഭരണി നക്ഷത്രം'}</span>
                    </li>
                    <li>
                      <span className="fact-label">{t('annualFestivalLabel')}:</span>
                      <span className="fact-val">{lang === 'en' ? 'Bharani Mahotsavam (Feb/Mar)' : 'ഭരണി മഹോത്സവം (കുംഭം/മീനം)'}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Architecture */}
        {activeTab === 'architecture' && (
          <div className="tab-content-panel animated-fade-in">
            <div className="architecture-grid">
              <div className="arch-card kasavu-border-card">
                <div className="arch-icon-wrap">
                  <Building size={28} className="text-gold" />
                </div>
                <h4 className={lang === 'ml' ? 'text-malayalam' : ''}>{t('srikovilTitle')}</h4>
                <p>{t('srikovilDesc')}</p>
              </div>

              <div className="arch-card kasavu-border-card">
                <div className="arch-icon-wrap">
                  <Compass size={28} className="text-gold" />
                </div>
                <h4 className={lang === 'ml' ? 'text-malayalam' : ''}>{t('chuttambalamTitle')}</h4>
                <p>{t('chuttambalamDesc')}</p>
              </div>

              <div className="arch-card kasavu-border-card">
                <div className="arch-icon-wrap">
                  <Sparkles size={28} className="text-gold" />
                </div>
                <h4 className={lang === 'ml' ? 'text-malayalam' : ''}>{t('sarpaKavuTitle')}</h4>
                <p>{t('sarpaKavuDesc')}</p>
              </div>

              <div className="arch-card kasavu-border-card">
                <div className="arch-icon-wrap">
                  <Clock size={28} className="text-gold" />
                </div>
                <h4 className={lang === 'ml' ? 'text-malayalam' : ''}>{t('thidappallyTitle')}</h4>
                <p>{t('thidappallyDesc')}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Trust & Administration */}
        {activeTab === 'trust' && (
          <div className="tab-content-panel animated-fade-in">
            <div className="trust-layout">
              <div className="trust-intro kasavu-border-card">
                <h3 className={lang === 'ml' ? 'text-malayalam' : ''}>{t('trustIntroTitle')}</h3>
                <h4 className="trust-sub">{lang === 'en' ? 'Administration & Temple Trust' : 'ഭരണസമിതി & ക്ഷേത്ര ട്രസ്റ്റ്'}</h4>
                <p>{t('trustIntroDesc')}</p>

                <div className="trust-details-grid">
                  <div className="trust-detail-item">
                    <strong>{t('trustRegLabel')}:</strong>
                    <span>{t('trustRegVal')}</span>
                  </div>
                  <div className="trust-detail-item">
                    <strong>{t('trustOfficeLabel')}:</strong>
                    <span>Thurayilkunnu, Karunagappally, Kollam - 690518</span>
                  </div>
                  <div className="trust-detail-item">
                    <strong>{t('contactPhoneLabel')}:</strong>
                    <span>{templeInfo.phone}</span>
                  </div>
                  <div className="trust-detail-item">
                    <strong>{t('emailAddress2')}:</strong>
                    <span>{templeInfo.email}</span>
                  </div>
                </div>

                <div className="trust-bank-box">
                  <h5>{t('officialBankDetails')}</h5>
                  <div className="bank-grid">
                    <div><span>{t('bankNameLabel')}</span> <strong>{templeInfo.accountDetails.bankName}</strong></div>
                    <div><span>{t('branchLabel')}</span> <strong>{templeInfo.accountDetails.branch}</strong></div>
                    <div><span>{t('accountNameLabel')}</span> <strong>{templeInfo.accountDetails.accountName}</strong></div>
                    <div><span>{t('accountNumberLabel')}</span> <strong>{templeInfo.accountDetails.accountNumber}</strong></div>
                    <div><span>{t('ifscCodeLabel')}</span> <strong>{templeInfo.accountDetails.ifscCode}</strong></div>
                    <div><span>UPI ID:</span> <strong>{templeInfo.upiId}</strong></div>
                  </div>
                </div>

                <div className="trust-action-row">
                  <button className="btn-primary" onClick={onOpenDonation}>
                    <span>{t('donateToTrust')}</span>
                  </button>
                  <button className="btn-secondary" onClick={() => onNavigate('contact')}>
                    <span>{t('contactOffice')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Etiquette & Rules */}
        {activeTab === 'etiquette' && (
          <div className="tab-content-panel animated-fade-in">
            <div className="etiquette-grid">
              <div className="etiquette-card kasavu-border-card">
                <div className="etiquette-header">
                  <CheckCircle size={24} className="text-green" />
                  <h4>{t('dressCodeTitle')}</h4>
                </div>
                <div className="etiquette-body">
                  <p>{t('dressCodeIntro')}</p>
                  <ul>
                    <li><strong>{t('dressMenLabel')}:</strong> {t('dressMenVal')}</li>
                    <li><strong>{t('dressWomenLabel')}:</strong> {t('dressWomenVal')}</li>
                    <li><strong>{t('dressKidsLabel')}:</strong> {t('dressKidsVal')}</li>
                  </ul>
                </div>
              </div>

              <div className="etiquette-card kasavu-border-card">
                <div className="etiquette-header">
                  <AlertCircle size={24} className="text-gold" />
                  <h4>{t('customsTitle')}</h4>
                </div>
                <div className="etiquette-body">
                  <ul>
                    <li>{t('customs1')}</li>
                    <li>{t('customs2')}</li>
                    <li>{t('customs3')}</li>
                    <li>{t('customs4')}</li>
                    <li>{t('customs5')}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="etiquette-cta-box">
              <p>{t('planVisit')}</p>
              <div className="cta-btn-group">
                <button className="btn-gold" onClick={() => onNavigate('darshan')}>
                  <span>{t('darshanTimings')}</span>
                  <ArrowRight size={16} />
                </button>
                <button className="btn-primary" onClick={() => onNavigate('vazhipadu')}>
                  <span>{t('bookVazhipaduFull')}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
