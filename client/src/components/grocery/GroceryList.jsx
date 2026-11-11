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
    <div className="px-5 mt-2 space-y-4">
      {departments.map((dept) => {
        const deptLabel = t.grocery.departments[dept] || dept;
        return (
          <div key={dept} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-display font-bold text-charcoal mb-2 flex items-center gap-2 text-base">
              <span>{DEPT_ICONS[dept] || '🛍️'}</span> {deptLabel}
            </h3>
            {grouped[dept].map((item) => (
              <GroceryItem key={item.item_key} item={item} onToggle={handleToggle} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
