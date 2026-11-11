import { create } from 'zustand';

const applyThemeToDOM = (theme) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const body = document.body;

  if (theme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = 'dark';
    if (body) {
      body.classList.add('dark');
      body.classList.remove('light');
    }
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
    root.setAttribute('data-theme', 'light');
    root.style.colorScheme = 'light';
    if (body) {
      body.classList.remove('dark');
      body.classList.add('light');
    }
  }
};

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem('sizzlespoon_theme');
  if (saved === 'dark' || saved === 'light') {
    applyThemeToDOM(saved);
    return saved;
  }
  const prefersDark =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = prefersDark ? 'dark' : 'light';
  applyThemeToDOM(initial);
  return initial;
};

export const useThemeStore = create((set, get) => ({
  theme: getInitialTheme(),
  initTheme: () => {
    const current = get().theme;
    applyThemeToDOM(current);
  },
  toggleTheme: () => {
    const nextTheme = get().theme === 'dark' ? 'light' : 'dark';
    applyThemeToDOM(nextTheme);
    localStorage.setItem('sizzlespoon_theme', nextTheme);
    set({ theme: nextTheme });
  },
  setTheme: (newTheme) => {
    applyThemeToDOM(newTheme);
    localStorage.setItem('sizzlespoon_theme', newTheme);
    set({ theme: newTheme });
  },
}));
