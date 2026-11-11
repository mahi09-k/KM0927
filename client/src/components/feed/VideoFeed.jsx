import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { fetchRecipes } from '../../api';
import RecipeCard from './RecipeCard';
import FilterBar from './FilterBar';
import useLanguageStore from '../../store/languageStore';
import { translations, toBengaliNumber } from '../../i18n/translations';
import { translateTitle } from '../../i18n/recipeTranslations';

export default function VideoFeed() {
  const [recipes, setRecipes] = useState([]);
  const [activeFilter, setActiveFilter] = useState({ type: 'all', value: '' });
  const [searchQuery, setSearchQuery] = useState('');
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

  // Filter recipes in real-time by search query across English & Bengali titles, descriptions, cuisines, and categories
  const filteredRecipes = recipes.filter((r) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const enTitle = (r.title || '').toLowerCase();
    const bnTitle = translateTitle(r.title, 'bn').toLowerCase();
    const desc = (r.description || '').toLowerCase();
    const cuisine = (r.cuisine || '').toLowerCase();
    const category = (r.category || '').toLowerCase();
    return (
      enTitle.includes(q) ||
      bnTitle.includes(q) ||
      desc.includes(q) ||
      cuisine.includes(q) ||
      category.includes(q)
    );
  });

  return (
    <div>
      {/* Modern Search Bar */}
      <div className="px-5 mb-3.5">
        <div className="relative flex items-center">
          <Search
            className="absolute left-4 text-gray-400 dark:text-neutral-500 pointer-events-none"
            size={18}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.filters?.searchPlaceholder || 'Search 150+ recipes, cuisines, or ingredients...'}
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white dark:bg-[#1C1C1A] text-charcoal dark:text-neutral-100 placeholder-gray-400 dark:placeholder-neutral-500 border border-black/5 dark:border-white/5 shadow-xs focus:outline-none focus:ring-2 focus:ring-terracotta text-sm transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-400 dark:text-neutral-400 transition"
              title={t.filters?.clearSearch || 'Clear search'}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <FilterBar active={activeFilter} onSelect={setActiveFilter} />

      <div className="px-5 py-2 flex items-center justify-between text-xs text-gray-500 dark:text-neutral-400 font-medium">
        <span>
          {t.filters.showing} {toBengaliNumber(filteredRecipes.length, language)} {t.filters.recipes}
          {searchQuery && (
            <span className="ml-1 text-terracotta font-semibold">
              (&quot;{searchQuery}&quot;)
            </span>
          )}
        </span>
        {(activeFilter.value || searchQuery) && (
          <button
            onClick={() => {
              setActiveFilter({ type: 'all', value: '' });
              setSearchQuery('');
            }}
            className="text-terracotta underline font-semibold hover:text-orange-700 transition"
          >
            {t.filters.clear}
          </button>
        )}
      </div>

      <div className="px-5 mt-2 grid grid-cols-1 gap-5">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-72 rounded-3xl bg-softgray dark:bg-neutral-800 animate-pulse" />
          ))
        ) : filteredRecipes.length === 0 ? (
          <div className="text-center py-16 text-gray-400 dark:text-neutral-500">
            <p className="text-4xl mb-2">🍽️</p>
            <p className="font-semibold text-charcoal dark:text-neutral-200">{t.filters.noRecipes}</p>
            <p className="text-xs text-gray-400 dark:text-neutral-500 mt-1">{t.filters.tryAnother}</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 rounded-full bg-terracotta text-white text-xs font-semibold hover:bg-orange-700 transition"
              >
                {t.filters?.clearSearch || 'Clear search'}
              </button>
            )}
          </div>
        ) : (
          filteredRecipes.map((r) => <RecipeCard key={r.id} recipe={r} />)
        )}
      </div>
    </div>
  );
}
