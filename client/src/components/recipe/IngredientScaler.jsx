import useLanguageStore from '../../store/languageStore';
import { translations, toBengaliNumber } from '../../i18n/translations';
import { translateIngredient, translateUnit, convertQuantityAndUnit } from '../../i18n/recipeTranslations';

export default function IngredientScaler({ ingredients = [], baseServings = 4, currentServings = 4, unitSystem = 'M' }) {
  const { language } = useLanguageStore();
  const t = translations[language] || translations.en;
  const scale = (currentServings || 1) / (baseServings || 1);

  const deptColors = {
    Produce: 'bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300',
    Dairy: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300',
    Pantry: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300',
    'Meat/Seafood': 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300',
  };

  return (
    <ul className="space-y-2">
      {ingredients.map((ing) => {
        // Calculate dynamically scaled quantity
        const rawScaled = (parseFloat(ing.base_quantity) || 0) * scale;
        // Convert between Metric (M) and US Customary (US)
        const { quantity, unit } = convertQuantityAndUnit(rawScaled, ing.unit, unitSystem);
        const formattedQty = toBengaliNumber(quantity, language);
        const localizedUnit = translateUnit(unit, language);

        return (
          <li
            key={ing.id || ing.name}
            className="flex items-center justify-between py-2.5 border-b border-gray-100 dark:border-neutral-800/80 last:border-0 hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors"
          >
            <span className="text-charcoal dark:text-neutral-200 font-medium text-sm capitalize">
              {translateIngredient(ing.name, language)}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-charcoal dark:text-white tabular-nums tracking-tight">
                {formattedQty} {localizedUnit}
              </span>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  deptColors[ing.department] || 'bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-300'
                }`}
              >
                {t.grocery?.departments?.[ing.department] || ing.department}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
