import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { translations } from './i18n/translations';
export type { Lang } from './i18n/lang';
import type { Lang } from './i18n/lang';

export const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: string) => string;
}>({
  lang: 'en',
  setLang: () => {},
  t: (k: string) => k,
});

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('dfsym-lang');
    if (saved === 'en' || saved === 'hi' || saved === 'mr' || saved === 'gu') return saved;
    return 'en';
  });

  const setLangPersist = (l: Lang) => {
    setLang(l);
    localStorage.setItem('dfsym-lang', l);
    document.documentElement.lang = l === 'gu' ? 'gu' : l === 'hi' ? 'hi' : l === 'mr' ? 'mr' : 'en';
  };

  const t = (k: string) => translations[lang][k] || translations.en[k] || k;

  return (
    <LangContext.Provider value={{ lang, setLang: setLangPersist, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
