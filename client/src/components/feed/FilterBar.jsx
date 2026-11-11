import useLanguageStore from '../../store/languageStore';
import { translations } from '../../i18n/translations';

export default function FilterBar({ active, onSelect }) {
  const { language } = useLanguageStore();
  const t = translations[language] || translations.en;

  const filters = [
    { label: t.filters.all, type: 'all', value: '' },
    { label: t.filters.bangladeshi, type: 'cuisine', value: 'bangladeshi' },
    { label: t.filters.indian, type: 'cuisine', value: 'indian' },
    { label: t.filters.western, type: 'cuisine', value: 'western' },
    { label: t.filters.under30, type: 'filter', value: 'under30' },
    { label: t.filters.vegetarian, type: 'filter', value: 'vegetarian' },
    { label: t.filters.highprotein, type: 'filter', value: 'highprotein' },
    { label: t.filters.rice, type: 'category', value: 'rice' },
    { label: t.filters.seafood, type: 'category', value: 'seafood' },
    { label: t.filters.meat, type: 'category', value: 'meat' },
    { label: t.filters.dessert, type: 'category', value: 'dessert' },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide px-5 pb-2">
      {filters.map((f) => {
        const isSelected = active.type === f.type && active.value === f.value;
        return (
          <button
            key={f.type + f.value}
            onClick={() => onSelect(f)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all border ${
              isSelected
                ? 'bg-terracotta text-white border-terracotta shadow-md scale-105'
                : 'bg-white text-charcoal border-gray-200 hover:border-terracotta/50'
            }`}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
