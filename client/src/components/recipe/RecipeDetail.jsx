import { useState, useEffect } from 'react';
import { Clock, Users, ChefHat, Minus, Plus, Bookmark } from 'lucide-react';
import IngredientScaler from './IngredientScaler';
import CookMode from './CookMode';
import LanguageSelector from '../common/LanguageSelector';
import useLanguageStore from '../../store/languageStore';
import { translations, toBengaliNumber } from '../../i18n/translations';
import { translateInstruction, translateTitle, translateDescription, translateCategory, translateCuisine } from '../../i18n/recipeTranslations';
import { toggleSaveRecipe, fetchUserProfile } from '../../api';

export default function RecipeDetail({ recipe }) {
  const [servings, setServings] = useState(recipe.base_servings || 4);
  const [cookMode, setCookMode] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { language } = useLanguageStore();
  const t = translations[language] || translations.en;
  const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);

  useEffect(() => {
    // Check if user has a custom default servings or if recipe is saved
    fetchUserProfile()
      .then((res) => {
        if (res.data?.user?.default_servings) {
          setServings(res.data.user.default_servings);
        }
        if (res.data?.savedRecipes) {
          const exists = res.data.savedRecipes.some((r) => r.id === recipe.id);
          setIsSaved(exists);
        }
      })
      .catch(() => {});
  }, [recipe.id]);

  const handleBookmarkToggle = async () => {
    try {
      const res = await toggleSaveRecipe(recipe.id);
      setIsSaved(res.data.saved);
    } catch (err) {
      console.error('Failed to toggle bookmark:', err);
    }
  };

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

  return (
    <div className="pb-10 transition-colors">
      {/* High-Resolution Hero Banner */}
      <div className="relative h-72 bg-charcoal overflow-hidden">
        <img
          src={recipe.thumbnail_url}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

        {/* Top right controls: Bookmark & Language */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={handleBookmarkToggle}
            aria-label="Save recipe"
            className={`p-2 rounded-full backdrop-blur transition-all active:scale-95 shadow-md ${
              isSaved
                ? 'bg-terracotta text-white'
                : 'bg-black/40 hover:bg-black/60 text-white'
            }`}
          >
            <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
          <LanguageSelector />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none">
          <div className="flex items-center gap-2 mb-2">
            {recipe.cuisine && (
              <span className={`${badge.bg} text-white text-[11px] font-bold tracking-wider px-3 py-1 rounded-full shadow`}>
                {translateCuisine(recipe.cuisine, language)}
              </span>
            )}
            <span className="text-[11px] font-semibold tracking-wide bg-white/20 backdrop-blur px-3 py-1 rounded-full capitalize">
              {translateCategory(recipe.category, language)}
            </span>
          </div>
          <h1 className="font-display text-2xl font-bold leading-tight drop-shadow">
            {translateTitle(recipe.title, language)}
          </h1>
          <div className="flex gap-4 mt-2 text-xs font-medium text-white/90">
            <span className="flex items-center gap-1">
              <Clock size={13} /> {toBengaliNumber(totalTime, language)} {t.recipeCard?.min || 'min'}
            </span>
            <span className="flex items-center gap-1">
              <Users size={13} /> {t.recipeDetail?.base || 'Base'}: {toBengaliNumber(recipe.base_servings, language)} {t.recipeDetail?.servings || 'servings'}
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 mt-5">
        <p className="text-gray-600 dark:text-neutral-300 text-sm leading-relaxed">{translateDescription(recipe.description, language)}</p>

        {/* Interactive Scaler Header */}
        <div className="flex items-center justify-between mt-6 mb-4">
          <div>
            <h2 className="font-display text-xl font-bold text-charcoal dark:text-white">{t.recipeDetail?.ingredients || 'Ingredients'}</h2>
            <p className="text-[11px] text-gray-400 dark:text-neutral-500">{t.recipeDetail?.scaleSubtitle || 'Scale recipe dynamically'}</p>
          </div>

          <div className="flex items-center gap-3 bg-white dark:bg-[#1C1C1A] border border-gray-200 dark:border-neutral-800 shadow-sm rounded-full px-3 py-1.5">
            <button
              onClick={() => setServings((s) => Math.max(1, s - 1))}
              className="w-7 h-7 rounded-full bg-softgray dark:bg-neutral-800 flex items-center justify-center text-charcoal dark:text-white hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
              title="Decrease servings"
            >
              <Minus size={14} />
            </button>
            <span className="text-xs font-bold w-24 text-center text-terracotta">
              {toBengaliNumber(servings, language)} {servings === 1 ? (t.recipeDetail?.serving || 'serving') : (t.recipeDetail?.servings || 'servings')}
            </span>
            <button
              onClick={() => setServings((s) => Math.min(20, s + 1))}
              className="w-7 h-7 rounded-full bg-softgray dark:bg-neutral-800 flex items-center justify-center text-charcoal dark:text-white hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
              title="Increase servings"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        <IngredientScaler
          ingredients={recipe.ingredients || []}
          baseServings={recipe.base_servings}
          currentServings={servings}
        />

        {/* Recipe Steps Preview */}
        <div className="mt-8">
          <h2 className="font-display text-xl font-bold text-charcoal dark:text-white mb-3">{t.recipeDetail?.steps || 'Preparation Steps'}</h2>
          <div className="space-y-3">
            {(recipe.steps || []).map((step) => (
              <div key={step.id || step.step_number} className="flex gap-3 p-3 bg-white dark:bg-[#1C1C1A] rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm">
                <span className="w-6 h-6 rounded-full bg-terracotta/10 text-terracotta font-bold text-xs flex items-center justify-center flex-shrink-0">
                  {toBengaliNumber(step.step_number, language)}
                </span>
                <div className="flex-1">
                  <p className="text-xs text-charcoal dark:text-neutral-200 leading-relaxed">{translateInstruction(step.instruction, language)}</p>
                  {step.timer_seconds ? (
                    <span className="inline-flex items-center gap-1 mt-1 text-[10px] text-terracotta font-semibold">
                      <Clock size={10} /> {t.recipeDetail?.timer || 'Timer'}: {toBengaliNumber(Math.floor(step.timer_seconds / 60), language)} {t.recipeCard?.min || 'min'}
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Start Cook Mode Button */}
        <button
          onClick={() => setCookMode(true)}
          className="w-full mt-8 flex items-center justify-center gap-2 bg-terracotta text-white py-4 rounded-2xl font-bold text-base hover:bg-orange-700 transition shadow-lg shadow-terracotta/20 active:scale-[0.98]"
        >
          <ChefHat size={20} /> {t.recipeDetail?.startCookMode || 'Start Cook Mode'}
        </button>
      </div>

      {cookMode && (
        <CookMode steps={recipe.steps || []} onClose={() => setCookMode(false)} />
      )}
    </div>
  );
}
