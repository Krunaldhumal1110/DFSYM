import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Lang = 'en' | 'hi';

const translations: Record<Lang, { [key: string]: string }> = {
  en: {
    home: 'Home',
    gallery: 'Gallery',
    about: 'About',
    contact: 'Contact',
    aboutUs: 'About Us',
    yearlyConcepts: 'Yearly Ganesh Decoration Concepts',
    photoGallery: 'Photo Gallery',
    videoGallery: 'Video Gallery',
    notFound: 'Year not found.',
    back: 'Back',
    // ...add more as needed
  },
  hi: {
    home: 'होम',
    gallery: 'गैलरी',
    about: 'परिचय',
    contact: 'संपर्क',
    aboutUs: 'हमारे बारे में',
    yearlyConcepts: 'वार्षिक गणेश सजावट अवधारणाएँ',
    photoGallery: 'फोटो गैलरी',
    videoGallery: 'वीडियो गैलरी',
    notFound: 'वर्ष नहीं मिला।',
    back: 'वापस',
    // ...add more as needed
  }
};

export const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }>({ lang: 'en', setLang: () => {}, t: (k: string) => k });

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('en');
  const t = (k: string) => translations[lang][k] || k;
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
