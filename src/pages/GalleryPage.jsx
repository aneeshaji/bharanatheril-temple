import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { 
  Image as ImageIcon, 
  Sparkles, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Camera 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function GalleryPage({ onNavigate }) {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState(null);

  const galleryItems = [
    {
      id: 1,
      titleMl: "ശ്രീ ഭദ്ര ഭഗവതി വിഗ്രഹം",
      titleEn: "Presiding Deity Sree Bhadrakali Sanctum",
      category: "Sanctum",
      src: "/images/devi-bhadrakali.jpg",
      caption: "Divine mother Sree Bhadrakali adorned in golden ornaments and silk pattada."
    },
    {
      id: 2,
      titleMl: "മഹാ പൊങ്കാല മഹോത്സവം",
      titleEn: "Maha Pongala Devotee Gathering",
      category: "Festivals",
      src: "/images/festival-pongala.jpg",
      caption: "Thousands of women devotees offering sweet rice porridge during the annual festival."
    },
    {
      id: 3,
      titleMl: "ശ്രീകോവിൽ ദീപാരാധന",
      titleEn: "Sanctum Sanctorum & Traditional Deeparadhana",
      category: "Sanctum",
      src: "/images/hero-sanctum.jpg",
      caption: "The radiant glow of five-tiered brass lamps during dusk deeparadhana."
    },
    {
      id: 4,
      titleMl: "പവിത്രമായ സർപ്പക്കാവ്",
      titleEn: "Sacred Serpent Grove (Sarpa Kavu)",
      category: "Sarpa Kavu",
      src: "/images/sarpa-kavu.jpg",
      caption: "Ancient serpent shrines nestled amidst lush holy trees and herbal flora."
    },
    {
      id: 5,
      titleMl: "ക്ഷേത്ര വാസ്തുശില്പം",
      titleEn: "Temple Chuttambalam Architecture",
      category: "Architecture",
      src: "/images/temple-exterior.jpg",
      caption: "Traditional Kerala Vastu structure illuminated by golden twilight lamps."
    }
  ];

  const categories = ['All', 'Sanctum', 'Festivals', 'Sarpa Kavu', 'Architecture'];

  const filteredItems = galleryItems.filter(item => 
    activeCategory === 'All' || item.category === activeCategory
  );

  const handleOpenLightbox = (item) => {
    setLightboxImage(item);
  };

  const handleNext = () => {
    if (!lightboxImage) return;
    const currentIndex = filteredItems.findIndex(i => i.id === lightboxImage.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setLightboxImage(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!lightboxImage) return;
    const currentIndex = filteredItems.findIndex(i => i.id === lightboxImage.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightboxImage(filteredItems[prevIndex]);
  };

  return (
    <div className="inner-page-view gallery-page">
      <PageHeader 
        titleEn="Sacred Temple Gallery"
        titleMl="ക്ഷേത്ര ദൃശ്യങ്ങൾ & ചിത്രശാല"
        subtitle={lang === 'en' 
          ? "Visual glimpses of Bharanatheril Temple sanctum, grand festivals, deeparadhana, and Sarpa Kavu"
          : "ഭരണത്തേരിൽ ക്ഷേത്ര ശ്രീകോവിൽ, ഉത്സവങ്ങൾ, ദീപാരാധന, സർപ്പക്കാവ് എന്നിവയുടെ പുണ്യ ദൃശ്യങ്ങൾ"}
        breadcrumb={lang === 'en' ? "Gallery" : "ചിത്രശാല"}
        onNavigate={onNavigate}
      />

      <div className="container inner-page-container">
        {/* Category Filter Chips */}
        <div className="gallery-categories-bar">
          {categories.map((cat) => {
            const catLabel = cat === 'All' ? t('allVisuals') : (
              lang === 'ml' ? ({
                'Sanctum': t('sanctumCat'),
                'Festivals': t('festivalsCat'),
                'Sarpa Kavu': t('sarpaKavuCat'),
                'Architecture': t('architectureCat')
              }[cat] || cat) : cat
            );
            return (
              <button
                key={cat}
                className={`gallery-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {catLabel}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-masonry-grid">
          {filteredItems.map((item) => {
            const itemCatLabel = lang === 'ml' ? ({
              'Sanctum': t('sanctumCat'),
              'Festivals': t('festivalsCat'),
              'Sarpa Kavu': t('sarpaKavuCat'),
              'Architecture': t('architectureCat')
            }[item.category] || item.category) : item.category;

            return (
              <div 
                key={item.id} 
                className="gallery-card kasavu-border-card"
                onClick={() => handleOpenLightbox(item)}
              >
                <div className="gallery-card-media">
                  <img src={item.src} alt={item.titleEn} className="gallery-img" />
                  <div className="gallery-card-overlay">
                    <div className="overlay-icon-wrap">
                      <Maximize2 size={24} />
                    </div>
                    <div className="overlay-info">
                      <span className="overlay-cat">{itemCatLabel}</span>
                      <h4 className={lang === 'ml' ? "text-malayalam" : ""} style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>
                        {lang === 'en' ? item.titleEn : item.titleMl}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fullscreen Lightbox Modal */}
        {lightboxImage && (
          <div className="modal-overlay lightbox-overlay" onClick={() => setLightboxImage(null)}>
            <div className="lightbox-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="lightbox-close-btn" onClick={() => setLightboxImage(null)}>
                <X size={24} />
              </button>

              <button className="lightbox-nav-btn prev" onClick={handlePrev} aria-label="Previous image">
                <ChevronLeft size={28} />
              </button>

              <div className="lightbox-media-wrapper">
                <img 
                  src={lightboxImage.src} 
                  alt={lightboxImage.titleEn} 
                  className="lightbox-full-img"
                />
                <div className="lightbox-caption-bar">
                  <h3 className={lang === 'ml' ? "text-malayalam" : ""} style={{ fontSize: '1.25rem', marginBottom: '0.2rem' }}>
                    {lang === 'en' ? lightboxImage.titleEn : lightboxImage.titleMl}
                  </h3>
                  <p>{lightboxImage.caption}</p>
                </div>
              </div>

              <button className="lightbox-nav-btn next" onClick={handleNext} aria-label="Next image">
                <ChevronRight size={28} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
