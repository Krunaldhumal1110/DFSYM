import type { Lang } from '../i18n/lang';

export type LocalizedText = Partial<Record<Lang, string>> & { en: string };

export interface Guest {
  name: LocalizedText;
  role?: LocalizedText;
}

export interface Award {
  title: LocalizedText;
  images?: string[];
}

export interface CelebrationYear {
  year: number;
  banner: string;
  theme: LocalizedText;
  themeInfo: LocalizedText;
  awards?: Award[];
  guests?: Guest[];
  photos: string[];
  videos: string[];
}


export function getLocalizedText(text: LocalizedText | string, lang: Lang): string {
  if (typeof text === 'string') return text;
  return text[lang] || text.en;
}
