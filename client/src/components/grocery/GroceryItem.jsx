import useLanguageStore from '../../store/languageStore';
import { toBengaliNumber } from '../../i18n/translations';

export default function GroceryItem({ item, onToggle }) {
  const { language } = useLanguageStore();

  return (
    <button
      onClick={() => onToggle(item)}
      className={`w-full flex items-center gap-3 py-3 border-b border-gray-100 last:border-0 text-left transition-opacity ${
        item.is_checked ? 'opacity-40' : ''
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
          item.is_checked ? 'bg-terracotta border-terracotta' : 'border-gray-300'
        }`}
      >
        {item.is_checked && <div className="w-2 h-2 bg-white rounded-full" />}
      </div>
      <div className="flex-1">
        <span
          className={`text-xs sm:text-sm font-semibold text-charcoal capitalize ${
            item.is_checked ? 'line-through text-gray-400' : ''
          }`}
        >
          {item.name}
        </span>
      </div>
      <span className="text-xs font-bold text-gray-500">
        {toBengaliNumber(item.total_quantity, language)} {item.unit}
      </span>
    </button>
  );
}
