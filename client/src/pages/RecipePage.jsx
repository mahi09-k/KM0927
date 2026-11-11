import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { fetchRecipeById } from '../api';
import RecipeDetail from '../components/recipe/RecipeDetail';
import useLanguageStore from '../store/languageStore';
import { translations } from '../i18n/translations';

export default function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  const t = translations[language] || translations.en;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipeById(id)
      .then((r) => setRecipe(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-30 p-2.5 bg-white/95 backdrop-blur rounded-full shadow-md text-charcoal hover:bg-white transition"
        title={t.recipeDetail.back}
      >
        <ArrowLeft size={18} />
      </button>

      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-terracotta border-t-transparent rounded-full animate-spin" />
        </div>
      ) : recipe ? (
        <RecipeDetail recipe={recipe} />
      ) : (
        <div className="p-16 text-center text-gray-400">
          <p className="text-4xl mb-2">🍽️</p>
          <p className="font-semibold text-charcoal">{t.recipeDetail.notFound}</p>
        </div>
      )}
    </div>
  );
}
