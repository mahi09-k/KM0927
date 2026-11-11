require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const pool = require('../config/db');
const allRecipes = require('./allRecipes');

async function seed() {
  const conn = await pool.getConnection();
  try {
    console.log('🔄 Cleaning old database tables...');
    await conn.query('DELETE FROM grocery_checks');
    await conn.query('DELETE FROM meal_plans');
    await conn.query('DELETE FROM user_saved_recipes');
    await conn.query('DELETE FROM user_created_recipes');
    await conn.query('DELETE FROM user_preferences');
    await conn.query('DELETE FROM recipe_steps');
    await conn.query('DELETE FROM recipe_ingredients');
    await conn.query('DELETE FROM recipes');
    await conn.query('DELETE FROM users');
    await conn.query('ALTER TABLE recipes AUTO_INCREMENT = 1');
    await conn.query('ALTER TABLE users AUTO_INCREMENT = 1');

    console.log('👤 Seeding default user and culinary preferences...');
    await conn.query(
      `INSERT INTO users (id, name, email, password_hash, avatar_url, default_servings, created_at)
       VALUES (1, 'Ayesha Rahman', 'ayesha@sizzlespoon.com', 'scrypt_hashed_password_sample', NULL, 4, '2024-03-15 10:00:00')`
    );

    await conn.query(
      `INSERT INTO user_preferences (user_id, dietary_restrictions, allergies, spice_level, preferred_cuisines)
       VALUES (1, ?, ?, 'Medium', ?)` ,
      [
        JSON.stringify(['Halal', 'Low-Carb']),
        JSON.stringify(['Peanuts', 'Shellfish']),
        JSON.stringify(['Bangladeshi', 'Indian', 'Western'])
      ]
    );

    console.log(`🌱 Inserting ${allRecipes.length} recipes across Bangladeshi, Indian & Western cuisines...`);

    for (const r of allRecipes) {
      const [result] = await conn.query(
        `INSERT INTO recipes (title, cuisine, description, prep_time, cook_time, base_servings, thumbnail_url, category)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          r.title,
          r.cuisine,
          r.description,
          r.prep_time,
          r.cook_time,
          r.base_servings,
          r.thumbnail_url,
          r.category
        ]
      );
      const recipeId = result.insertId;

      for (const ing of r.ingredients) {
        await conn.query(
          'INSERT INTO recipe_ingredients (recipe_id, name, base_quantity, unit, department) VALUES (?, ?, ?, ?, ?)',
          [recipeId, ing.name, ing.base_quantity, ing.unit, ing.department]
        );
      }

      for (const step of r.steps) {
        await conn.query(
          'INSERT INTO recipe_steps (recipe_id, step_number, instruction, timer_seconds) VALUES (?, ?, ?, ?)',
          [recipeId, step.step_number, step.instruction, step.timer_seconds]
        );
      }
    }

    console.log(`✅ Success! Seeded all ${allRecipes.length} recipes with relational ingredients and steps.`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  } finally {
    conn.release();
  }
}

seed();
