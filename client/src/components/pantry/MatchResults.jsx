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
        return { label: t.cuisines.bangladeshi, bg: 'bg-emerald-700' };
      case 'indian':
        return { label: t.cuisines.indian, bg: 'bg-amber-600' };
      case 'western':
        return { label: t.cuisines.western, bg: 'bg-blue-600' };
      default:
        return { label: cuisine, bg: 'bg-terracotta' };
    }
  };

  if (!results || results.length === 0) {
    return (
      <div className="px-5 mt-8 text-center text-gray-400">
        <p className="text-4xl mb-2">🍽️</p>
        <p className="font-semibold text-sm text-charcoal">{t.pantry.emptyResults}</p>
      </div>
    );
  }

  return (
    <div className="px-5 mt-6 space-y-3 pb-8">
      <h2 className="font-display text-xl font-bold text-charcoal">
        {t.pantry.resultsTitle} ({toBengaliNumber(results.length, language)})
      </h2>
      {results.map((r) => {
        const badge = getCuisineBadge(r.cuisine);
        return (
          <div
            key={r.id}
            onClick={() => navigate(`/recipe/${r.id}`)}
            className="flex gap-3 bg-white rounded-3xl p-3.5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
          >
            <img
              src={r.thumbnail_url}
              alt={r.title}
              className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                {r.cuisine && (
                  <span
                    className={`${badge.bg} text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full`}
                  >
                    {translateCuisine(r.cuisine, language)}
                  </span>
                )}
                <span className="text-[10px] text-gray-400 capitalize">{translateCategory(r.category, language)}</span>
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-charcoal leading-snug">
                {translateTitle(r.title, language)}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="flex items-center gap-1 text-[11px] text-gray-400">
                  <Clock size={11} /> {toBengaliNumber((r.prep_time || 0) + (r.cook_time || 0), language)} {t.recipeCard.min}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  <CheckCircle size={11} /> {toBengaliNumber(r.match_count, language)} {t.pantry.matched}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
