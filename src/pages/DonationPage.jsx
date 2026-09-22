import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { templeInfo } from '../data/templeData';
import { 
  HeartHandshake, 
  Sparkles, 
  Copy, 
  Check, 
  QrCode, 
  ShieldCheck, 
  Building, 
  Utensils, 
  Flame, 
  Printer,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playTempleBell } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

export function DonationPage({ onNavigate }) {
  const { lang, t } = useLanguage();
  const [selectedScheme, setSelectedScheme] = useState('annadanam');
  const [amount, setAmount] = useState(501);
  const [customAmount, setCustomAmount] = useState('');
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Form State
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorAddress, setDonorAddress] = useState('');
  const [donorPan, setDonorPan] = useState('');
  const [receiptData, setReceiptData] = useState(null);

  const presetAmounts = [101, 251, 501, 1001, 2501, 5001];

  const schemes = [
    {
      id: 'annadanam',
      icon: Utensils,
      titleMl: 'നിത്യ അന്നദാനം',
      titleEn: 'Nithya Annadanam Scheme',
      descEn: 'Sponsor sacred noon meals (Prasada Oottu) for visiting devotees and pilgrims.',
      descMl: 'ക്ഷേത്രത്തിലെത്തുന്ന ഭക്തജനങ്ങൾക്ക് അന്നദാനം (പ്രസാദഊട്ട്) നൽകുന്നതിനുള്ള പുണ്യ സമർപ്പണം.'
    },
    {
      id: 'renovation',
      icon: Building,
      titleMl: 'ക്ഷേത്ര പുനരുദ്ധാരണം',
      titleEn: 'Temple Renovation & Sreekovil Fund',
      descEn: 'Contributions towards traditional stone carving, copper roofing, and sanctum maintenance.',
      descMl: 'ശ്രീകോവിൽ നവീകരണം, ചെമ്പ് മേയൽ, പരമ്പരാഗത ശിലാ നിർമ്മാണം എന്നിവയ്ക്കായുള്ള നിധി.'
    },
    {
      id: 'chuttuvilakku',
      icon: Flame,
      titleMl: 'നിത്യ നെയ്‌വിളക്ക് സമർപ്പണം',
      titleEn: 'Nitya Deepam & Oil Offering Fund',
      descEn: 'Provide pure cow ghee and sesame oil for the continuous sacred flames of Mother Bhadrakali.',
      descMl: 'ഭദ്രകാളി അമ്മയുടെ തിരുസന്നിധിയിൽ അണയാതെ കത്തുന്ന ദീപങ്ങൾക്കായി ശുദ്ധമായ പശുവിൻ നെയ്യും നല്ലെണ്ണയും നൽകുക.'
    },
    {
      id: 'general',
      icon: HeartHandshake,
      titleMl: 'ജനറൽ E-കാണിക്ക',
      titleEn: 'General Temple E-Kanikka',
      descEn: 'Unrestricted devotional offerings towards temple day-to-day spiritual activities and poojas.',
      descMl: 'ക്ഷേത്രത്തിലെ നിത്യനിദാന പൂജകൾക്കും ആത്മീയ ചടങ്ങുകൾക്കുമായുള്ള ഭക്തിപൂർവ്വമായ കാണിക്ക സമർപ്പണം.'
    }
  ];

  const handleCopyBank = () => {
    const text = `Bank: ${templeInfo.accountDetails.bankName}\nAccount Name: ${templeInfo.accountDetails.accountName}\nAccount No: ${templeInfo.accountDetails.accountNumber}\nIFSC: ${templeInfo.accountDetails.ifscCode}\nBranch: ${templeInfo.accountDetails.branch}`;
    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(templeInfo.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const finalAmount = customAmount ? Number(customAmount) : amount;

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    if (!donorName || !donorPhone) {
      alert(lang === 'en' ? 'Please enter your name and phone number.' : 'ദയവായി നിങ്ങളുടെ പേരും ഫോൺ നമ്പറും നൽകുക.');
      return;
    }
    if (!finalAmount || finalAmount <= 0) {
      alert(lang === 'en' ? 'Please enter a valid donation amount.' : 'ദയവായി സാധുവായ തുക നൽകുക.');
      return;
    }

    const schemeObj = schemes.find(s => s.id === selectedScheme);
    const receiptToken = 'DON-' + Math.floor(100000 + Math.random() * 900000);
    const donationRecord = {
      token: receiptToken,
      date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      donorName,
      donorPhone,
      donorEmail,
      donorAddress,
      donorPan,
      schemeName: schemeObj ? (lang === 'en' ? schemeObj.titleEn : schemeObj.titleMl) : (lang === 'en' ? 'E-Kanikka' : 'E-കാണിക്ക'),
      amount: finalAmount
    };

    setReceiptData(donationRecord);
    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}
    playTempleBell(1.0);
  };

  return (
    <div className="inner-page-view donation-page">
      <PageHeader 
        titleEn="E-Kanikka & Sacred Offerings"
        titleMl="E-കാണിക്ക & അന്നദാന സമർപ്പണം"
        subtitle={lang === 'en' ? 'Support daily Annadanam, temple renovation, and sacred deepam offerings with divine blessings' : 'നിത്യ അന്നദാനം, ക്ഷേത്ര പുനരുദ്ധാരണം, ദീപ സമർപ്പണം എന്നിവയിൽ പങ്കാളികളായി പുണ്യം നേടൂ'}
        breadcrumb={lang === 'en' ? 'E-Kanikka' : 'E-കാണിക്ക'}
        onNavigate={onNavigate}
      />

      <div className="container inner-page-container">
        {/* Scheme Selection Cards */}
        <div className="donation-schemes-grid">
          {schemes.map((scheme) => {
            const Icon = scheme.icon;
            const isSelected = selectedScheme === scheme.id;
            return (
              <div 
                key={scheme.id}
                className={`scheme-card kasavu-border-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedScheme(scheme.id)}
              >
                <div className="scheme-icon-box">
                  <Icon size={24} className="text-gold" />
                </div>
                <h4 className={lang === 'ml' ? "scheme-title-ml text-malayalam" : "scheme-title-en"}>
                  {lang === 'en' ? scheme.titleEn : scheme.titleMl}
                </h4>
                <p className="scheme-desc">{lang === 'en' ? scheme.descEn : scheme.descMl}</p>
                <div className="scheme-radio-indicator">
                  <span className={`radio-dot ${isSelected ? 'checked' : ''}`}></span>
                  <span>{isSelected ? (lang === 'en' ? 'Selected Scheme' : 'തിരഞ്ഞെടുത്തു') : (lang === 'en' ? 'Select' : 'തിരഞ്ഞെടുക്കുക')}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Donation Layout: Form + Bank Details */}
        <div className="donation-main-layout">
          {/* Donation Form */}
          <div className="donation-form-col">
            <div className="donation-form-card kasavu-border-card">
              <h3>{lang === 'en' ? 'Offering Amount & Devotee Details' : 'കാണിക്ക തുക & ഭക്തന്റെ വിവരങ്ങൾ'}</h3>
              <p className="sub-hint">{lang === 'en' ? 'Select or enter your desired offering amount:' : 'നിങ്ങളുടെ സമർപ്പണ തുക തിരഞ്ഞെടുക്കുക അല്ലെങ്കിൽ നൽകുക:'}</p>

              {/* Amount Presets */}
              <div className="presets-row">
                {presetAmounts.map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`preset-btn ${!customAmount && amount === p ? 'active' : ''}`}
                    onClick={() => {
                      setAmount(p);
                      setCustomAmount('');
                    }}
                  >
                    ₹{p}
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="custom-amount-input">
                <span className="currency-prefix">₹</span>
                <input 
                  type="number" 
                  placeholder={lang === 'en' ? 'Enter other custom amount' : 'മറ്റു തുക നൽകുക'}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  min="1"
                />
              </div>

              {/* Donor Contact Form */}
              <form onSubmit={handleDonateSubmit} className="donor-fields-form">
                <div className="form-group">
                  <label>{lang === 'en' ? 'Devotee / Donor Name *' : 'ഭക്തന്റെ പേര് *'}</label>
                  <input 
                    type="text" 
                    required 
                    placeholder={lang === 'en' ? 'Full devotee name' : 'ഭക്തന്റെ പൂർണ്ണമായ പേര്'}
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>{lang === 'en' ? 'Phone / Mobile *' : 'ഫോൺ നമ്പർ *'}</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder={lang === 'en' ? '10-digit mobile number' : '10 അക്ക മൊബൈൽ നമ്പർ'}
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>{lang === 'en' ? 'Email Address' : 'ഇമെയിൽ വിലാസം'}</label>
                    <input 
                      type="email" 
                      placeholder="devotee@example.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>{lang === 'en' ? 'Address / State' : 'മേൽവിലാസം / സംസ്ഥാനം'}</label>
                    <input 
                      type="text" 
                      placeholder={lang === 'en' ? 'City, State' : 'സ്ഥലം, സംസ്ഥാനം'}
                      value={donorAddress}
                      onChange={(e) => setDonorAddress(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>{lang === 'en' ? 'PAN Card (for 80G Tax Exemption)' : 'പാൻ കാർഡ് (80G നികുതി ഇളവിന്)'}</label>
                    <input 
                      type="text" 
                      placeholder={lang === 'en' ? 'ABCDE1234F (Optional)' : 'ABCDE1234F (നിർബന്ധമില്ല)'}
                      value={donorPan}
                      onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
                    />
                  </div>
                </div>

                <div className="donation-total-bar">
                  <span>{lang === 'en' ? 'Offering Amount:' : 'സമർപ്പണ തുക:'}</span>
                  <strong>₹{finalAmount}</strong>
                </div>

                <button type="submit" className="btn-primary full-width">
                  <HeartHandshake size={18} />
                  <span>{lang === 'en' ? `Proceed to Donate ₹${finalAmount}` : `കാണിക്ക സമർപ്പിക്കുക (₹${finalAmount})`}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Official Bank Details & QR Code */}
          <div className="donation-bank-col">
            <div className="bank-info-card kasavu-border-card">
              <div className="bank-header">
                <Building size={22} className="text-gold" />
                <div>
                  <h4 className={lang === 'ml' ? "scheme-title-ml text-malayalam" : "scheme-title-en"}>
                    {lang === 'en' ? 'Official Temple Trust Account' : 'ക്ഷേത്ര ഔദ്യോഗിക ബാങ്ക് അക്കൗണ്ട്'}
                  </h4>
                </div>
              </div>

              <div className="bank-item-rows">
                <div className="bank-row">
                  <span>{lang === 'en' ? 'Bank Name:' : 'ബാങ്ക്:'}</span>
                  <strong>{templeInfo.accountDetails.bankName}</strong>
                </div>
                <div className="bank-row">
                  <span>{lang === 'en' ? 'Branch:' : 'ശാഖ:'}</span>
                  <strong>{templeInfo.accountDetails.branch}</strong>
                </div>
                <div className="bank-row">
                  <span>{lang === 'en' ? 'Account Name:' : 'അക്കൗണ്ട് പേര്:'}</span>
                  <strong>{templeInfo.accountDetails.accountName}</strong>
                </div>
                <div className="bank-row">
                  <span>{lang === 'en' ? 'Account Number:' : 'അക്കൗണ്ട് നമ്പർ:'}</span>
                  <strong className="text-highlight">{templeInfo.accountDetails.accountNumber}</strong>
                </div>
                <div className="bank-row">
                  <span>{lang === 'en' ? 'IFSC Code:' : 'ഐ.എഫ്.എസ്.സി കോഡ്:'}</span>
                  <strong className="text-highlight">{templeInfo.accountDetails.ifscCode}</strong>
                </div>
              </div>

              <button className="copy-action-btn" onClick={handleCopyBank}>
                {copiedBank ? <Check size={16} className="text-green" /> : <Copy size={16} />}
                <span>
                  {copiedBank 
                    ? (lang === 'en' ? 'Bank Details Copied!' : 'വിവരങ്ങൾ പകർത്തി!') 
                    : (lang === 'en' ? 'Copy Bank Account Details' : 'ബാങ്ക് അക്കൗണ്ട് വിവരങ്ങൾ പകർത്തുക')}
                </span>
              </button>

              <hr className="subtle-divider" />

              {/* UPI ID Scan */}
              <div className="upi-scan-block">
                <div className="upi-header">
                  <QrCode size={20} className="text-gold" />
                  <strong>{lang === 'en' ? 'Direct UPI Payment' : 'നേരിട്ടുള്ള യു.പി.ഐ അടവ്'}</strong>
                </div>
                <div className="upi-id-pill">
                  <span>{templeInfo.upiId}</span>
                  <button className="copy-mini-btn" onClick={handleCopyUpi}>
                    {copiedUpi ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="upi-apps-hint">{lang === 'en' ? 'Supported on Google Pay, PhonePe, Paytm, BHIM & all UPI apps.' : 'Google Pay, PhonePe, Paytm, BHIM തുടങ്ങി എല്ലാ UPI ആപ്പുകളിലും ലഭ്യമാണ്.'}</p>
              </div>

              <div className="trust-tax-note">
                <ShieldCheck size={18} className="text-gold" />
                <small>{lang === 'en' ? 'Donations to Bharanatheril Temple Trust are eligible for tax benefits under Section 80G.' : 'ഭരണത്തേരിൽ ക്ഷേത്ര ട്രസ്റ്റിലേക്കുള്ള സംഭാവനകൾക്ക് 80G പ്രകാരം നികുതി ഇളവ് ലഭിക്കുന്നതാണ്.'}</small>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Receipt Modal */}
        {receiptData && (
          <div className="modal-overlay">
            <div className="modal-content booking-receipt-card print-section">
              <div className="receipt-header">
                <img src="/lamp-icon.svg" alt="Temple Lamp" className="receipt-lamp-icon" />
                <h3 className={lang === 'ml' ? "receipt-temple-ml text-malayalam" : "receipt-temple-en"}>
                  {lang === 'en' ? 'Bharanatheril Sree Bhadra Bhagavathy Temple Trust' : 'ഭരണത്തേരിൽ ശ്രീ ഭദ്ര ഭഗവതി ക്ഷേത്രം'}
                </h3>
                <p className="receipt-location">Thurayilkunnu, Karunagappally, Kollam - 690518</p>
                <div className="receipt-badge-token">
                  <span>{lang === 'en' ? 'E-KANIKKA RECEIPT:' : 'ഇ-കാണിക്ക രസീത്:'} <strong>{receiptData.token}</strong></span>
                </div>
              </div>

              <div className="receipt-body">
                <div className="receipt-info-grid">
                  <div><span>{lang === 'en' ? 'Donor Name:' : 'ഭക്തന്റെ പേര്:'}</span> <strong>{receiptData.donorName}</strong></div>
                  <div><span>{lang === 'en' ? 'Scheme:' : 'പദ്ധതി:'}</span> <strong>{receiptData.schemeName}</strong></div>
                  <div><span>{lang === 'en' ? 'Amount:' : 'തുക:'}</span> <strong className="text-gold">₹{receiptData.amount}</strong></div>
                  <div><span>{lang === 'en' ? 'Phone:' : 'ഫോൺ:'}</span> <strong>{receiptData.donorPhone}</strong></div>
                  <div><span>{lang === 'en' ? 'Date & Time:' : 'തീയതി & സമയം:'}</span> <strong>{receiptData.date}</strong></div>
                  {receiptData.donorPan && <div><span>{lang === 'en' ? 'PAN No:' : 'പാൻ നമ്പർ:'}</span> <strong>{receiptData.donorPan}</strong></div>}
                </div>

                <div className={`receipt-blessing-quote ${lang === 'ml' ? 'text-malayalam' : ''}`}>
                  {lang === 'en' 
                    ? '"May the divine grace of Mother Bhadrakali be with you and your family always."' 
                    : '"ഭഗവതിയുടെ അനുഗ്രഹവർഷം നിങ്ങളിലും കുടുംബത്തിലും സദാ ഉണ്ടായിരിക്കട്ടെ."'}
                </div>
              </div>

              <div className="receipt-footer no-print">
                <button className="btn-secondary" onClick={() => window.print()}>
                  <Printer size={16} />
                  <span>{lang === 'en' ? 'Print Receipt' : 'രസീത് പ്രിന്റ് ചെയ്യുക'}</span>
                </button>
                <button className="btn-primary" onClick={() => setReceiptData(null)}>
                  <span>{lang === 'en' ? 'Done' : 'പൂർത്തിയായി'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
