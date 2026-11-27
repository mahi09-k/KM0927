import { FALLBACK_RECIPES } from '../data/recipesData';

const STORAGE_KEYS = {
  MEAL_PLANS: 'sizzlespoon_meal_plans',
  GROCERY_CHECKS: 'sizzlespoon_grocery_checks',
  SAVED_RECIPES: 'sizzlespoon_saved_recipes',
  USER_PROFILE: 'sizzlespoon_user_profile',
};

const getStorage = (key, fallback) => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setStorage = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Storage write error', e);
  }
};

// 1. Recipes
export const mockGetRecipes = (params = {}) => {
  let list = [...FALLBACK_RECIPES];
  if (params.cuisine) {
    list = list.filter((r) => (r.cuisine || '').toLowerCase() === params.cuisine.toLowerCase());
  }
  if (params.category) {
    list = list.filter((r) => (r.category || '').toLowerCase() === params.category.toLowerCase());
  }
  if (params.search) {
    const q = params.search.trim().toLowerCase();
    list = list.filter(
      (r) =>
        (r.title || '').toLowerCase().includes(q) ||
        (r.description || '').toLowerCase().includes(q) ||
        (r.cuisine || '').toLowerCase().includes(q) ||
        (r.category || '').toLowerCase().includes(q) ||
        (r.ingredients || []).some((ing) => (ing.name || '').toLowerCase().includes(q))
    );
  }
  if (params.filter === 'under30') {
    list = list.filter((r) => (r.prep_time || 0) + (r.cook_time || 0) <= 30);
  } else if (params.filter === 'vegetarian') {
    list = list.filter((r) => !['seafood', 'meat'].includes((r.category || '').toLowerCase()));
  } else if (params.filter === 'highprotein') {
    list = list.filter((r) => ['seafood', 'meat'].includes((r.category || '').toLowerCase()));
  }
  return { data: list };
};

export const mockGetRecipeById = (id) => {
  const recipe = FALLBACK_RECIPES.find((r) => String(r.id) === String(id));
  return { data: recipe || FALLBACK_RECIPES[0] };
};

export const mockPantryMatch = (ingredients = [], cuisine = '') => {
  const lowerIngredients = ingredients.map((i) => i.toLowerCase().trim());
  let targetRecipes = FALLBACK_RECIPES;
  if (cuisine) {
    targetRecipes = targetRecipes.filter(
      (r) => (r.cuisine || '').toLowerCase() === cuisine.toLowerCase()
    );
  }

  const results = targetRecipes
    .map((r) => {
      const recipeIngredients = (r.ingredients || []).map((i) => (i.name || '').toLowerCase());
      const matchedCount = lowerIngredients.reduce((count, ing) => {
        return count + (recipeIngredients.some((ri) => ri.includes(ing) || ing.includes(ri)) ? 1 : 0);
      }, 0);
      const matchPercentage = recipeIngredients.length
        ? Math.round((matchedCount / recipeIngredients.length) * 100)
        : 0;
      return {
        ...r,
        match_count: matchedCount,
        match_percentage: matchPercentage,
      };
    })
    .filter((r) => r.match_count > 0)
    .sort((a, b) => b.match_percentage - a.match_percentage || b.match_count - a.match_count);

  return { data: results.length > 0 ? results : targetRecipes.slice(0, 10) };
};

// 2. Meal Plans
export const mockGetMealPlan = (week) => {
  const plans = getStorage(STORAGE_KEYS.MEAL_PLANS, [
    {
      id: 1,
      date: new Date().toISOString().split('T')[0],
      meal_type: 'dinner',
      recipe_id: 1,
      servings: 4,
      title: FALLBACK_RECIPES[0]?.title,
      thumbnail_url: FALLBACK_RECIPES[0]?.thumbnail_url,
      category: FALLBACK_RECIPES[0]?.category,
      prep_time: FALLBACK_RECIPES[0]?.prep_time,
      cook_time: FALLBACK_RECIPES[0]?.cook_time,
    },
  ]);
  return { data: plans };
};

export const mockAddMealPlan = (data) => {
  const plans = getStorage(STORAGE_KEYS.MEAL_PLANS, []);
  const recipe = FALLBACK_RECIPES.find((r) => String(r.id) === String(data.recipe_id));
  const newEntry = {
    id: Date.now(),
    date: data.date,
    meal_type: data.meal_type,
    recipe_id: data.recipe_id,
    servings: data.servings || 4,
    title: recipe?.title || '',
    thumbnail_url: recipe?.thumbnail_url || '',
    category: recipe?.category || '',
    prep_time: recipe?.prep_time || 15,
    cook_time: recipe?.cook_time || 25,
  };
  plans.push(newEntry);
  setStorage(STORAGE_KEYS.MEAL_PLANS, plans);
  return { data: newEntry };
};

