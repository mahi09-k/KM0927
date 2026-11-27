import { useState, useEffect } from 'react';
import { fetchGroceryList, toggleGroceryCheck } from '../../api';
import GroceryItem from './GroceryItem';
import useLanguageStore from '../../store/languageStore';
import { translations } from '../../i18n/translations';

function getCurrentWeek() {
  const now = new Date();
  const year = now.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const weekNum = Math.ceil(((now - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
  return `${year}-W${String(weekNum).padStart(2, '0')}`;
}

const DEPT_ICONS = {
  Produce: '🥦',
  Dairy: '🥛',
  Pantry: '🫙',
  'Meat/Seafood': '🐟',
};

export default function GroceryList() {
  const { language } = useLanguageStore();
  const t = translations[language] || translations.en;
  const [week] = useState(getCurrentWeek());
  const [grouped, setGrouped] = useState({});
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetchGroceryList(week)
      .then((r) => setGrouped(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [week]);

  const handleToggle = async (item) => {
    await toggleGroceryCheck(item.item_key, !item.is_checked);
    load();
  };

  const departments = Object.keys(grouped);

  if (loading)
    return (
      <div className="px-5 mt-8 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-softgray rounded-3xl animate-pulse" />
        ))}
      </div>
    );

  if (departments.length === 0)
    return (
      <div className="px-5 mt-16 text-center text-gray-400">
        <p className="text-5xl mb-3">🛒</p>
        <p className="font-bold text-base text-charcoal">{t.grocery.emptyTitle}</p>
        <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto leading-relaxed">
          {t.grocery.emptySubtitle}
        </p>
      </div>
    );

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
      {departments.map((dept) => {
        const deptLabel = t.grocery.departments[dept] || dept;
        return (
          <div key={dept} className="bg-white dark:bg-[#1C1C1A] rounded-3xl p-5 shadow-xs border border-black/5 dark:border-white/5 transition-colors">
            <h3 className="font-display font-bold text-charcoal dark:text-white mb-3 flex items-center gap-2 text-base">
              <span className="text-xl">{DEPT_ICONS[dept] || '🛍️'}</span> {deptLabel}
            </h3>
            <div className="space-y-2">
              {grouped[dept].map((item) => (
                <GroceryItem key={item.item_key} item={item} onToggle={handleToggle} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
