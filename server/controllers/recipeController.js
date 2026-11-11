const pool = require('../config/db');
const { FALLBACK_RECIPES } = require('../config/fallbackStore');

// GET /api/recipes
const getAllRecipes = async (req, res, next) => {
  try {
    const conditions = [];
    const params = [];

    if (req.query.cuisine) {
      conditions.push('LOWER(cuisine) = ?');
      params.push(req.query.cuisine.toLowerCase());
    }

    if (req.query.category) {
      conditions.push('category = ?');
      params.push(req.query.category);
    }

    if (req.query.search) {
      const q = `%${req.query.search.trim().toLowerCase()}%`;
      conditions.push('(LOWER(title) LIKE ? OR LOWER(description) LIKE ? OR LOWER(cuisine) LIKE ? OR LOWER(category) LIKE ?)');
      params.push(q, q, q, q);
    }

    if (req.query.filter === 'under30') {
      conditions.push('(prep_time + cook_time) <= 30');
    } else if (req.query.filter === 'vegetarian') {
      conditions.push("category NOT IN ('seafood','meat')");
    } else if (req.query.filter === 'highprotein') {
      conditions.push("category IN ('seafood','meat')");
    }

    const where = conditions.length ? ' WHERE ' + conditions.join(' AND ') : '';
    const [rows] = await pool.query('SELECT * FROM recipes' + where, params);
    res.json(rows);
  } catch (err) {
    console.warn('MySQL error in getAllRecipes, falling back to in-memory store:', err.message);
    let recipes = [...FALLBACK_RECIPES];

    if (req.query.cuisine) {
      recipes = recipes.filter(
        r => (r.cuisine || '').toLowerCase() === req.query.cuisine.toLowerCase()
      );
    }
    if (req.query.category) {
      recipes = recipes.filter(
        r => (r.category || '').toLowerCase() === req.query.category.toLowerCase()
      );
    }
    if (req.query.search) {
      const q = req.query.search.trim().toLowerCase();
      recipes = recipes.filter(r =>
        (r.title || '').toLowerCase().includes(q) ||
        (r.description || '').toLowerCase().includes(q) ||
        (r.cuisine || '').toLowerCase().includes(q) ||
        (r.category || '').toLowerCase().includes(q) ||
        (r.ingredients || []).some(ing => (ing.name || '').toLowerCase().includes(q))
      );
    }
    if (req.query.filter === 'under30') {
      recipes = recipes.filter(r => (r.prep_time + r.cook_time) <= 30);
    } else if (req.query.filter === 'vegetarian') {
      recipes = recipes.filter(r => !['seafood', 'meat'].includes((r.category || '').toLowerCase()));
    } else if (req.query.filter === 'highprotein') {
      recipes = recipes.filter(r => ['seafood', 'meat'].includes((r.category || '').toLowerCase()));
    }

    res.json(recipes.map(({ ingredients, steps, ...rest }) => rest));
  }
};

// GET /api/recipes/:id
const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [recipe] = await pool.query('SELECT * FROM recipes WHERE id = ?', [id]);
    if (!recipe.length) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    const [ingredients] = await pool.query(
      'SELECT * FROM recipe_ingredients WHERE recipe_id = ? ORDER BY id',
      [id]
    );
    const [steps] = await pool.query(
      'SELECT * FROM recipe_steps WHERE recipe_id = ? ORDER BY step_number',
      [id]
    );
    res.json({ ...recipe[0], ingredients, steps });
  } catch (err) {
    console.warn('MySQL error in getRecipeById, falling back to in-memory store:', err.message);
    const found = FALLBACK_RECIPES.find(r => r.id === Number(req.params.id));
    if (!found) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(found);
  }
};

// POST /api/recipes/pantry-match
const pantryMatch = async (req, res, next) => {
  try {
    const { ingredients, cuisine } = req.body;
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: 'ingredients array is required' });
    }

    const conditions = [];
    const params = [];
    for (const item of ingredients) {
      const clean = item.trim().toLowerCase();
      const root = clean.replace(/(?:es|s)$/, '');
      conditions.push('(LOWER(ri.name) LIKE ? OR LOWER(ri.name) LIKE ?)');
      params.push(`%${clean}%`, `%${root || clean}%`);
    }

    let cuisineCondition = '';
    if (cuisine && cuisine !== 'all') {
      cuisineCondition = ' AND LOWER(r.cuisine) = ?';
      params.push(cuisine.toLowerCase());
    }

    const query = `
      SELECT r.*, COUNT(DISTINCT ri.id) as match_count
      FROM recipes r
      JOIN recipe_ingredients ri ON r.id = ri.recipe_id
      WHERE (${conditions.join(' OR ')})${cuisineCondition}
      GROUP BY r.id
      ORDER BY match_count DESC
    `;
    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    console.warn('MySQL error in pantryMatch, falling back to in-memory store:', err.message);
    const { ingredients, cuisine } = req.body;
    const lowerSelected = (ingredients || []).map(i => i.trim().toLowerCase());
    let ranked = FALLBACK_RECIPES.map(r => {
      let matchCount = 0;
      for (const ing of r.ingredients) {
        const name = ing.name.toLowerCase();
        if (lowerSelected.some(sel => name.includes(sel) || sel.includes(name))) {
          matchCount++;
        }
      }
      return { ...r, match_count: matchCount };
    })
      .filter(r => r.match_count > 0);

    if (cuisine && cuisine !== 'all') {
      ranked = ranked.filter(r => (r.cuisine || '').toLowerCase() === cuisine.toLowerCase());
    }

    ranked.sort((a, b) => b.match_count - a.match_count);
    res.json(ranked.map(({ ingredients, steps, ...rest }) => rest));
  }
};

module.exports = { getAllRecipes, getRecipeById, pantryMatch };
