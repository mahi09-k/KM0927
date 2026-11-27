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
  const [unitSystem, setUnitSystem] = useState('M'); // 'M' or 'US'
  const [cookMode, setCookMode] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { language } = useLanguageStore();
  const t = translations[language] || translations.en;
  const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);

  const baseServings = recipe.base_servings || 4;
  const halfScaleServings = Math.max(1, Math.round(baseServings * 0.5));
  const fullScaleServings = baseServings;
  const doubleScaleServings = baseServings * 2;

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
    <div className="pb-12 transition-colors">
      {/* High-Resolution Hero Banner */}
      <div className="relative h-72 sm:h-80 md:h-96 lg:h-[400px] sm:mx-4 md:mx-6 lg:mx-8 sm:mt-4 sm:rounded-3xl bg-charcoal overflow-hidden shadow-md">
        <img
          src={recipe.thumbnail_url}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

        {/* Top right controls: Bookmark & Language (hidden on desktop if in DesktopNav) */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={handleBookmarkToggle}
            aria-label="Save recipe"
            className={`p-2.5 rounded-full backdrop-blur transition-all active:scale-95 shadow-md ${
              isSaved
                ? 'bg-terracotta text-white'
                : 'bg-black/40 hover:bg-black/60 text-white'
            }`}
          >
            <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
          <div className="md:hidden">
            <LanguageSelector />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 text-white pointer-events-none">
          <div className="flex items-center gap-2 mb-2">
            {recipe.cuisine && (
              <span className={`${badge.bg} text-white text-[11px] sm:text-xs font-bold tracking-wider px-3 py-1 rounded-full shadow`}>
                {translateCuisine(recipe.cuisine, language)}
              </span>
            )}
            <span className="text-[11px] sm:text-xs font-semibold tracking-wide bg-white/20 backdrop-blur px-3 py-1 rounded-full capitalize">
              {translateCategory(recipe.category, language)}
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight drop-shadow max-w-4xl">
            {translateTitle(recipe.title, language)}
          </h1>
          <div className="flex gap-4 sm:gap-6 mt-3 text-xs sm:text-sm font-medium text-white/90">
            <span className="flex items-center gap-1.5">
              <Clock size={15} /> {toBengaliNumber(totalTime, language)} {t.recipeCard?.min || 'min'}
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={15} /> {t.recipeDetail?.base || 'Base'}: {toBengaliNumber(recipe.base_servings, language)} {t.recipeDetail?.servings || 'servings'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Recipe Content: Responsive 2-Column Split on Desktop */}
      <div className="px-4 sm:px-6 lg:px-8 mt-6 lg:mt-8 lg:grid lg:grid-cols-12 lg:gap-8 items-start">
        {/* Left Column: Description, Scaler & Ingredients (Sticky on Desktop) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="p-5 rounded-3xl bg-white dark:bg-[#1C1C1A] border border-black/5 dark:border-white/5 shadow-xs">
            <p className="text-gray-600 dark:text-neutral-300 text-sm leading-relaxed">
              {translateDescription(recipe.description, language)}
            </p>

            {/* Ingredients Header with UNITS & SCALE Bars */}
            <div className="mt-6 mb-4">
              <div className="flex flex-wrap items-center justify-between gap-y-3 pb-3 border-b border-gray-200 dark:border-neutral-800">
                <h2 className="text-xs sm:text-sm font-bold tracking-widest text-charcoal dark:text-neutral-200 uppercase font-sans">
                  {language === 'bn' ? 'উপকরণ' : 'INGREDIENTS'}
                </h2>

                <div className="flex items-center gap-3 select-none">
                  {/* UNITS: [ US ] [ M ] */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold tracking-wider text-gray-400 dark:text-neutral-500 uppercase">
                      {language === 'bn' ? 'একক' : 'UNITS'}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setUnitSystem('US')}
                        className={`px-2 py-0.5 rounded-sm text-xs font-bold border transition-all ${
                          unitSystem === 'US'
                            ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-xs'
                            : 'bg-white dark:bg-[#1C1C1A] text-charcoal dark:text-neutral-300 border-gray-300 dark:border-neutral-700 hover:border-black dark:hover:border-white'
                        }`}
                      >
                        US
                      </button>
                      <button
                        type="button"
                        onClick={() => setUnitSystem('M')}
                        className={`px-2 py-0.5 rounded-sm text-xs font-bold border transition-all ${
                          unitSystem === 'M'
                            ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-xs'
                            : 'bg-white dark:bg-[#1C1C1A] text-charcoal dark:text-neutral-300 border-gray-300 dark:border-neutral-700 hover:border-black dark:hover:border-white'
                        }`}
                      >
                        M
                      </button>
                    </div>
                  </div>

                  {/* SCALE: [ 1/2x ] [ 1x ] [ 2x ] */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold tracking-wider text-gray-400 dark:text-neutral-500 uppercase">
                      {language === 'bn' ? 'স্কেল' : 'SCALE'}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setServings(halfScaleServings)}
                        className={`px-2 py-0.5 rounded-sm text-xs font-bold border transition-all ${
                          servings === halfScaleServings
                            ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-xs'
                            : 'bg-white dark:bg-[#1C1C1A] text-charcoal dark:text-neutral-300 border-gray-300 dark:border-neutral-700 hover:border-black dark:hover:border-white'
                        }`}
                      >
                        1/2x
                      </button>
                      <button
                        type="button"
                        onClick={() => setServings(fullScaleServings)}
                        className={`px-2 py-0.5 rounded-sm text-xs font-bold border transition-all ${
                          servings === fullScaleServings
                            ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-xs'
                            : 'bg-white dark:bg-[#1C1C1A] text-charcoal dark:text-neutral-300 border-gray-300 dark:border-neutral-700 hover:border-black dark:hover:border-white'
                        }`}
                      >
                        1x
                      </button>
                      <button
                        type="button"
                        onClick={() => setServings(doubleScaleServings)}
                        className={`px-2 py-0.5 rounded-sm text-xs font-bold border transition-all ${
                          servings === doubleScaleServings
                            ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-xs'
                            : 'bg-white dark:bg-[#1C1C1A] text-charcoal dark:text-neutral-300 border-gray-300 dark:border-neutral-700 hover:border-black dark:hover:border-white'
                        }`}
                      >
                        2x
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Granular Portions Stepper */}
              <div className="flex items-center justify-between pt-3 pb-1">
                <span className="text-xs text-gray-400 dark:text-neutral-500 font-medium">
                  {language === 'bn'
                    ? `মূল পরিমাণ: ${toBengaliNumber(baseServings, language)} জন`
                    : `Base size: ${baseServings} servings`}
                </span>

                <div className="flex items-center gap-2.5 bg-white dark:bg-[#1C1C1A] border border-gray-200 dark:border-neutral-800 shadow-xs rounded-full px-3 py-1">
                  <button
                    type="button"
                    onClick={() => setServings((s) => Math.max(1, s - 1))}
                    className="w-6 h-6 rounded-full bg-softgray dark:bg-neutral-800 flex items-center justify-center text-charcoal dark:text-white hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
                    title="Decrease servings"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-xs font-bold text-terracotta min-w-[70px] text-center">
                    {toBengaliNumber(servings, language)} {servings === 1 ? (t.recipeDetail?.serving || 'serving') : (t.recipeDetail?.servings || 'servings')}
                  </span>
                  <button
                    type="button"
                    onClick={() => setServings((s) => Math.min(24, s + 1))}
                    className="w-6 h-6 rounded-full bg-softgray dark:bg-neutral-800 flex items-center justify-center text-charcoal dark:text-white hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
                    title="Increase servings"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>

            <IngredientScaler
              ingredients={recipe.ingredients || []}
              baseServings={baseServings}
              currentServings={servings}
              unitSystem={unitSystem}
            />
          </div>
        </div>

        {/* Right Column: Instructions & Cook Mode CTA */}
        <div className="lg:col-span-7 mt-6 lg:mt-0 space-y-6">
          {/* Desktop Cook Mode Banner CTA */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-terracotta to-amber-600 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-bold">
                {language === 'bn' ? 'রান্না শুরু করতে প্রস্তুত?' : 'Ready to start cooking?'}
              </h3>
              <p className="text-xs text-white/90 mt-1 max-w-md">
                {language === 'bn'
                  ? 'ইন্টারেক্টিভ টাইমার ও স্টেপ-বাই-স্টেপ মোড চালু করুন।'
                  : 'Launch full distraction-free Cook Mode with automated countdown timers.'}
              </p>
            </div>
            <button
              onClick={() => setCookMode(true)}
              className="flex-shrink-0 flex items-center gap-2.5 bg-white text-terracotta font-bold text-sm px-6 py-3.5 rounded-2xl hover:bg-cream active:scale-95 transition shadow-md"
            >
              <ChefHat size={18} /> {t.recipeDetail?.startCookMode || 'Start Cook Mode'}
            </button>
          </div>

          {/* Recipe Steps Preview */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1C1C1A] border border-black/5 dark:border-white/5 shadow-xs">
            <h2 className="font-display text-xl font-bold text-charcoal dark:text-white mb-4">
              {t.recipeDetail?.steps || 'Preparation Steps'}
            </h2>
            <div className="space-y-4">
              {(recipe.steps || []).map((step) => (
                <div
                  key={step.id || step.step_number}
                  className="flex gap-4 p-4 bg-softgray/50 dark:bg-neutral-800/40 rounded-2xl border border-black/5 dark:border-white/5 transition hover:bg-softgray dark:hover:bg-neutral-800"
                >
                  <span className="w-8 h-8 rounded-full bg-terracotta/10 text-terracotta font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {toBengaliNumber(step.step_number, language)}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-charcoal dark:text-neutral-200 leading-relaxed font-normal">
                      {translateInstruction(step.instruction, language)}
                    </p>
                    {step.timer_seconds ? (
                      <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold">
                        <Clock size={12} /> {t.recipeDetail?.timer || 'Timer'}: {toBengaliNumber(Math.floor(step.timer_seconds / 60), language)} {t.recipeCard?.min || 'min'}
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {cookMode && (
        <CookMode steps={recipe.steps || []} onClose={() => setCookMode(false)} />
      )}
    </div>
  );
}
