import { useState, useEffect } from 'react';
import { fetchRecipes } from '../../api';
import RecipeCard from './RecipeCard';
import FilterBar from './FilterBar';
import useLanguageStore from '../../store/languageStore';
import { translations, toBengaliNumber } from '../../i18n/translations';

export default function VideoFeed() {
  const [recipes, setRecipes] = useState([]);
  const [activeFilter, setActiveFilter] = useState({ type: 'all', value: '' });
  const [loading, setLoading] = useState(true);
  const { language } = useLanguageStore();
  const t = translations[language] || translations.en;

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (activeFilter.type === 'cuisine' && activeFilter.value) {
      params.cuisine = activeFilter.value;
    } else if (activeFilter.type === 'filter' && activeFilter.value) {
      params.filter = activeFilter.value;
    } else if (activeFilter.type === 'category' && activeFilter.value) {
      params.category = activeFilter.value;
    }

    fetchRecipes(params)
      .then((res) => setRecipes(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeFilter]);

  return (
    <div>
      <FilterBar active={activeFilter} onSelect={setActiveFilter} />

      <div className="px-5 py-2 flex items-center justify-between text-xs text-gray-500 font-medium">
        <span>
          {t.filters.showing} {toBengaliNumber(recipes.length, language)} {t.filters.recipes}
        </span>
        {activeFilter.value && (
          <button
            onClick={() => setActiveFilter({ type: 'all', value: '' })}
            className="text-terracotta underline font-semibold hover:text-orange-700 transition"
          >
            {t.filters.clear}
          </button>
        )}
      </div>

      <div className="px-5 mt-2 grid grid-cols-1 gap-5">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-72 rounded-3xl bg-softgray animate-pulse" />
          ))
        ) : recipes.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-2">🍽️</p>
            <p className="font-semibold text-charcoal">{t.filters.noRecipes}</p>
            <p className="text-xs text-gray-400 mt-1">{t.filters.tryAnother}</p>
          </div>
        ) : (
          recipes.map((r) => <RecipeCard key={r.id} recipe={r} />)
        )}
      </div>
    </div>
  );
}
