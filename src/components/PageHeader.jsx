import React from 'react';
import { ChevronRight, Home, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function PageHeader({ titleEn, titleMl, subtitle, breadcrumb, onNavigate }) {
  const { lang } = useLanguage();

  return (
    <div className="inner-page-header">
      <div className="inner-page-header-bg">
        <img
          src="/images/hero-sanctum.jpg"
          alt="Bharanatheril Temple Sanctum"
          className="inner-header-bg-img"
        />
        <div className="inner-header-overlay"></div>
        <div className="inner-header-kasavu-line"></div>
      </div>

      <div className="container inner-header-content">
        {/* Breadcrumb */}
        <nav className="inner-breadcrumb" aria-label="Breadcrumb">
          <button className="breadcrumb-link" onClick={() => onNavigate('home')}>
            <Home size={14} />
            <span>{lang === 'en' ? 'Home' : 'ഹോം'}</span>
          </button>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-current">{breadcrumb}</span>
        </nav>

        <div className="inner-header-badge">
          <Sparkles size={14} className="badge-sparkle" />
          <span>
            {lang === 'en'
              ? 'Bharanatheril Sree Bhadra Bhagavathy Temple • Karunagappally'
              : 'ഭരണത്തേരിൽ ശ്രീ ഭദ്ര ഭഗവതി ക്ഷേത്രം • കരുനാഗപ്പള്ളി'}
          </span>
        </div>

        {/* Titles */}
        <h1 className={`inner-header-title-primary ${lang === 'ml' ? 'text-malayalam' : ''}`}>
          {lang === 'en' ? titleEn : titleMl}
        </h1>
        {subtitle && <p className={`inner-header-subtitle ${lang === 'ml' ? 'text-malayalam' : ''}`}>{subtitle}</p>}
      </div>
    </div>
  );
}
