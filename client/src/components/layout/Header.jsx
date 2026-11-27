import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import LanguageSelector from '../common/LanguageSelector';
import UserAvatar from '../common/UserAvatar';
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../store/authStore';
import useLanguageStore from '../../store/languageStore';

export default function Header({ title, subtitle, showLang = true, showProfileShortcut = true }) {
  const { theme, toggleTheme } = useThemeStore();
  const { currentUser } = useAuthStore();
  const { language } = useLanguageStore();

  return (
    <header className="px-4 sm:px-6 lg:px-8 pt-5 md:pt-8 pb-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal dark:text-white leading-tight tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-neutral-400 mt-1.5 leading-relaxed max-w-3xl">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex md:hidden items-center gap-2 flex-shrink-0 pt-1">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-1.5 rounded-full bg-softgray dark:bg-neutral-800 text-charcoal dark:text-amber-400 hover:scale-105 active:scale-95 transition-all"
            title={theme === 'dark' ? (language === 'bn' ? 'লাইট মোড' : 'Switch to Light Mode') : (language === 'bn' ? 'ডার্ক মোড' : 'Switch to Dark Mode')}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          {showLang && <LanguageSelector />}
          {showProfileShortcut && (
            <Link
              to="/profile"
              className="rounded-full ring-2 ring-terracotta/30 hover:ring-terracotta transition-all flex-shrink-0"
              title={currentUser?.name || 'Profile'}
            >
              <UserAvatar user={currentUser} size="sm" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
