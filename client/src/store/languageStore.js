import { create } from 'zustand';

const useLanguageStore = create((set) => ({
  language: typeof window !== 'undefined' ? localStorage.getItem('sizzlespoon_lang') || 'en' : 'en',
  setLanguage: (lang) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sizzlespoon_lang', lang);
    }
    set({ language: lang });
  },
  toggleLanguage: () =>
    set((state) => {
      const nextLang = state.language === 'en' ? 'bn' : 'en';
      if (typeof window !== 'undefined') {
        localStorage.setItem('sizzlespoon_lang', nextLang);
      }
      return { language: nextLang };
    }),
}));

export default useLanguageStore;
