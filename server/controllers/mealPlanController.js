const pool = require('../config/db');
let { fallbackMealPlans, FALLBACK_RECIPES } = require('../config/fallbackStore');

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

// GET /api/meal-plans
const getMealPlan = async (req, res, next) => {
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
    const [rows] = await pool.query(
      `SELECT mp.*, r.title, r.thumbnail_url, r.prep_time, r.cook_time
       FROM meal_plans mp
       JOIN recipes r ON mp.recipe_id = r.id
       WHERE mp.user_id = 1 AND mp.date BETWEEN ? AND ?
       ORDER BY mp.date, mp.meal_type`,
      [start, end]
    );
    res.json(rows);
  } catch (err) {
    console.warn('MySQL error in getMealPlan, falling back to in-memory store:', err.message);
    const filtered = fallbackMealPlans.filter(p => p.date >= start && p.date <= end).map(p => {
      const r = FALLBACK_RECIPES.find(rec => rec.id === p.recipe_id) || {};
      return {
        ...p,
        title: r.title || 'Custom Recipe',
        thumbnail_url: r.thumbnail_url,
        prep_time: r.prep_time,
        cook_time: r.cook_time,
      };
    });
    res.json(filtered);
  }
};

// POST /api/meal-plans
const addMealPlan = async (req, res, next) => {
  const { date, meal_type, recipe_id, servings } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO meal_plans (user_id, date, meal_type, recipe_id, servings) VALUES (1, ?, ?, ?, ?)',
      [date, meal_type, recipe_id, servings || 2]
    );
    res.status(201).json({ id: result.insertId, message: 'Meal plan entry added' });
  } catch (err) {
    console.warn('MySQL error in addMealPlan, falling back to in-memory store:', err.message);
    const newId = Date.now();
    fallbackMealPlans.push({
      id: newId,
      user_id: 1,
      date,
      meal_type,
      recipe_id,
      servings: servings || 2,
    });
    res.status(201).json({ id: newId, message: 'Meal plan entry added (memory)' });
  }
};

// DELETE /api/meal-plans/:id
const removeMealPlan = async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    await pool.query('DELETE FROM meal_plans WHERE id = ?', [id]);
    res.status(200).json({ message: 'Meal plan entry removed' });
  } catch (err) {
    console.warn('MySQL error in removeMealPlan, falling back to in-memory store:', err.message);
    const idx = fallbackMealPlans.findIndex(p => p.id === id);
    if (idx !== -1) fallbackMealPlans.splice(idx, 1);
    res.status(200).json({ message: 'Meal plan entry removed (memory)' });
  }
};

module.exports = { getMealPlan, addMealPlan, removeMealPlan };
