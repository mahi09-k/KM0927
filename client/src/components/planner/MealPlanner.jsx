import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { fetchMealPlan, removeMealPlan, fetchRecipes, addMealPlan } from '../../api';
import useLanguageStore from '../../store/languageStore';
import { translations, toBengaliNumber } from '../../i18n/translations';

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
    <div className="px-5 mt-2">
      <div className="flex items-center justify-between mb-4 bg-white p-2.5 rounded-2xl border border-gray-100 shadow-sm">
        <button
          onClick={() => {
            const [y, w] = week.split('-W').map(Number);
            setWeek(`${y}-W${String(w - 1).padStart(2, '0')}`);
          }}
          className="w-8 h-8 rounded-full bg-softgray hover:bg-gray-200 flex items-center justify-center font-bold transition"
        >
          ‹
        </button>
        <span className="font-semibold text-sm text-charcoal">
          {toBengaliNumber(week, language)}
        </span>
        <button
          onClick={() => {
            const [y, w] = week.split('-W').map(Number);
            setWeek(`${y}-W${String(w + 1).padStart(2, '0')}`);
          }}
          className="w-8 h-8 rounded-full bg-softgray hover:bg-gray-200 flex items-center justify-center font-bold transition"
        >
          ›
        </button>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="grid grid-cols-8 gap-1.5 min-w-[620px] bg-white p-3 rounded-3xl border border-gray-100 shadow-sm">
          <div />
          {weekDates.map((d, i) => (
            <div key={i} className="text-center py-1">
              <div className="text-[11px] text-gray-400 font-medium">{t.planner.days[i]}</div>
              <div className="text-sm font-bold text-charcoal">{toBengaliNumber(d.getDate(), language)}</div>
            </div>
          ))}

          {MEAL_KEYS.map((meal) => (
            <React.Fragment key={meal}>
              <div className="flex items-center pr-1">
                <span className="text-[11px] text-gray-500 font-bold capitalize leading-tight">
                  {mealLabels[meal]}
                </span>
              </div>
              {weekDates.map((d, di) => {
                const slot = getSlot(d, meal);
                return (
                  <div key={di} className="bg-softgray rounded-xl p-1.5 min-h-[68px] flex flex-col justify-between">
                    {slot ? (
                      <div className="relative group">
                        <img src={slot.thumbnail_url} alt="" className="w-full h-10 object-cover rounded-lg" />
                        <p className="text-[9px] text-charcoal leading-tight mt-1 font-semibold line-clamp-2">
                          {slot.title}
                        </p>
                        <button
                          onClick={() => handleRemove(slot.id)}
                          className="absolute -top-1.5 -right-1.5 bg-white text-charcoal rounded-full p-1 shadow-md hover:bg-red-500 hover:text-white transition"
                        >
                          <X size={8} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setModal({ date: d, meal_type: meal })}
                        className="flex items-center justify-center h-full text-gray-300 hover:text-terracotta hover:scale-110 transition"
                      >
                        <Plus size={16} />
                      </button>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-shell rounded-t-3xl p-5 max-h-[75vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
              <h3 className="font-display text-lg font-bold text-charcoal">
                {t.planner.pickRecipe} ({mealLabels[modal.meal_type]})
              </h3>
              <button onClick={() => setModal(null)} className="p-1 rounded-full bg-softgray hover:bg-gray-200">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-2.5">
              {recipes.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleAdd(r)}
                  className="w-full flex items-center gap-3 p-3 bg-softgray rounded-2xl text-left hover:bg-gray-200 transition"
                >
                  <img src={r.thumbnail_url} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-xs text-charcoal leading-snug">{r.title}</p>
                    <p className="text-[10px] text-gray-500 capitalize mt-1">
                      {r.category} · {toBengaliNumber((r.prep_time || 0) + (r.cook_time || 0), language)} {t.recipeCard.min}
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
