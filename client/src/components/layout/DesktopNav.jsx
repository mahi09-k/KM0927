import { NavLink, Link } from 'react-router-dom';
import { Home, Calendar, ShoppingCart, Package, User, Sun, Moon } from 'lucide-react';
import LanguageSelector from '../common/LanguageSelector';
import UserAvatar from '../common/UserAvatar';
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../store/authStore';
import useLanguageStore from '../../store/languageStore';
import { translations } from '../../i18n/translations';

export default function DesktopNav() {
  const { theme, toggleTheme } = useThemeStore();
  const { currentUser, openAuthModal } = useAuthStore();
  const { language } = useLanguageStore();
  const t = translations[language] || translations.en;

  const navItems = [
    { to: '/', icon: Home, label: t.nav.home },
    { to: '/planner', icon: Calendar, label: t.nav.planner },
    { to: '/grocery', icon: ShoppingCart, label: t.nav.grocery },
    { to: '/pantry', icon: Package, label: t.nav.pantry },
    { to: '/profile', icon: User, label: t.nav.profile },
  ];

  return (
    <nav className="hidden md:block sticky top-0 z-50 bg-white/90 dark:bg-[#151514]/90 backdrop-blur-md border-b border-black/5 dark:border-white/5 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-terracotta to-amber-500 flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
            🍳
          </div>
          <div>
            <span className="font-display font-extrabold text-xl text-charcoal dark:text-white tracking-tight">
              SizzleSpoon
            </span>
            <span className="ml-1.5 text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-md bg-terracotta/10 text-terracotta dark:bg-terracotta/20">
              v2.0
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <div className="flex items-center gap-1 lg:gap-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-terracotta/10 text-terracotta dark:bg-terracotta/20 dark:text-orange-400 font-semibold'
                    : 'text-gray-600 dark:text-neutral-400 hover:text-charcoal dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-xl bg-softgray dark:bg-neutral-800 text-charcoal dark:text-amber-400 hover:scale-105 active:scale-95 transition-all shadow-2xs"
            title={
              theme === 'dark'
                ? language === 'bn'
                  ? 'লাইট মোড'
                  : 'Switch to Light Mode'
                : language === 'bn'
                ? 'ডার্ক মোড'
                : 'Switch to Dark Mode'
            }
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Language Selector */}
          <LanguageSelector />

          {/* User Profile / Auth */}
          {currentUser?.name ? (
            <Link
              to="/profile"
              className="flex items-center gap-2.5 pl-2 pr-3 py-1 rounded-full bg-softgray/70 dark:bg-neutral-800/80 hover:bg-softgray dark:hover:bg-neutral-800 transition-all border border-black/5 dark:border-white/5"
            >
              <UserAvatar user={currentUser} size="sm" />
              <span className="text-xs font-semibold text-charcoal dark:text-neutral-200 max-w-[120px] truncate">
                {currentUser.name}
              </span>
            </Link>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="px-4 py-2 rounded-xl bg-terracotta text-white text-xs font-semibold hover:bg-orange-700 transition shadow-sm"
            >
              {language === 'bn' ? 'লগইন' : 'Sign In'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
