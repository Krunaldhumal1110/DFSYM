import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Simple i18n context for demonstration
export const LangContext = React.createContext<{ lang: 'en' | 'hi'; setLang: React.Dispatch<React.SetStateAction<'en' | 'hi'>> }>({ lang: 'en', setLang: () => {} });


const Header: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <header className="bg-orange-600 text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between py-3 px-2 sm:px-4 gap-2 sm:gap-0">
          <div className="flex items-center gap-2 w-full sm:w-auto min-w-0">
            <Link to="/">
              <img src="/src/assets/logo.png" alt="Ganesh Group Logo" className="h-10 w-10 rounded-full flex-shrink-0" />
            </Link>
            <span className="font-bold text-[13px] xs:text-sm sm:text-xl md:text-2xl tracking-wide block max-w-[60vw] xs:max-w-[70vw] sm:max-w-none whitespace-nowrap overflow-ellipsis sm:whitespace-normal sm:overflow-visible">
              Dakashini Faliya Sarvajanik Yuvak Mandal
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto justify-center sm:justify-end">
            <nav className="flex gap-3 xs:gap-4 sm:gap-6 text-base sm:text-lg">
              <Link to="/" className="hover:text-yellow-300 transition">{lang === 'en' ? 'Home' : 'होम'}</Link>
              <Link to="/gallery" className="hover:text-yellow-300 transition">{lang === 'en' ? 'Gallery' : 'गैलरी'}</Link>
              <Link to="/about" className="hover:text-yellow-300 transition">{lang === 'en' ? 'About' : 'परिचय'}</Link>
              <Link to="/contact" className="hover:text-yellow-300 transition">{lang === 'en' ? 'Contact' : 'संपर्क'}</Link>
            </nav>
            <div className="ml-3 flex gap-1 items-center bg-orange-800 bg-opacity-60 rounded px-2 py-1">
              <button
                className={`text-xs xs:text-sm px-1 font-bold rounded ${lang === 'en' ? 'bg-yellow-300 text-orange-800' : 'text-white'}`}
                onClick={() => setLang('en')}
                aria-label="Switch to English"
              >EN</button>
              <span className="text-white">|</span>
              <button
                className={`text-xs xs:text-sm px-1 font-bold rounded ${lang === 'hi' ? 'bg-yellow-300 text-orange-800' : 'text-white'}`}
                onClick={() => setLang('hi')}
                aria-label="Switch to Hindi"
              >हि</button>
            </div>
          </div>
        </div>
      </header>
    </LangContext.Provider>
  );
};

export default Header;
