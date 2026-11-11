const bangladeshi = require('./recipes_bangladeshi');
const indian = require('./recipes_indian');
const western = require('./recipes_western');

let recipeIdCounter = 1;
let ingredientIdCounter = 1;
let stepIdCounter = 1;

const allRecipes = [];

[...bangladeshi, ...indian, ...western].forEach((r) => {
  const currentRecipeId = recipeIdCounter++;
  const ingredients = (r.ingredients || []).map((ing) => ({
    id: ingredientIdCounter++,
    recipe_id: currentRecipeId,
    name: ing.name,
    base_quantity: ing.base_quantity,
    unit: ing.unit,
    department: ing.department || 'Pantry',
  }));

  const steps = (r.steps || []).map((step, idx) => ({
    id: stepIdCounter++,
    recipe_id: currentRecipeId,
    step_number: step.step_number || idx + 1,
    instruction: step.instruction,
    timer_seconds: step.timer_seconds || null,
  }));

  allRecipes.push({
    id: currentRecipeId,
    title: r.title,
    cuisine: r.cuisine,
    category: r.category,
    prep_time: r.prep_time || 15,
    cook_time: r.cook_time || 25,
    base_servings: r.base_servings || 4,
    description: r.description,
    thumbnail_url: r.thumbnail_url,
    ingredients,
    steps,
  });
});

console.log(`Loaded ${allRecipes.length} total recipes across cuisines:`);
console.log(`- Bangladeshi: ${allRecipes.filter((r) => r.cuisine === 'bangladeshi').length}`);
console.log(`- Indian: ${allRecipes.filter((r) => r.cuisine === 'indian').length}`);
console.log(`- Western: ${allRecipes.filter((r) => r.cuisine === 'western').length}`);

module.exports = allRecipes;
