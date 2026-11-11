import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ChefHat, Calendar, ShoppingCart, Clock, ArrowRight, Trash2 } from 'lucide-react';
import useLanguageStore from '../../store/languageStore';
import { translations, toBengaliNumber } from '../../i18n/translations';

export default function ActivityTab({
  stats,
  savedRecipes = [],
  createdRecipes = [],
  recentMealPlans = [],
  onUnsaveRecipe,
}) {
  const { language } = useLanguageStore();
  const t = translations[language]?.profile || translations.en.profile;

  const [activeSubTab, setActiveSubTab] = useState('saved');

  const statCards = [
    {
      label: t.stats.saved,
      value: stats?.savedCount || savedRecipes.length,
      icon: Bookmark,
      color: 'text-terracotta',
      bg: 'bg-terracotta/10',
    },
    {
      label: t.stats.created,
      value: stats?.createdCount || createdRecipes.length,
      icon: ChefHat,
      color: 'text-amber-600',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
    },
    {
      label: t.stats.planned,
      value: stats?.mealPlansCount || recentMealPlans.length,
      icon: Calendar,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    },
    {
      label: t.stats.checked,
      value: stats?.groceryChecksCount || 0,
      icon: ShoppingCart,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-950/40',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 4-Stat Grid Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-[#1C1C1A] rounded-2xl p-3.5 border border-black/5 dark:border-white/5 shadow-sm flex flex-col items-center text-center"
            >
              <div className={`w-9 h-9 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-1.5`}>
                <Icon size={18} />
              </div>
              <span className="text-xl font-bold font-display text-charcoal dark:text-white">
                {toBengaliNumber(stat.value, language)}
              </span>
              <span className="text-[10px] text-gray-500 dark:text-neutral-400 font-medium">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Subtab Segmented Switcher */}
      <div className="bg-softgray dark:bg-neutral-800 p-1 rounded-xl flex gap-1">
        <button
          type="button"
          onClick={() => setActiveSubTab('saved')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'saved'
              ? 'bg-white dark:bg-[#1C1C1A] text-charcoal dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-neutral-400 hover:text-charcoal'
          }`}
        >
          <Bookmark size={13} className={activeSubTab === 'saved' ? 'text-terracotta' : ''} />
          <span>{t.activity.savedTab} ({toBengaliNumber(savedRecipes.length, language)})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('created')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'created'
              ? 'bg-white dark:bg-[#1C1C1A] text-charcoal dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-neutral-400 hover:text-charcoal'
          }`}
        >
          <ChefHat size={13} className={activeSubTab === 'created' ? 'text-amber-500' : ''} />
          <span>{t.activity.createdTab} ({toBengaliNumber(createdRecipes.length, language)})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('planned')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'planned'
              ? 'bg-white dark:bg-[#1C1C1A] text-charcoal dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-neutral-400 hover:text-charcoal'
          }`}
        >
          <Calendar size={13} className={activeSubTab === 'planned' ? 'text-emerald-500' : ''} />
          <span>{t.activity.mealPlanTab}</span>
        </button>
      </div>

      {/* Content based on sub-tab */}
      {activeSubTab === 'saved' && (
        <div className="space-y-3">
          {savedRecipes.length === 0 ? (
            <div className="bg-white dark:bg-[#1C1C1A] rounded-2xl p-8 border border-black/5 dark:border-white/5 text-center">
              <Bookmark size={32} className="mx-auto text-gray-300 dark:text-neutral-600 mb-2" />
              <p className="text-xs text-gray-500 dark:text-neutral-400 max-w-xs mx-auto">
                {t.activity.noSaved}
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 bg-terracotta text-white rounded-xl text-xs font-medium hover:bg-[#D4471C] transition-colors"
              >
                <span>Explore Recipes</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          ) : (
            <div className="space-y-2.5">
              {savedRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white dark:bg-[#1C1C1A] rounded-2xl p-3 border border-black/5 dark:border-white/5 shadow-sm flex items-center gap-3 group hover:border-terracotta/30 transition-all"
                >
                  <Link to={`/recipe/${recipe.id}`} className="flex-shrink-0">
                    <img
                      src={recipe.thumbnail_url}
                      alt={recipe.title}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-softgray dark:bg-neutral-800 text-charcoal dark:text-neutral-300">
                        {recipe.cuisine}
                      </span>
                    </div>
                    <Link
                      to={`/recipe/${recipe.id}`}
                      className="text-xs font-bold text-charcoal dark:text-white hover:text-terracotta line-clamp-1 transition-colors"
                    >
                      {recipe.title}
                    </Link>
                    <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        <span>
                          {toBengaliNumber((recipe.prep_time || 0) + (recipe.cook_time || 0), language)} min
                        </span>
                      </span>
                      <span>•</span>
                      <span>
                        {toBengaliNumber(recipe.base_servings || 4, language)} {language === 'bn' ? 'পরিবেশন' : 'servings'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onUnsaveRecipe && onUnsaveRecipe(recipe.id)}
                      className="p-2 text-gray-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title={t.activity.unsave}
                    >
                      <Trash2 size={15} />
                    </button>
                    <Link
                      to={`/recipe/${recipe.id}`}
                      className="p-2 text-terracotta hover:bg-terracotta/10 rounded-lg transition-colors"
                    >
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'created' && (
        <div className="space-y-3">
          {createdRecipes.length === 0 ? (
            <div className="bg-white dark:bg-[#1C1C1A] rounded-2xl p-8 border border-black/5 dark:border-white/5 text-center">
              <ChefHat size={32} className="mx-auto text-gray-300 dark:text-neutral-600 mb-2" />
              <p className="text-xs text-gray-500 dark:text-neutral-400">
                {t.activity.noCreated}
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {createdRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white dark:bg-[#1C1C1A] rounded-2xl p-3 border border-black/5 dark:border-white/5 shadow-sm flex items-center gap-3"
                >
                  <img
                    src={recipe.thumbnail_url}
                    alt={recipe.title}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                      Published
                    </span>
                    <h4 className="text-xs font-bold text-charcoal dark:text-white line-clamp-1 mt-1">
                      {recipe.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {toBengaliNumber((recipe.prep_time || 0) + (recipe.cook_time || 0), language)} min total
                    </p>
                  </div>
                  <Link
                    to={`/recipe/${recipe.id}`}
                    className="p-2 text-terracotta hover:bg-terracotta/10 rounded-lg transition-colors"
                  >
                    <ArrowRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'planned' && (
        <div className="space-y-2.5">
          {recentMealPlans.map((mp, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#1C1C1A] rounded-2xl p-3.5 border border-black/5 dark:border-white/5 shadow-sm flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                {mp.thumbnail_url ? (
                  <img
                    src={mp.thumbnail_url}
                    alt={mp.recipe_title}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center font-bold">
                    🍽️
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
                      {mp.meal_type}
                    </span>
                    <span className="text-[10px] text-gray-400">{mp.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-charcoal dark:text-white line-clamp-1 mt-1">
                    {mp.recipe_title}
                  </h4>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-softgray dark:bg-neutral-800 text-charcoal dark:text-neutral-300 rounded-lg flex-shrink-0">
                {toBengaliNumber(mp.servings || 4, language)} {language === 'bn' ? 'জন' : 'servings'}
              </span>
            </div>
          ))}
          <div className="pt-2 text-center">
            <Link
              to="/planner"
              className="text-xs font-semibold text-terracotta hover:underline inline-flex items-center gap-1"
            >
              <span>Go to Weekly Meal Planner</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
