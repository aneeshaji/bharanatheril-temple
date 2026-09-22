import React, { useState } from 'react';
import { Sparkles, Maximize2, X } from 'lucide-react';

export function TempleGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const galleryItems = [
    {
      id: 1,
      src: '/images/hero-sanctum.jpg',
      titleMl: 'ശ്രീകോവിലും നിലവിളക്കുകളും',
      titleEn: 'Sanctum Sanctorum & Nilavilakku',
      desc: 'Glowing multi-tiered bronze lamps and teak wood carvings inside the sanctum.',
      category: 'Sanctum'
    },
    {
      id: 2,
      src: '/images/devi-bhadrakali.jpg',
      titleMl: 'ശ്രീ ഭദ്രകാളി ദേവീ സങ്കല്പം',
      titleEn: 'Divine Mother Sree Bhadrakali',
      desc: 'Sacred artistic portrayal of Devi Bhadrakali crowned in gold and divine compassion.',
      category: 'Deity'
    },
    {
      id: 3,
      src: '/images/temple-exterior.jpg',
      titleMl: 'സന്ധ്യാ ദീപാരാധനയും ചുറ്റുവിളക്കും',
      titleEn: 'Chuttuvilakku at Twilight',
      desc: 'Golden rows of lamps illuminating the traditional Kerala tile-roofed Chuttambalam.',
      category: 'Architecture'
    },
    {
      id: 4,
      src: '/images/festival-pongala.jpg',
      titleMl: 'മഹാ പൊങ്കാല മഹോത്സവം',
      titleEn: 'Maha Pongala Mahotsavam',
      desc: 'Women devotees offering sweet rice porridge in decorated earthen pots over sacred fires.',
      category: 'Festivals'
    },
    {
      id: 5,
      src: '/images/sarpa-kavu.jpg',
      titleMl: 'പവിത്രമായ സർപ്പക്കാവ്',
      titleEn: 'Sacred Sarpa Kavu Shrine',
      desc: 'Nagaraja and Nagayakshi idols sprinkled with turmeric under the holy banyan tree.',
      category: 'Shrines'
    }
  ];

  const categories = ['All', 'Sanctum', 'Deity', 'Architecture', 'Festivals', 'Shrines'];

  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="section-padding gallery-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">
            <Sparkles size={15} /> ചിത്രശാല • Sacred Gallery
          </span>
          <h2 className="section-title">ക്ഷേത്ര ദൃശ്യവിസ്മയം</h2>
          <h3 className="section-title-ml">Visual Sanctuary & Divine Moments</h3>
          <div className="section-divider">
            <div className="section-divider-line"></div>
            <img src="/lamp-icon.svg" alt="Lamp" width="22" height="22" />
            <div className="section-divider-line"></div>
          </div>
          <p className="section-desc">
            Immerse yourself in the serene spiritual atmosphere, sanctified rituals, festive lights, and sacred architecture of Bharanatheril Temple.
          </p>
        </div>

        {/* Gallery Filter Pills */}
        <div className="gallery-filter-row">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`gallery-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Masonry / Grid */}
        <div className="gallery-grid">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="gallery-item-card kasavu-border-card"
              onClick={() => setSelectedImage(item)}
            >
              <div className="gallery-thumb-wrapper">
                <img src={item.src} alt={item.titleEn} className="gallery-thumb-img" />
                <div className="gallery-overlay">
                  <span className="expand-icon-btn">
                    <Maximize2 size={20} />
                  </span>
                  <div className="gallery-overlay-text">
                    <h5 className="text-malayalam">{item.titleMl}</h5>
                    <small>{item.titleEn}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
            <div className="lightbox-modal-content" onClick={(e) => e.stopPropagation()}>
              <button 
                className="lightbox-close-btn"
                onClick={() => setSelectedImage(null)}
                aria-label="Close image"
              >
                <X size={24} />
              </button>

              <div className="lightbox-img-wrapper">
                <img src={selectedImage.src} alt={selectedImage.titleEn} className="lightbox-full-img" />
              </div>

              <div className="lightbox-caption">
                <h4 className="lightbox-title-ml text-malayalam">{selectedImage.titleMl}</h4>
                <h5 className="lightbox-title-en">{selectedImage.titleEn}</h5>
                <p className="lightbox-desc">{selectedImage.desc}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
