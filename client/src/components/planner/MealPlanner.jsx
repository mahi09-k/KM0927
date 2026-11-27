import React, { useState, useEffect } from 'react';
import { Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchMealPlan, removeMealPlan, fetchRecipes, addMealPlan } from '../../api';
import useLanguageStore from '../../store/languageStore';
import { translations, toBengaliNumber } from '../../i18n/translations';
import { translateTitle, translateCategory } from '../../i18n/recipeTranslations';

function getCurrentWeek() {
  const now = new Date();
  const year = now.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const weekNum = Math.ceil(((now - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
  return `${year}-W${String(weekNum).padStart(2, '0')}`;
}

function getWeekDates(weekStr) {
  const [year, week] = weekStr.split('-W').map(Number);
  const jan4 = new Date(year, 0, 4);
  const start = new Date(jan4);
  start.setDate(jan4.getDate() - ((jan4.getDay() + 6) % 7) + (week - 1) * 7);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

const MEAL_KEYS = ['breakfast', 'lunch', 'dinner'];

export default function MealPlanner() {
  const { language } = useLanguageStore();
  const t = translations[language] || translations.en;
  const [week, setWeek] = useState(getCurrentWeek());
  const [plan, setPlan] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [modal, setModal] = useState(null); // { date, meal_type }
  const weekDates = getWeekDates(week);

  const load = () => {
    fetchMealPlan(week).then((r) => setPlan(r.data)).catch(console.error);
  };

  useEffect(() => { load(); }, [week]);
  useEffect(() => { fetchRecipes().then((r) => setRecipes(r.data)).catch(console.error); }, []);

  const getSlot = (date, mealType) => {
    const dateStr = date.toISOString().split('T')[0];
    return plan.find((p) => p.date?.slice(0, 10) === dateStr && p.meal_type === mealType);
  };

  const handleAdd = async (recipe) => {
    if (!modal) return;
    const dateStr = modal.date.toISOString().split('T')[0];
    await addMealPlan({ date: dateStr, meal_type: modal.meal_type, recipe_id: recipe.id, servings: recipe.base_servings });
    setModal(null);
    load();
  };

  const handleRemove = async (id) => {
    await removeMealPlan(id);
    load();
  };

  const mealLabels = {
    breakfast: t.planner.breakfast,
    lunch: t.planner.lunch,
    dinner: t.planner.dinner,
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-2">
      {/* Week Navigation Header */}
      <div className="flex items-center justify-between mb-6 max-w-md mx-auto bg-white dark:bg-[#1C1C1A] p-2 sm:p-2.5 rounded-2xl border border-black/5 dark:border-white/5 shadow-xs">
        <button
          onClick={() => {
            const [y, w] = week.split('-W').map(Number);
            setWeek(`${y}-W${String(w - 1).padStart(2, '0')}`);
          }}
          className="w-9 h-9 rounded-xl bg-softgray dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 flex items-center justify-center font-bold transition text-charcoal dark:text-neutral-200"
          title="Previous week"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="font-semibold text-sm sm:text-base text-charcoal dark:text-white">
          {t.planner.week || 'Week'} {toBengaliNumber(week, language)}
        </span>
        <button
          onClick={() => {
            const [y, w] = week.split('-W').map(Number);
            setWeek(`${y}-W${String(w + 1).padStart(2, '0')}`);
          }}
          className="w-9 h-9 rounded-xl bg-softgray dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 flex items-center justify-center font-bold transition text-charcoal dark:text-neutral-200"
          title="Next week"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Responsive Calendar Matrix */}
      <div className="overflow-x-auto scrollbar-hide pb-4">
        <div className="grid grid-cols-8 gap-2 sm:gap-3 min-w-[700px] lg:min-w-0 bg-white dark:bg-[#1C1C1A] p-4 sm:p-6 rounded-3xl border border-black/5 dark:border-white/5 shadow-xs">
          <div className="flex items-center justify-center">
            <span className="text-xs uppercase font-bold tracking-wider text-gray-400 dark:text-neutral-500">
              {language === 'bn' ? 'খাবার' : 'Meal'}
            </span>
          </div>
          {weekDates.map((d, i) => (
            <div key={i} className="text-center py-2 px-1 rounded-xl bg-softgray/40 dark:bg-neutral-800/40">
              <div className="text-[11px] sm:text-xs text-gray-400 dark:text-neutral-400 font-medium">{t.planner.days[i]}</div>
              <div className="text-sm sm:text-base font-bold text-charcoal dark:text-white mt-0.5">{toBengaliNumber(d.getDate(), language)}</div>
            </div>
          ))}

          {MEAL_KEYS.map((meal) => (
            <React.Fragment key={meal}>
              <div className="flex items-center pr-2">
                <span className="text-xs sm:text-sm text-charcoal dark:text-neutral-300 font-bold capitalize leading-tight">
                  {mealLabels[meal]}
                </span>
              </div>
              {weekDates.map((d, di) => {
                const slot = getSlot(d, meal);
                return (
                  <div
                    key={di}
                    className="bg-softgray/80 dark:bg-neutral-800/60 hover:bg-softgray dark:hover:bg-neutral-800 rounded-2xl p-2 min-h-[85px] sm:min-h-[105px] flex flex-col justify-between transition border border-black/5 dark:border-white/5"
                  >
                    {slot ? (
                      <div className="relative group h-full flex flex-col justify-between">
                        <img
                          src={slot.thumbnail_url}
                          alt=""
                          className="w-full h-12 sm:h-14 md:h-16 object-cover rounded-xl shadow-2xs"
                        />
                        <p className="text-[10px] sm:text-xs text-charcoal dark:text-neutral-200 leading-tight mt-1.5 font-semibold line-clamp-2">
                          {translateTitle(slot.title, language)}
                        </p>
                        <button
                          onClick={() => handleRemove(slot.id)}
                          className="absolute -top-1.5 -right-1.5 bg-white dark:bg-neutral-900 text-charcoal dark:text-neutral-200 rounded-full p-1 shadow-md hover:bg-red-500 hover:text-white transition"
                          title="Remove recipe"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setModal({ date: d, meal_type: meal })}
                        className="flex flex-col items-center justify-center h-full w-full text-gray-400 dark:text-neutral-500 hover:text-terracotta hover:scale-110 transition py-2"
                        title="Add recipe"
                      >
                        <Plus size={18} />
                      </button>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Recipe Picker Modal: Centered Desktop Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-[#1C1C1A] text-charcoal dark:text-neutral-100 w-full max-w-2xl rounded-3xl p-6 max-h-[80vh] overflow-y-auto shadow-2xl border border-black/10 dark:border-white/10">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100 dark:border-neutral-800">
              <h3 className="font-display text-xl font-bold text-charcoal dark:text-white">
                {t.planner.pickRecipe} ({mealLabels[modal.meal_type]})
              </h3>
              <button
                onClick={() => setModal(null)}
                className="p-2 rounded-full bg-softgray dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
              >
                <X size={18} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recipes.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleAdd(r)}
                  className="flex items-center gap-3 p-3 bg-softgray/60 dark:bg-neutral-800/50 rounded-2xl text-left hover:bg-softgray dark:hover:bg-neutral-800 transition border border-black/5 dark:border-white/5 hover:scale-[1.01]"
                >
                  <img src={r.thumbnail_url} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs sm:text-sm text-charcoal dark:text-neutral-200 leading-snug truncate">
                      {translateTitle(r.title, language)}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-neutral-400 capitalize mt-1">
                      {translateCategory(r.category, language)} · {toBengaliNumber((r.prep_time || 0) + (r.cook_time || 0), language)} {t.recipeCard.min}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
