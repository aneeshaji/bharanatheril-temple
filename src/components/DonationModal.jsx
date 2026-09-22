import React, { useState } from 'react';
import { templeInfo, nakshathras } from '../data/templeData';
import { X, HeartHandshake, QrCode, Copy, Check, Sparkles, Building2, Utensils, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playTempleBell } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

export function DonationModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const { lang, t } = useLanguage();

  const [selectedCause, setSelectedCause] = useState('annadanam');
  const [customAmount, setCustomAmount] = useState('501');
  const [devoteeName, setDevoteeName] = useState('');
  const [nakshathram, setNakshathram] = useState('Bharani');
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const causes = [
    { id: 'annadanam', titleMl: 'നിത്യ അന്നദാനം', titleEn: 'Annadanam Fund', icon: Utensils, desc: 'Serving holy meals to all devotees and pilgrims.' },
    { id: 'renovation', titleMl: 'ക്ഷേത്ര നവീകരണം', titleEn: 'Temple Renovation', icon: Building2, desc: 'Conservation of sacred wooden carvings and sanctum.' },
    { id: 'festival', titleMl: 'ഉത്സവ സഹായം', titleEn: 'Festival Fund', icon: Sparkles, desc: 'Supporting Bharani Mahotsavam, Pongala & Chenda Melam.' },
    { id: 'deepam', titleMl: 'വിളക്ക് & എണ്ണ സമർപ്പണം', titleEn: 'Lamp & Oil Seva', icon: Flame, desc: 'Providing sesame oil & ghee for eternal sanctum lamps.' }
  ];

  const presets = ['101', '251', '501', '1001', '2501', '5001'];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    playTempleBell(1.1);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content donation-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="section-eyebrow" style={{ margin: 0 }}>
              <HeartHandshake size={14} /> {lang === 'en' ? 'E-Kanikka Offering' : 'E-കാണിക്ക സമർപ്പണം'}
            </span>
            <h3 className="modal-title">
              {lang === 'en' ? 'Temple Offering Fund' : 'ക്ഷേത്ര സമർപ്പണ നിധി'}
            </h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="donation-form-body">
            {/* Cause Selection */}
            <div className="form-group">
              <label className="form-label">
                {lang === 'en' ? 'Select Purpose / Cause:' : 'സമർപ്പണ ലക്ഷ്യം തിരഞ്ഞെടുക്കുക:'}
              </label>
              <div className="causes-selector-grid">
                {causes.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div 
                      key={c.id}
                      className={`cause-card ${selectedCause === c.id ? 'active' : ''}`}
                      onClick={() => setSelectedCause(c.id)}
                    >
                      <Icon size={18} className="cause-icon" />
                      <div className="cause-card-texts">
                        <span className={lang === 'ml' ? "cause-title-ml text-malayalam" : "cause-title-en"}>
                          {lang === 'en' ? c.titleEn : c.titleMl}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Amount Selection */}
            <div className="form-group">
              <label className="form-label">
                {lang === 'en' ? 'Offering Amount (₹):' : 'സമർപ്പണ തുക (₹):'}
              </label>
              <div className="amount-presets-row">
                {presets.map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    className={`preset-btn ${customAmount === amt ? 'active' : ''}`}
                    onClick={() => setCustomAmount(amt)}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
              <div className="custom-amt-input-wrap">
                <span className="amt-currency-prefix">₹</span>
                <input 
                  type="number"
                  min="1"
                  required
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="form-input custom-amt-input"
                  placeholder={lang === 'en' ? 'Enter custom amount' : 'തുക നൽകുക'}
                />
              </div>
            </div>

            {/* Devotee Info */}
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">
                  {lang === 'en' ? 'Devotee Name *' : 'ഭക്തന്റെ പേര് *'}
                </label>
                <input 
                  type="text"
                  required
                  placeholder={lang === 'en' ? 'Your full name' : 'ഭക്തന്റെ പേര്'}
                  value={devoteeName}
                  onChange={(e) => setDevoteeName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  {lang === 'en' ? 'Birth Star (Nakshathram)' : 'ജന്മ നക്ഷത്രം (നാൾ)'}
                </label>
                <select 
                  value={nakshathram}
                  onChange={(e) => setNakshathram(e.target.value)}
                  className="form-input"
                >
                  {nakshathras.map((n) => (
                    <option key={n.id} value={n.en}>
                      {lang === 'en' ? n.en : `${n.ml} (${n.en})`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* UPI & Bank Details Preview */}
            <div className="donation-bank-card kasavu-border-card">
              <div className="qr-center-box">
                <QrCode size={100} className="donation-qr-icon" />
                <span className="upi-id-pill">{templeInfo.upiId}</span>
              </div>

              <div className="bank-details-list">
                <div className="bank-detail-item">
                  <span>{lang === 'en' ? 'Bank:' : 'ബാങ്ക്:'}</span> <strong>{templeInfo.accountDetails.bankName}</strong>
                </div>
                <div className="bank-detail-item">
                  <span>{lang === 'en' ? 'Account Name:' : 'അക്കൗണ്ട് പേര്:'}</span> <strong>{templeInfo.accountDetails.accountName}</strong>
                </div>
                <div className="bank-detail-item">
                  <span>{lang === 'en' ? 'A/C Number:' : 'അക്കൗണ്ട് നമ്പർ:'}</span> 
                  <span className="copyable-wrap">
                    <code>{templeInfo.accountDetails.accountNumber}</code>
                    <button 
                      type="button" 
                      onClick={() => handleCopy(templeInfo.accountDetails.accountNumber)}
                      className="copy-mini-btn"
                    >
                      {copiedAccount ? <Check size={13} color="green" /> : <Copy size={13} />}
                    </button>
                  </span>
                </div>
                <div className="bank-detail-item">
                  <span>{lang === 'en' ? 'IFSC Code:' : 'ഐ.എഫ്.എസ്.സി കോഡ്:'}</span> <code>{templeInfo.accountDetails.ifscCode}</code>
                </div>
              </div>
            </div>

            <button type="submit" className="btn-gold modal-submit-btn">
              <Sparkles size={18} />
              <span>
                {lang === 'en' 
                  ? `Proceed • Pay ₹${customAmount} via UPI / NetBanking` 
                  : `തുടരുക • ₹${customAmount} സമർപ്പിക്കുക (UPI)`}
              </span>
            </button>
          </form>
        ) : (
          <div className="donation-success-state">
            <div className="donation-success-icon-wrap">
              <Sparkles size={36} className="text-gold" />
            </div>
            <h4 className="donation-success-title">
              {lang === 'en' ? 'May Divine Grace Be With You Always!' : 'ഭഗവതിയുടെ അനുഗ്രഹം സദാ ഉണ്ടാവട്ടെ!'}
            </h4>
            <p className="donation-success-sub">
              {lang === 'en' ? (
                <>
                  Thank you, <strong>{devoteeName}</strong> ({nakshathram}). Your sacred pledge of <strong>₹{customAmount}</strong> for <em>{causes.find(c => c.id === selectedCause)?.titleEn}</em> is gratefully acknowledged by Bharanatheril Temple Trust.
                </>
              ) : (
                <>
                  നന്ദി, <strong>{devoteeName}</strong> ({nakshathras.find(n => n.en === nakshathram)?.ml || nakshathram}). <em>{causes.find(c => c.id === selectedCause)?.titleMl}</em> പദ്ധതിയേക്കുള്ള താങ്കളുടെ <strong>₹{customAmount}</strong> രൂപയുടെ സമർപ്പണം ഭക്തിപൂർവ്വം സ്വീകരിച്ചിരിക്കുന്നു.
                </>
              )}
            </p>
            <div className="donation-receipt-qr-wrap">
              <QrCode size={140} />
              <p className="qr-pay-instruction">
                {lang === 'en' ? 'Scan using Google Pay / PhonePe / BHIM UPI to complete transfer:' : 'പണമടയ്ക്കാനായി Google Pay / PhonePe / BHIM UPI വഴി സ്കാൻ ചെയ്യുക:'} <strong>{templeInfo.upiId}</strong>
              </p>
            </div>
            <button className="btn-gold" onClick={() => { setIsSubmitted(false); onClose(); }}>
              <span>{lang === 'en' ? 'Done' : 'പൂർത്തിയായി'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
