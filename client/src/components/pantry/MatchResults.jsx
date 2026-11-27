import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle } from 'lucide-react';
import useLanguageStore from '../../store/languageStore';
import { translations, toBengaliNumber } from '../../i18n/translations';
import { translateTitle, translateCategory, translateCuisine } from '../../i18n/recipeTranslations';

export default function MatchResults({ results }) {
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  const t = translations[language] || translations.en;

  const getCuisineBadge = (cuisine) => {
    switch ((cuisine || '').toLowerCase()) {
      case 'bangladeshi':
        return { label: t.cuisines?.bangladeshi || 'Bangladeshi', bg: 'bg-emerald-700' };
      case 'indian':
        return { label: t.cuisines?.indian || 'Indian', bg: 'bg-amber-600' };
      case 'western':
        return { label: t.cuisines?.western || 'Western', bg: 'bg-blue-600' };
      default:
        return { label: cuisine, bg: 'bg-terracotta' };
    }
  };

  if (!results || results.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-400 dark:text-neutral-500 py-12 bg-white dark:bg-[#1C1C1A] rounded-3xl border border-black/5 dark:border-white/5">
        <p className="text-4xl mb-2">🍽️</p>
        <p className="font-semibold text-sm text-charcoal dark:text-neutral-200">{t.pantry.emptyResults}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-8">
      <h2 className="font-display text-xl font-bold text-charcoal dark:text-white flex items-center justify-between">
        <span>{t.pantry.resultsTitle}</span>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-terracotta/10 text-terracotta">
          {toBengaliNumber(results.length, language)} {t.filters.recipes}
        </span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
        {results.map((r) => {
          const badge = getCuisineBadge(r.cuisine);
          return (
            <div
              key={r.id}
              onClick={() => navigate(`/recipe/${r.id}`)}
              className="flex gap-3.5 bg-white dark:bg-[#1C1C1A] rounded-3xl p-4 shadow-xs border border-black/5 dark:border-white/5 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <img
                src={r.thumbnail_url}
                alt={r.title}
                className="w-24 h-24 rounded-2xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                    {r.cuisine && (
                      <span
                        className={`${badge.bg} text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full`}
                      >
                        {translateCuisine(r.cuisine, language)}
                      </span>
                    )}
                    <span className="text-[10px] text-gray-400 dark:text-neutral-400 capitalize">
                      {translateCategory(r.category, language)}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-charcoal dark:text-white leading-snug line-clamp-1">
                    {translateTitle(r.title, language)}
                  </h3>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="flex items-center gap-1 text-[11px] text-gray-400 dark:text-neutral-400">
                    <Clock size={12} /> {toBengaliNumber((r.prep_time || 0) + (r.cook_time || 0), language)} {t.recipeCard.min}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full">
                    <CheckCircle size={12} /> {toBengaliNumber(r.match_count, language)} {t.pantry.matched}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
