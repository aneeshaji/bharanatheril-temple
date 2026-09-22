import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = [
  {
    id: 'sapphire',
    nameEn: 'Divine Sapphire',
    nameMl: 'ദിവ്യ നീലാംബരി',
    color: '#2563eb',
    accent: '#d49a1d',
    meta: '#0b192e',
    descriptionEn: 'Deep Royal Sapphire & 24K Temple Gold'
  },
  {
    id: 'emerald',
    nameEn: 'Sacred Emerald',
    nameMl: 'വിശുദ്ധ മരതകം',
    color: '#059669',
    accent: '#d49a1d',
    meta: '#022c22',
    descriptionEn: 'Sacred Malabar Forest & 24K Temple Gold'
  },
  {
    id: 'saffron',
    nameEn: 'Temple Saffron',
    nameMl: 'ക്ഷേത്ര കാവി',
    color: '#ea580c',
    accent: '#d49a1d',
    meta: '#431407',
    descriptionEn: 'Vedic Ochre Fire & 24K Temple Gold'
  },
  {
    id: 'wine',
    nameEn: 'Sanctum Wine',
    nameMl: 'ശ്രീകോവിൽ ചുവപ്പ്',
    color: '#be123c',
    accent: '#d49a1d',
    meta: '#4e0513',
    descriptionEn: 'Royal Imperial Wine & 24K Temple Gold'
  }
];

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('bharanatheril_theme');
      if (saved && THEMES.some(t => t.id === saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    // Default to the new vibrant Divine Sapphire & Gold theme
    return 'sapphire';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    try {
      localStorage.setItem('bharanatheril_theme', currentTheme);
    } catch {
      // ignore
    }

    // Update meta theme-color in head
    const activeMeta = THEMES.find(t => t.id === currentTheme)?.meta || '#0b192e';
    const metaTag = document.querySelector('meta[name="theme-color"]');
    if (metaTag) {
      metaTag.setAttribute('content', activeMeta);
    }
  }, [currentTheme]);

  const setTheme = (themeId) => {
    if (THEMES.some(t => t.id === themeId)) {
      setCurrentTheme(themeId);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
