import React, { useState, useMemo } from 'react';
import { vazhipaduList, nakshathras, templeInfo } from '../data/templeData';
import { Sparkles, Search, ShoppingBag, Plus, Minus, Check, Calendar, User, Phone, X, QrCode, Printer, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playTempleBell } from '../utils/soundEffects';

export function VazhipaduBooking({ defaultDeityFilter = 'All', isDrawerOpen, onCloseDrawer }) {
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
    specialPrayer: ''
  });

  const categories = ['All', 'Payasam & Nivedyam', 'Pushpanjali & Archana', 'Vilakku & Deepam', 'Special Poojas', 'Homam & Havans'];
  const deitiesList = ['All', 'Sree Bhadra Bhagavathy', 'Lord Ganapathi', 'Nagaraja & Nagayakshi', 'Brahmarakshas & Yogeeswaran'];

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

  const handleOpenBookingForm = () => {
    if (cartItems.length === 0) return;
    setShowCheckoutModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const token = 'BT-' + Math.floor(100000 + Math.random() * 900000);
    const confirmation = {
      token,
      ...formData,
      items: cartItems,
      totalAmount,
      bookingTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };
    setBookingConfirmed(confirmation);

    // Play celebration confetti & bell
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    playTempleBell(1.0);
  };

  const handleResetBooking = () => {
    setCart({});
    setBookingConfirmed(null);
    setShowCheckoutModal(false);
  };

  return (
    <section id="vazhipadu" className="section-padding vazhipadu-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">
            <Sparkles size={15} /> വിശുദ്ധ വഴിപാടുകൾ • Holy Offerings
          </span>
          <h2 className="section-title">വഴിപാട് സമർപ്പണം</h2>
          <h3 className="section-title-ml">Sacred Pooja & Vazhipadu Booking</h3>
          <div className="section-divider">
            <div className="section-divider-line"></div>
            <img src="/lamp-icon.svg" alt="Lamp" width="22" height="22" />
            <div className="section-divider-line"></div>
          </div>
          <p className="section-desc">
            Submit your sacred prayers and book customized offerings for yourself and your loved ones with your birth star (Nakshathram). Receive divine prasadam and blessings of Devi Bhadrakali.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="vazhipadu-filter-bar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search vazhipadu (e.g., കടുംപായസം, Pushpanjali, Homam)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-dropdowns">
            <div className="filter-select-group">
              <label>Deity:</label>
              <select 
                value={selectedDeity} 
                onChange={(e) => setSelectedDeity(e.target.value)}
                className="temple-select"
              >
                {deitiesList.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="filter-select-group">
              <label>Category:</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="temple-select"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Offerings Grid & Cart Sidebar */}
        <div className="vazhipadu-layout-grid">
          {/* Offerings List */}
          <div className="offerings-grid">
            {filteredOfferings.map((vazh) => {
              const inCartQty = cart[vazh.id] || 0;
              return (
                <div key={vazh.id} className="offering-card kasavu-border-card">
                  {vazh.popular && (
                    <span className="popular-badge">
                      <Sparkles size={12} /> ജനപ്രിയ വഴിപാട്
                    </span>
                  )}

                  <div className="offering-card-body">
                    <div className="offering-deity-tag">{vazh.deity}</div>
                    <h4 className="offering-title-ml text-malayalam">{vazh.nameMl}</h4>
                    <h5 className="offering-title-en">{vazh.nameEn}</h5>
                    <p className="offering-desc">{vazh.desc}</p>
                  </div>

                  <div className="offering-card-footer">
                    <div className="offering-price-box">
                      <span className="price-currency">₹</span>
                      <span className="price-num">{vazh.price}</span>
                      <span className="price-unit">/ {vazh.unit}</span>
                    </div>

                    <div className="offering-action-buttons">
                      {inCartQty > 0 ? (
                        <div className="qty-controls">
                          <button 
                            className="qty-btn" 
                            onClick={() => removeFromCart(vazh.id)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="qty-value">{inCartQty}</span>
                          <button 
                            className="qty-btn" 
                            onClick={() => addToCart(vazh.id)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      ) : (
                        <button 
                          className="btn-add-offering"
                          onClick={() => addToCart(vazh.id)}
                        >
                          <Plus size={15} />
                          <span>ചേർക്കുക (Add)</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredOfferings.length === 0 && (
              <div className="no-offerings-found">
                <p>No vazhipadu found matching your search criteria. Please try a different search or filter.</p>
              </div>
            )}
          </div>

          {/* Cart Floating / Sticky Bar */}
          <div className="cart-sidebar-wrapper">
            <div className="cart-sidebar kasavu-border-card">
              <div className="cart-sidebar-header">
                <ShoppingBag size={20} className="text-gold" />
                <h4 className="cart-title">തിരഞ്ഞെടുത്ത വഴിപാടുകൾ (Your Selection)</h4>
                <span className="cart-count-badge">{cartItems.length}</span>
              </div>

              {cartItems.length === 0 ? (
                <div className="cart-empty-state">
                  <img src="/lamp-icon.svg" alt="Lamp" width="38" className="empty-cart-icon" />
                  <p>നിങ്ങൾ ഇതുവരെ വഴിപാടുകൾ ഒന്നും തിരഞ്ഞെടുത്തിട്ടില്ല.</p>
                  <span>Select any sacred offering from the list above to proceed with booking.</span>
                </div>
              ) : (
                <div className="cart-filled-state">
                  <ul className="cart-item-list">
                    {cartItems.map((item) => (
                      <li key={item.id} className="cart-item-row">
                        <div className="cart-item-info">
                          <span className="cart-item-name-ml text-malayalam">{item.nameMl}</span>
                          <span className="cart-item-rate">₹{item.price} × {item.qty}</span>
                        </div>
                        <div className="cart-item-subtotal">
                          <span>₹{item.subtotal}</span>
                          <button 
                            className="cart-remove-icon"
                            onClick={() => {
                              const copy = { ...cart };
                              delete copy[item.id];
                              setCart(copy);
                            }}
                            title="Remove"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="cart-summary-box">
                    <div className="cart-total-row">
                      <span>ആകെ തുക (Total Amount):</span>
                      <strong className="cart-total-value">₹{totalAmount}</strong>
                    </div>

                    <button 
                      className="btn-gold cart-checkout-btn"
                      onClick={handleOpenBookingForm}
                    >
                      <Sparkles size={17} />
                      <span>ബുക്കിംഗ് പൂർത്തിയാക്കുക (Proceed)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Booking Form Modal */}
        {showCheckoutModal && (
          <div className="modal-overlay" onClick={() => !bookingConfirmed && setShowCheckoutModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <h3 className="modal-title text-malayalam">ഭക്തജന വിവരങ്ങൾ (Devotee Sankalpam)</h3>
                  <p className="modal-subtitle">Enter devotee's holy birth star and details for temple sankalpam archana.</p>
                </div>
                <button 
                  className="modal-close-btn"
                  onClick={() => setShowCheckoutModal(false)}
                >
                  <X size={20} />
                </button>
              </div>

              {!bookingConfirmed ? (
                <form onSubmit={handleFormSubmit} className="checkout-form">
                  <div className="form-group">
                    <label className="form-label">
                      <User size={15} /> ഭക്തന്റെ പേര് (Devotee Name) *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enter full name of the devotee"
                      value={formData.devoteeName}
                      onChange={(e) => setFormData({ ...formData, devoteeName: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">
                        <Sparkles size={15} /> ജന്മ നക്ഷത്രം (Birth Star) *
                      </label>
                      <select 
                        required
                        value={formData.nakshathram}
                        onChange={(e) => setFormData({ ...formData, nakshathram: e.target.value })}
                        className="form-input"
                      >
                        {nakshathras.map((n) => (
                          <option key={n.id} value={n.en}>
                            {n.en} ({n.ml})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Calendar size={15} /> വഴിപാട് തീയതി (Offering Date) *
                      </label>
                      <input 
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.poojaDate}
                        onChange={(e) => setFormData({ ...formData, poojaDate: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">
                        <Phone size={15} /> ഫോൺ നമ്പർ (Mobile Number) *
                      </label>
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
                      <label className="form-label">Email ID (For Receipt)</label>
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
                    <label className="form-label">പ്രത്യേക പ്രാർത്ഥന (Special Prayer / Sankalpam)</label>
                    <input 
                      type="text"
                      placeholder="e.g. For health, marriage blessings, education success, job..."
                      value={formData.specialPrayer}
                      onChange={(e) => setFormData({ ...formData, specialPrayer: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  {/* Postal Prasadam Option */}
                  <div className="postal-checkbox-card">
                    <label className="checkbox-container">
                      <input 
                        type="checkbox"
                        checked={formData.postalPrasadam}
                        onChange={(e) => setFormData({ ...formData, postalPrasadam: e.target.checked })}
                      />
                      <span className="checkbox-label">
                        പ്രസാദം തപാലിൽ ലഭിക്കണം (Deliver holy prasadam by Speed Post / Courier)
                      </span>
                    </label>

                    {formData.postalPrasadam && (
                      <div className="postal-address-input mt-2">
                        <textarea 
                          required
                          rows="2"
                          placeholder="Complete Postal Address with Pincode..."
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="form-input"
                        ></textarea>
                      </div>
                    )}
                  </div>

                  {/* Booking Summary Box */}
                  <div className="checkout-summary-pill">
                    <span>Total Amount: <strong>₹{totalAmount}</strong></span>
                    <span>Offerings: {cartItems.length} items</span>
                  </div>

                  <button type="submit" className="btn-gold modal-submit-btn">
                    <ShieldCheck size={18} />
                    <span>സങ്കല്പം ഉറപ്പിക്കുക (Confirm & Generate Receipt)</span>
                  </button>
                </form>
              ) : (
                /* Confirmed Booking Receipt & UPI Payment */
                <div className="receipt-view">
                  <div className="receipt-success-banner">
                    <Check size={28} className="success-check-icon" />
                    <h4 className="receipt-success-title text-malayalam">വഴിപാട് ബുക്കിംഗ് വിജയകരമായി രേഖപ്പെടുത്തി!</h4>
                    <p className="receipt-token">Token No: <strong>{bookingConfirmed.token}</strong></p>
                  </div>

                  <div className="receipt-printable-card">
                    <div className="receipt-temple-heading">
                      <h4 className="text-malayalam">{templeInfo.nameMl}</h4>
                      <p>{templeInfo.nameEn}</p>
                      <small>{templeInfo.location}</small>
                    </div>

                    <hr className="receipt-divider" />

                    <div className="receipt-meta-grid">
                      <div><strong>Devotee:</strong> {bookingConfirmed.devoteeName}</div>
                      <div><strong>Nakshathram:</strong> {bookingConfirmed.nakshathram}</div>
                      <div><strong>Pooja Date:</strong> {bookingConfirmed.poojaDate}</div>
                      <div><strong>Phone:</strong> {bookingConfirmed.phone}</div>
                    </div>

                    <table className="receipt-table">
                      <thead>
                        <tr>
                          <th>Vazhipadu Offering</th>
                          <th>Qty</th>
                          <th style={{ textAlign: 'right' }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookingConfirmed.items.map((it) => (
                          <tr key={it.id}>
                            <td>{it.nameMl} ({it.nameEn})</td>
                            <td>{it.qty}</td>
                            <td style={{ textAlign: 'right' }}>₹{it.subtotal}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th colSpan="2">ആകെ തുക (Grand Total)</th>
                          <th style={{ textAlign: 'right', color: 'var(--primary-red)' }}>₹{bookingConfirmed.totalAmount}</th>
                        </tr>
                      </tfoot>
                    </table>

                    {/* Instant UPI Payment Box */}
                    <div className="upi-payment-box">
                      <div className="upi-qr-wrapper">
                        {/* High-contrast generated SVG QR Representation */}
                        <div className="qr-simulated-code">
                          <QrCode size={110} />
                          <small>Scan with GPay / PhonePe / Paytm</small>
                        </div>
                      </div>

                      <div className="upi-text-info">
                        <h5>Temple Official UPI ID</h5>
                        <p className="upi-id-badge">{templeInfo.upiId}</p>
                        <p className="upi-instruction">
                          Pay <strong>₹{bookingConfirmed.totalAmount}</strong> using any UPI App with remarks: 
                          <code> {bookingConfirmed.token}</code>
                        </p>
                        <div className="bank-short">
                          <span>SBI Karunagappally A/C: <strong>{templeInfo.accountDetails.accountNumber}</strong></span>
                          <span>IFSC: <strong>{templeInfo.accountDetails.ifscCode}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="receipt-actions">
                    <button 
                      className="btn-secondary"
                      onClick={() => window.print()}
                    >
                      <Printer size={16} />
                      <span>Print Receipt (പ്രിന്റ് ചെയ്യുക)</span>
                    </button>

                    <button 
                      className="btn-gold"
                      onClick={handleResetBooking}
                    >
                      <span>പൂർത്തിയായി (Done)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