export const mockRemoveMealPlan = (id) => {
  const plans = getStorage(STORAGE_KEYS.MEAL_PLANS, []);
  const filtered = plans.filter((p) => String(p.id) !== String(id));
  setStorage(STORAGE_KEYS.MEAL_PLANS, filtered);
  return { data: { success: true } };
};

// 3. Grocery
export const mockGetGroceryList = (week) => {
  const plans = getStorage(STORAGE_KEYS.MEAL_PLANS, []);
  const checks = getStorage(STORAGE_KEYS.GROCERY_CHECKS, {});

  const departmentMap = {};

  plans.forEach((plan) => {
    const recipe = FALLBACK_RECIPES.find((r) => String(r.id) === String(plan.recipe_id));
    if (!recipe || !recipe.ingredients) return;

    recipe.ingredients.forEach((ing) => {
      const dept = ing.department || 'Pantry';
      if (!departmentMap[dept]) departmentMap[dept] = [];

      const itemKey = `${ing.name}_${ing.unit}`.toLowerCase().replace(/\s+/g, '_');
      const existing = departmentMap[dept].find((i) => i.item_key === itemKey);

      const qty = parseFloat(ing.base_quantity) || 1;
      const scaledQty = qty * ((plan.servings || 4) / (recipe.base_servings || 4));

      if (existing) {
        existing.total_quantity = (parseFloat(existing.total_quantity) || 0) + scaledQty;
      } else {
        departmentMap[dept].push({
          item_key: itemKey,
          name: ing.name,
          total_quantity: Math.round(scaledQty * 10) / 10,
          unit: ing.unit,
          department: dept,
          is_checked: Boolean(checks[itemKey]),
        });
      }
    });
  });

  return { data: departmentMap };
};

export const mockToggleGroceryCheck = (item_key, is_checked) => {
  const checks = getStorage(STORAGE_KEYS.GROCERY_CHECKS, {});
  checks[item_key] = is_checked;
  setStorage(STORAGE_KEYS.GROCERY_CHECKS, checks);
  return { data: { success: true, item_key, is_checked } };
};

// 4. User Profile
export const mockGetUserProfile = () => {
  const user = getStorage(STORAGE_KEYS.USER_PROFILE, {
    name: '',
    email: '',
    default_servings: 4,
  });
  const savedIds = getStorage(STORAGE_KEYS.SAVED_RECIPES, [1, 2, 51]);
  const savedRecipes = FALLBACK_RECIPES.filter((r) => savedIds.includes(r.id));

  return {
    data: {
      user,
      preferences: {
        dietary_restrictions: ['Halal', 'Low-Carb'],
        allergies: ['Peanuts'],
        spice_level: 'Medium',
        preferred_cuisines: ['Bangladeshi', 'Indian', 'Western'],
      },
      savedRecipes,
      stats: {
        savedCount: savedRecipes.length,
        createdCount: 0,
      },
    },
  };
};

export const mockUpdateUserProfile = (data) => {
  const current = getStorage(STORAGE_KEYS.USER_PROFILE, {});
  const updated = { ...current, ...data };
  setStorage(STORAGE_KEYS.USER_PROFILE, updated);
  return { data: { success: true, user: updated } };
};

export const mockToggleSaveRecipe = (recipeId) => {
  const savedIds = getStorage(STORAGE_KEYS.SAVED_RECIPES, [1, 2, 51]);
  const idNum = parseInt(recipeId, 10);
  let isSaved = false;
  let newSaved;
  if (savedIds.includes(idNum)) {
    newSaved = savedIds.filter((id) => id !== idNum);
    isSaved = false;
  } else {
    newSaved = [...savedIds, idNum];
    isSaved = true;
  }
  setStorage(STORAGE_KEYS.SAVED_RECIPES, newSaved);
  return { data: { success: true, saved: isSaved } };
};

export const mockGetSavedRecipes = () => {
  const savedIds = getStorage(STORAGE_KEYS.SAVED_RECIPES, [1, 2, 51]);
  const recipes = FALLBACK_RECIPES.filter((r) => savedIds.includes(r.id));
  return { data: recipes };
};
