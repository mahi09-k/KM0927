import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, ChevronRight, Bookmark } from 'lucide-react';
import useLanguageStore from '../../store/languageStore';
import { translations, toBengaliNumber } from '../../i18n/translations';
import { translateTitle, translateCategory, translateCuisine } from '../../i18n/recipeTranslations';
import { toggleSaveRecipe } from '../../api';

export default function RecipeCard({ recipe, isSavedDefault = false }) {
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  const t = translations[language] || translations.en;
  const [isSaved, setIsSaved] = useState(isSavedDefault);
  const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);

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

  const badge = getCuisineBadge(recipe.cuisine);

  const handleBookmarkClick = async (e) => {
    e.stopPropagation();
    try {
      const res = await toggleSaveRecipe(recipe.id);
      setIsSaved(res.data.saved);
    } catch (err) {
      console.error('Failed to toggle bookmark:', err);
    }
  };

  return (
    <div
      onClick={() => navigate(`/recipe/${recipe.id}`)}
      className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-white dark:bg-[#1C1C1A] border border-black/5 dark:border-white/5"
    >
      <div className="relative h-60 w-full overflow-hidden bg-softgray dark:bg-neutral-800">
        <img
          src={recipe.thumbnail_url || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800'}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

        {/* Cuisine & Category Badges */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          {recipe.cuisine && (
            <span className={`${badge.bg} text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm`}>
              {translateCuisine(recipe.cuisine, language)}
            </span>
          )}
          <span className="bg-white/95 dark:bg-neutral-900/90 text-charcoal dark:text-neutral-200 text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full capitalize shadow-sm">
            {translateCategory(recipe.category, language)}
          </span>
        </div>

        {/* Bookmark Button */}
        <button
          type="button"
          onClick={handleBookmarkClick}
          aria-label="Save recipe"
          className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur transition-all active:scale-90 shadow-md ${
            isSaved
              ? 'bg-terracotta text-white'
              : 'bg-black/40 hover:bg-black/60 text-white'
          }`}
        >
          <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Info Overlay */}
        <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
          <h3 className="font-display text-lg font-bold leading-tight drop-shadow-md">
            {translateTitle(recipe.title, language)}
          </h3>
          <div className="flex items-center gap-4 mt-1.5 text-xs text-white/90 font-medium">
            <span className="flex items-center gap-1 drop-shadow">
              <Clock size={12} /> {toBengaliNumber(totalTime, language)} {t.recipeCard?.min || 'min'}
            </span>
            <span className="flex items-center gap-1 drop-shadow">
              <Users size={12} /> {t.recipeCard?.serves || 'Serves'} {toBengaliNumber(recipe.base_servings, language)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-[#1C1C1A] flex items-center justify-between transition-colors">
        <p className="text-xs text-gray-500 dark:text-neutral-400 line-clamp-2 leading-relaxed pr-3">
          {recipe.description}
        </p>
        <div className="w-8 h-8 rounded-full bg-softgray dark:bg-neutral-800 flex items-center justify-center flex-shrink-0 text-charcoal dark:text-white group-hover:bg-terracotta group-hover:text-white transition-colors">
          <ChevronRight size={16} />
        </div>
      </div>
    </div>
  );
}
