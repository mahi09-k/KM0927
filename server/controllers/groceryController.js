const pool = require('../config/db');
const { fallbackMealPlans, fallbackGroceryChecks, FALLBACK_RECIPES } = require('../config/fallbackStore');

function getWeekRange(weekParam) {
  const [year, week] = weekParam.split('-W').map(Number);
  const jan4 = new Date(year, 0, 4);
  const startOfWeek = new Date(jan4);
  startOfWeek.setDate(jan4.getDate() - ((jan4.getDay() + 6) % 7) + (week - 1) * 7);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  const fmt = d => d.toISOString().split('T')[0];
  return { start: fmt(startOfWeek), end: fmt(endOfWeek) };
}

// GET /api/grocery
const getGroceryList = async (req, res, next) => {
  let start, end;
  if (req.query.week) {
    ({ start, end } = getWeekRange(req.query.week));
  } else if (req.query.start) {
    start = req.query.start;
    const endDate = new Date(start);
    endDate.setDate(endDate.getDate() + 6);
    end = endDate.toISOString().split('T')[0];
  } else {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - ((day + 6) % 7);
    const startDate = new Date(today.setDate(diff));
    start = startDate.toISOString().split('T')[0];
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    end = endDate.toISOString().split('T')[0];
  }

  try {
    const [aggregated] = await pool.query(
      `SELECT
         ri.name,
         ri.unit,
         ri.department,
         ROUND(SUM(ri.base_quantity * (mp.servings / r.base_servings)), 2) as total_quantity
       FROM meal_plans mp
       JOIN recipes r ON mp.recipe_id = r.id
       JOIN recipe_ingredients ri ON r.id = ri.recipe_id
       WHERE mp.user_id = 1 AND mp.date BETWEEN ? AND ?
       GROUP BY ri.name, ri.unit, ri.department
       ORDER BY ri.department, ri.name`,
      [start, end]
    );

    const [checks] = await pool.query(
      'SELECT item_key, is_checked FROM grocery_checks WHERE user_id = 1'
    );

    const checkMap = new Map();
    for (const row of checks) {
      checkMap.set(row.item_key, Boolean(row.is_checked));
    }

    const grouped = {};
    for (const row of aggregated) {
      const item_key = `${row.name}_${row.unit}`.replace(/\s+/g, '_').toLowerCase();
      const item = {
        name: row.name,
        unit: row.unit,
        total_quantity: row.total_quantity,
        department: row.department,
        item_key,
        is_checked: checkMap.get(item_key) || false,
      };
      if (!grouped[row.department]) {
        grouped[row.department] = [];
      }
      grouped[row.department].push(item);
    }

    res.json(grouped);
  } catch (err) {
    console.warn('MySQL error in getGroceryList, falling back to in-memory store:', err.message);
    const activePlans = fallbackMealPlans.filter(p => p.date >= start && p.date <= end);
    const itemMap = new Map();

    for (const plan of activePlans) {
      const recipe = FALLBACK_RECIPES.find(r => r.id === plan.recipe_id);
      if (!recipe) continue;
      const ratio = (plan.servings || 2) / (recipe.base_servings || 4);

      for (const ing of recipe.ingredients) {
        const item_key = `${ing.name}_${ing.unit}`.replace(/\s+/g, '_').toLowerCase();
        const currentQty = itemMap.get(item_key)?.total_quantity || 0;
        const addedQty = Math.round(ing.base_quantity * ratio * 100) / 100;

        itemMap.set(item_key, {
          name: ing.name,
          unit: ing.unit,
          department: ing.department,
          total_quantity: Math.round((currentQty + addedQty) * 100) / 100,
          item_key,
          is_checked: fallbackGroceryChecks.get(item_key) || false,
        });
      }
    }

    const grouped = {};
    for (const item of itemMap.values()) {
      if (!grouped[item.department]) {
        grouped[item.department] = [];
      }
      grouped[item.department].push(item);
    }
    res.json(grouped);
  }
};

// POST /api/grocery/check
const toggleGroceryCheck = async (req, res, next) => {
  const { item_key, is_checked } = req.body;
  try {
    await pool.query(
      `INSERT INTO grocery_checks (user_id, item_key, is_checked) VALUES (1, ?, ?)
       ON DUPLICATE KEY UPDATE is_checked = VALUES(is_checked)`,
      [item_key, is_checked]
    );
    res.status(200).json({ message: 'Grocery check updated' });
  } catch (err) {
    console.warn('MySQL error in toggleGroceryCheck, falling back to in-memory store:', err.message);
    fallbackGroceryChecks.set(item_key, Boolean(is_checked));
    res.status(200).json({ message: 'Grocery check updated (memory)' });
  }
};

module.exports = { getGroceryList, toggleGroceryCheck };
