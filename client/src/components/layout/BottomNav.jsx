import { NavLink } from 'react-router-dom';
import { Home, Calendar, ShoppingCart, Package, User } from 'lucide-react';
import useLanguageStore from '../../store/languageStore';
import { translations } from '../../i18n/translations';

export default function BottomNav() {
  const { language } = useLanguageStore();
  const t = translations[language] || translations.en;

  const tabs = [
    { to: '/', icon: Home, label: t.nav.home },
    { to: '/planner', icon: Calendar, label: t.nav.planner },
    { to: '/grocery', icon: ShoppingCart, label: t.nav.grocery },
    { to: '/pantry', icon: Package, label: t.nav.pantry },
    { to: '/profile', icon: User, label: t.nav.profile },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-shell bg-white/95 dark:bg-[#1C1C1A]/95 backdrop-blur border-t border-gray-100 dark:border-neutral-800 z-50 transition-colors">
      <div className="flex justify-around items-center h-16">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-2 transition-colors ${
                isActive
                  ? 'text-terracotta font-semibold'
                  : 'text-gray-400 dark:text-neutral-500 hover:text-charcoal dark:hover:text-white'
              }`
            }
          >
            <Icon size={20} />
            <span className="text-[10px] tracking-tight">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
