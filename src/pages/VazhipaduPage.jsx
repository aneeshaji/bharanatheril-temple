import React, { useState, useMemo } from 'react';
import { PageHeader } from '../components/PageHeader';
import { vazhipaduList, nakshathras, templeInfo } from '../data/templeData';
import { 
  Sparkles, 
  Search, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Check, 
  Calendar, 
  User, 
  Phone, 
  X, 
  QrCode, 
  Printer, 
  ShieldCheck,
  Tag,
  ArrowRight,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playTempleBell } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

export function VazhipaduPage({ defaultDeityFilter = 'All', onNavigate }) {
  const { lang, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDeity, setSelectedDeity] = useState(defaultDeityFilter);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cart state: { [vazhipaduId]: quantity }
  const [cart, setCart] = useState({});
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    devoteeName: '',
    nakshathram: 'Bharani',
    poojaDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    phone: '',
    email: '',
    postalPrasadam: false,
    address: '',
    specialPrayer: '',
    paymentMethod: 'upi'
  });

  const categoryLabels = {
    'All': { en: 'All Offerings', ml: 'എല്ലാം' },
    'Payasam & Nivedyam': { en: 'Payasam & Nivedyam', ml: 'പായസവും നിവേദ്യവും' },
    'Pushpanjali & Archana': { en: 'Pushpanjali & Archana', ml: 'പുഷ്പാഞ്ജലിയും അർച്ചനയും' },
    'Vilakku & Deepam': { en: 'Vilakku & Deepam', ml: 'വിളക്കും ദീപവും' },
    'Special Poojas': { en: 'Special Poojas', ml: 'പ്രത്യേക പൂജകൾ' },
    'Homam & Havans': { en: 'Homam & Havans', ml: 'ഹോമങ്ങൾ' }
  };

  const categories = [
    'All', 
    'Payasam & Nivedyam', 
    'Pushpanjali & Archana', 
    'Vilakku & Deepam', 
    'Special Poojas', 
    'Homam & Havans'
  ];

  const deitiesList = [
    { en: 'All', ml: 'എല്ലാ പ്രതിഷ്ഠകളും' },
    { en: 'Sree Bhadra Bhagavathy', ml: 'ശ്രീ ഭദ്ര ഭഗവതി' },
    { en: 'Lord Ganapathi', ml: 'ഗണപതി ഭഗവാൻ' },
    { en: 'Nagaraja & Nagayakshi', ml: 'നാഗരാജാവ് & നാഗയക്ഷി' },
    { en: 'Brahmarakshas & Yogeeswaran', ml: 'ബ്രഹ്മരക്ഷസ്സ് & യോഗീശ്വരൻ' }
  ];

  // Filter offerings
  const filteredOfferings = useMemo(() => {
    return vazhipaduList.filter((item) => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchDeity = selectedDeity === 'All' || item.deity.toLowerCase().includes(selectedDeity.toLowerCase());
      const matchSearch = item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.nameMl.includes(searchQuery) ||
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchDeity && matchSearch;
    });
  }, [selectedCategory, selectedDeity, searchQuery]);

  const addToCart = (id) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    playTempleBell(1.2);
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  // Cart total calculations
  const cartItems = useMemo(() => {
    return Object.entries(cart).map(([id, qty]) => {
      const item = vazhipaduList.find(v => v.id === id);
      return { ...item, qty, subtotal: item ? item.price * qty : 0 };
    }).filter(i => i.nameEn);
  }, [cart]);

  const totalAmount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  }, [cartItems]);

  const totalCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.qty, 0);
  }, [cartItems]);

  const handleOpenBookingForm = () => {
    if (cartItems.length === 0) return;
    setShowCheckoutModal(true);
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    if (!formData.devoteeName || !formData.phone) {
      alert(lang === 'en' ? 'Please fill in your name and phone number.' : 'ദയവായി നിങ്ങളുടെ പേരും ഫോൺ നമ്പറും നൽകുക.');
      return;
    }

    // Generate Booking Record
    const token = 'BT-' + Math.floor(100000 + Math.random() * 900000);
    const bookingRecord = {
      token,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      devoteeName: formData.devoteeName,
      nakshathram: formData.nakshathram,
      poojaDate: formData.poojaDate,
      phone: formData.phone,
      email: formData.email,
      postalPrasadam: formData.postalPrasadam,
      address: formData.address,
      items: cartItems,
      totalAmount,
      paymentMethod: formData.paymentMethod
    };

    setBookingConfirmed(bookingRecord);
    setShowCheckoutModal(false);
    setCart({});

    // Confetti celebration
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {}
    playTempleBell(1.0);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="inner-page-view vazhipadu-page">
      <PageHeader 
        titleEn="Vazhipadu & Pooja Booking"
        titleMl="വഴിപാടുകൾ & പൂജാ ബുക്കിംഗ്"
        subtitle={lang === 'en' ? 'Book sacred archana, payasa nivedyam, homam, and vilakku offerings online with your birth star' : 'അർച്ചന, പായസ നിവേദ്യം, ഹോമം, വിളക്ക് വഴിപാടുകൾ താങ്കളുടെ ജന്മനക്ഷത്രത്തിൽ ഓൺലൈനായി ബുക്ക് ചെയ്യാം'}
        breadcrumb={lang === 'en' ? 'Vazhipadu Booking' : 'വഴിപാട് ബുക്കിംഗ്'}
        onNavigate={onNavigate}
      />

      <div className="container inner-page-container">
        {/* Search & Filters Sanctuary Bar */}
        <div className="vazhipadu-filter-sanctuary kasavu-border-card">
          <div className="sanctuary-top-row">
            {/* Search Input */}
            <div className="search-input-box">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder={lang === 'en' ? 'Search pooja (e.g. Kadumpayasam, Pushpanjali, Ganapathi Homam)...' : 'വഴിപാടുകൾ തിരയുക (ഉദാ: കടുംപായസം, പുഷ്പാഞ്ജലി)...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Deity Filter Dropdown */}
            <div className="deity-filter-dropdown">
              <Filter size={16} />
              <select 
                value={selectedDeity}
                onChange={(e) => setSelectedDeity(e.target.value)}
              >
                {deitiesList.map(d => (
                  <option key={d.en} value={d.en}>
                    {lang === 'en' ? d.en : d.ml}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="category-chips-row">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {categoryLabels[cat] ? categoryLabels[cat][lang] : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Layout with Sticky Cart Side Panel */}
        <div className="catalog-layout">
          {/* Main Offerings Grid */}
          <div className="offerings-main-col">
            <div className="offerings-count-bar">
              <span>
                {lang === 'en' ? (
                  <>Showing <strong>{filteredOfferings.length}</strong> divine offerings</>
                ) : (
                  <><strong>{filteredOfferings.length}</strong> വഴിപാടുകൾ ലഭ്യമാണ്</>
                )}
              </span>
              {(selectedCategory !== 'All' || selectedDeity !== 'All' || searchQuery) && (
                <button 
                  className="reset-filters-btn"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedDeity('All');
                    setSearchQuery('');
                  }}
                >
                  {lang === 'en' ? 'Reset Filters' : 'ഫിൽട്ടറുകൾ മാറ്റുക'}
                </button>
              )}
            </div>

            <div className="offerings-cards-grid">
              {filteredOfferings.map((item) => {
                const inCartQty = cart[item.id] || 0;
                return (
                  <div key={item.id} className="offering-item-card kasavu-border-card">
                    <div className="item-card-top">
                      <span className="item-deity-badge">{item.deity}</span>
                      {item.popular && (
                        <span className="item-popular-badge">
                          <Sparkles size={11} /> {lang === 'en' ? 'Popular' : 'പ്രധാനം'}
                        </span>
                      )}
                    </div>

                    <div className="item-card-main">
                      <h4 className={lang === 'ml' ? "item-name-ml text-malayalam" : "item-name-en"}>
                        {lang === 'en' ? item.nameEn : item.nameMl}
                      </h4>
                      <p className="item-desc">{item.desc}</p>
                    </div>

                    <div className="item-card-footer">
                      <div className="item-price-block">
                        <span className="price-amount">₹{item.price}</span>
                        <span className="price-unit">{item.unit}</span>
                      </div>

                      {inCartQty === 0 ? (
                        <button 
                          className="btn-add-offering"
                          onClick={() => addToCart(item.id)}
                        >
                          <Plus size={16} />
                          <span>{lang === 'en' ? 'Book' : 'ബുക്ക് ചെയ്യുക'}</span>
                        </button>
                      ) : (
                        <div className="cart-counter-controls">
                          <button 
                            className="counter-btn"
                            onClick={() => removeFromCart(item.id)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="counter-val">{inCartQty}</span>
                          <button 
                            className="counter-btn"
                            onClick={() => addToCart(item.id)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredOfferings.length === 0 && (
              <div className="no-offerings-found kasavu-border-card">
                <p>{lang === 'en' ? 'No vazhipadu offerings match your current search.' : 'നിങ്ങൾ തിരഞ്ഞ വഴിപാടുകൾ ഒന്നും കണ്ടെത്താനായില്ല.'}</p>
                <button 
                  className="btn-secondary"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedDeity('All');
                    setSearchQuery('');
                  }}
                >
                  {lang === 'en' ? 'Clear All Filters' : 'ഫിൽട്ടറുകൾ നീക്കുക'}
                </button>
              </div>
            )}
          </div>

          {/* Cart Sidebar Panel */}
          <div className="cart-sidebar-col">
            <div className="cart-sticky-box kasavu-border-card">
              <div className="cart-box-header">
                <ShoppingBag size={20} className="text-gold" />
                <h4>{lang === 'en' ? 'Pooja Cart' : 'വഴിപാട് കുട്ട'}</h4>
                {totalCount > 0 && <span className="cart-badge-count">{totalCount}</span>}
              </div>

              {cartItems.length === 0 ? (
                <div className="cart-empty-state">
                  <Sparkles size={32} className="empty-sparkle" />
                  <p>{lang === 'en' ? 'Your pooja cart is empty.' : 'വഴിപാട് കുട്ട ശൂന്യമാണ്.'}</p>
                  <small>{lang === 'en' ? 'Select offerings from the catalog to proceed with your birth star booking.' : 'താങ്കളുടെ ജന്മനക്ഷത്രത്തിൽ വഴിപാടുകൾ ബുക്ക് ചെയ്യുവാൻ പട്ടികയിൽ നിന്ന് തിരഞ്ഞെടുക്കുക.'}</small>
                </div>
              ) : (
                <div className="cart-active-state">
                  <div className="cart-items-scroll">
                    {cartItems.map((item) => (
                      <div key={item.id} className="cart-row-item">
                        <div className="cart-row-info">
                          <span className="cart-item-name">{lang === 'en' ? item.nameEn : item.nameMl}</span>
                          <span className="cart-item-rate">₹{item.price} × {item.qty}</span>
                        </div>
                        <div className="cart-row-actions">
                          <span className="cart-item-subtotal">₹{item.subtotal}</span>
                          <button 
                            className="cart-remove-icon"
                            onClick={() => removeFromCart(item.id)}
                            title="Remove item"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="cart-summary-total">
                    <span>{lang === 'en' ? 'Total Amount:' : 'ആകെ തുക:'}</span>
                    <strong>₹{totalAmount}</strong>
                  </div>

                  <button 
                    className="btn-gold full-width"
                    onClick={handleOpenBookingForm}
                  >
                    <Sparkles size={16} />
                    <span>{lang === 'en' ? 'Proceed to Book' : 'ബുക്കിംഗ് പൂർത്തിയാക്കുക'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Checkout Modal */}
        {showCheckoutModal && (
          <div className="modal-overlay">
            <div className="modal-content checkout-modal-card">
              <div className="modal-header">
                <div>
                  <h3 className={lang === 'ml' ? "modal-title-ml text-malayalam" : "modal-title-en"}>
                    {lang === 'en' ? 'Devotee Booking Details' : 'ഭക്തജന വിവരങ്ങൾ'}
                  </h3>
                </div>
                <button className="modal-close-btn" onClick={() => setShowCheckoutModal(false)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmitBooking} className="checkout-form">
                <div className="form-group">
                  <label>{lang === 'en' ? 'Devotee Name *' : 'ഭക്തന്റെ പേര് *'}</label>
                  <input 
                    type="text" 
                    required 
                    placeholder={lang === 'en' ? 'Enter full devotee name' : 'ഭക്തന്റെ പൂർണ്ണ നാമം'}
                    value={formData.devoteeName}
                    onChange={(e) => setFormData({ ...formData, devoteeName: e.target.value })}
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>{lang === 'en' ? 'Birth Star (Nakshathram) *' : 'ജന്മനക്ഷത്രം (നാൾ) *'}</label>
                    <select 
                      value={formData.nakshathram}
                      onChange={(e) => setFormData({ ...formData, nakshathram: e.target.value })}
                    >
                      {nakshathras.map(n => (
                        <option key={n.id} value={n.en}>
                          {lang === 'en' ? n.en : `${n.ml} (${n.en})`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>{lang === 'en' ? 'Pooja Date *' : 'വഴിപാട് തീയതി *'}</label>
                    <input 
                      type="date" 
                      required 
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.poojaDate}
                      onChange={(e) => setFormData({ ...formData, poojaDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>{lang === 'en' ? 'Mobile Number *' : 'ഫോൺ നമ്പർ *'}</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder={lang === 'en' ? '10-digit mobile number' : '10 അക്ക മൊബൈൽ നമ്പർ'}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>{lang === 'en' ? 'Email Address' : 'ഇമെയിൽ വിലാസം'}</label>
                    <input 
                      type="email" 
                      placeholder="devotee@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>{lang === 'en' ? 'Special Sankalpam / Prayer (Optional)' : 'പ്രത്യേക സങ്കല്പം / പ്രാർത്ഥന (നിർബന്ധമില്ല)'}</label>
                  <textarea 
                    rows="2"
                    placeholder={lang === 'en' ? "Any specific prayer or intention for Devi's blessings..." : 'ദേവിയുടെ അനുഗ്രഹത്തിനായി പ്രത്യേക പ്രാർത്ഥനയുണ്ടെങ്കിൽ ഇവിടെ കുറിക്കാം...'}
                    value={formData.specialPrayer}
                    onChange={(e) => setFormData({ ...formData, specialPrayer: e.target.value })}
                  ></textarea>
                </div>

                {/* Postal Prasadam Toggle */}
                <div className="form-checkbox-group">
                  <label className="checkbox-container">
                    <input 
                      type="checkbox"
                      checked={formData.postalPrasadam}
                      onChange={(e) => setFormData({ ...formData, postalPrasadam: e.target.checked })}
                    />
                    <span>{lang === 'en' ? 'Send Prasadam by Postal/Courier' : 'തപാൽ വഴി പ്രസാദം അയക്കുക'}</span>
                  </label>
                </div>

                {formData.postalPrasadam && (
                  <div className="form-group postal-address-box">
                    <label>{lang === 'en' ? 'Complete Postal Address with Pincode *' : 'പൂർണ്ണമായ തപാൽ മേൽവിലാസവും പിൻകോഡും *'}</label>
                    <textarea 
                      rows="3" 
                      required
                      placeholder={lang === 'en' ? 'House name, street, post office, district, state & PIN code' : 'വീട്ടുപേര്, തെരുവ്, പോസ്റ്റ് ഓഫീസ്, ജില്ല, പിൻകോഡ്'}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    ></textarea>
                  </div>
                )}

                {/* Payment Option */}
                <div className="payment-options-block">
                  <label className="payment-opt-title">{lang === 'en' ? 'Payment Mode:' : 'പണമടയ്ക്കൽ രീതി:'}</label>
                  <div className="payment-radios">
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="pay" 
                        value="upi" 
                        checked={formData.paymentMethod === 'upi'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      />
                      <span>{lang === 'en' ? 'Direct Temple UPI / Google Pay / PhonePe' : 'നേരിട്ടുള്ള ക്ഷേത്ര UPI / Google Pay / PhonePe'}</span>
                    </label>
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="pay" 
                        value="counter" 
                        checked={formData.paymentMethod === 'counter'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      />
                      <span>{lang === 'en' ? 'Pay at Temple Counter upon Arrival' : 'ക്ഷേത്ര കൗണ്ടറിൽ നേരിട്ടെത്തി പണമടയ്ക്കുക'}</span>
                    </label>
                  </div>
                </div>

                {/* Total and Submit */}
                <div className="modal-checkout-footer">
                  <div className="modal-total-display">
                    <span>{lang === 'en' ? 'Total Amount:' : 'ആകെ തുക:'}</span>
                    <strong>₹{totalAmount}</strong>
                  </div>
                  <button type="submit" className="btn-primary">
                    <Check size={18} />
                    <span>{lang === 'en' ? 'Confirm Booking' : 'തീരുമാനം സ്ഥിരീകരിക്കുക'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Confirmation & Printable Receipt Modal */}
        {bookingConfirmed && (
          <div className="modal-overlay">
            <div className="modal-content booking-receipt-card print-section">
              <div className="receipt-header">
                <img src="/lamp-icon.svg" alt="Temple Lamp" className="receipt-lamp-icon" />
                <h3 className={lang === 'ml' ? "receipt-temple-ml text-malayalam" : "receipt-temple-en"}>
                  {lang === 'en' ? 'Bharanatheril Sree Bhadra Bhagavathy Temple Trust' : 'ഭരണത്തേരിൽ ശ്രീ ഭദ്ര ഭഗവതി ക്ഷേത്രം'}
                </h3>
                <p className="receipt-location">Thurayilkunnu, Karunagappally, Kollam - 690518</p>
                <div className="receipt-badge-token">
                  <span>{lang === 'en' ? 'BOOKING TOKEN:' : 'ബുക്കിംഗ് ടോക്കൺ:'} <strong>{bookingConfirmed.token}</strong></span>
                </div>
              </div>

              <div className="receipt-body">
                <div className="receipt-info-grid">
                  <div><span>{lang === 'en' ? 'Devotee:' : 'ഭക്തന്റെ പേര്:'}</span> <strong>{bookingConfirmed.devoteeName}</strong></div>
                  <div><span>{lang === 'en' ? 'Nakshathram:' : 'നക്ഷത്രം:'}</span> <strong>{bookingConfirmed.nakshathram}</strong></div>
                  <div><span>{lang === 'en' ? 'Pooja Date:' : 'തീയതി:'}</span> <strong>{bookingConfirmed.poojaDate}</strong></div>
                  <div><span>{lang === 'en' ? 'Phone:' : 'ഫോൺ:'}</span> <strong>{bookingConfirmed.phone}</strong></div>
                  <div><span>{lang === 'en' ? 'Payment Mode:' : 'പേയ്‌മെന്റ് രീതി:'}</span> <strong>{bookingConfirmed.paymentMethod.toUpperCase()}</strong></div>
                  <div><span>{lang === 'en' ? 'Booked At:' : 'ബുക്ക് ചെയ്ത സമയം:'}</span> <strong>{bookingConfirmed.timestamp}</strong></div>
                </div>

                <div className="receipt-items-table">
                  <table>
                    <thead>
                      <tr>
                        <th>{lang === 'en' ? 'Pooja Offering' : 'വഴിപാട്'}</th>
                        <th>{lang === 'en' ? 'Deity' : 'പ്രതിഷ്ഠ'}</th>
                        <th>{lang === 'en' ? 'Qty' : 'എണ്ണം'}</th>
                        <th>{lang === 'en' ? 'Amount' : 'തുക'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingConfirmed.items.map((item, idx) => (
                        <tr key={idx}>
                          <td>{lang === 'en' ? item.nameEn : item.nameMl}</td>
                          <td>{item.deity}</td>
                          <td>{item.qty}</td>
                          <td>₹{item.subtotal}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3">{lang === 'en' ? 'Total Amount Paid / Payable:' : 'ആകെ അടയ്ക്കേണ്ട തുക:'}</td>
                        <td><strong>₹{bookingConfirmed.totalAmount}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {bookingConfirmed.postalPrasadam && (
                  <div className="receipt-postal-note">
                    <strong>{lang === 'en' ? 'Postal Prasadam Address:' : 'പ്രസാദം അയക്കേണ്ട മേൽവിലാസം:'}</strong>
                    <p>{bookingConfirmed.address}</p>
                  </div>
                )}

                {bookingConfirmed.paymentMethod === 'upi' && (
                  <div className="receipt-upi-note">
                    <QrCode size={22} className="text-gold" />
                    <div>
                      <span>{lang === 'en' ? 'Official UPI ID:' : 'ഔദ്യോഗിക UPI ID:'} <strong>{templeInfo.upiId}</strong></span>
                      <small>{lang === 'en' ? 'Please show this token screenshot / receipt at the temple vazhipadu counter.' : 'ഈ ടോക്കൺ സ്ക്രീൻഷോട്ട് അല്ലെങ്കിൽ രസീത് ക്ഷേത്ര വഴിപാട് കൗണ്ടറിൽ കാണിക്കുക.'}</small>
                    </div>
                  </div>
                )}
              </div>

              <div className="receipt-footer no-print">
                <button className="btn-secondary" onClick={handlePrintReceipt}>
                  <Printer size={16} />
                  <span>{lang === 'en' ? 'Print Sacred Receipt' : 'രസീത് പ്രിന്റ് ചെയ്യുക'}</span>
                </button>
                <button className="btn-primary" onClick={() => setBookingConfirmed(null)}>
                  <span>{lang === 'en' ? 'Close & Return' : 'തിരികെ പോവുക'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
