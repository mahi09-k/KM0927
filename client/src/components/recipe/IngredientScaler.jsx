import useLanguageStore from '../../store/languageStore';
import { translations, toBengaliNumber } from '../../i18n/translations';
import { translateIngredient } from '../../i18n/recipeTranslations';

export default function IngredientScaler({ ingredients, baseServings, currentServings }) {
  const { language } = useLanguageStore();
  const t = translations[language] || translations.en;
  const scale = (currentServings || 1) / (baseServings || 1);

  const formatQty = (qty) => {
    const num = parseFloat(qty) || 0;
    const scaled = num * scale;
    const formatted = scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(1);
    return toBengaliNumber(formatted, language);
  };

  const deptColors = {
    Produce: 'bg-green-50 text-green-700',
    Dairy: 'bg-blue-50 text-blue-700',
    Pantry: 'bg-amber-50 text-amber-700',
    'Meat/Seafood': 'bg-red-50 text-red-700',
  };

  return (
    <ul className="space-y-2">
      {ingredients.map((ing) => (
        <li key={ing.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-neutral-800 last:border-0">
          <span className="text-charcoal dark:text-neutral-200 font-medium text-sm capitalize">{translateIngredient(ing.name, language)}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">
              {formatQty(ing.base_quantity)} {ing.unit}
            </span>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${deptColors[ing.department] || 'bg-gray-100 text-gray-600'}`}>
              {t.grocery?.departments?.[ing.department] || ing.department}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
