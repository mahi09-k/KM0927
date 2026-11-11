const pool = require('../config/db');
const {
  FALLBACK_RECIPES,
  fallbackUsers,
  getUserById,
  getUserByEmail,
  addUser,
  updateUser,
  getUserPreferences,
  setUserPreferences,
  getUserSavedRecipeIds,
  getUserCreatedRecipeIds,
  getUserMealPlans,
  getUserGroceryChecks,
} = require('../config/fallbackStore');

// Helper to construct profile object for any userId
const getFallbackProfile = (userId = 1) => {
  const user = getUserById(userId) || fallbackUsers[0];
  const preferences = getUserPreferences(user.id);
  const savedIds = getUserSavedRecipeIds(user.id);
  const createdIds = getUserCreatedRecipeIds(user.id);
  const mealPlans = getUserMealPlans(user.id);
  const groceryChecks = getUserGroceryChecks(user.id);

  const savedRecipes = FALLBACK_RECIPES.filter((r) => savedIds.has(r.id)).map((r) => ({
    id: r.id,
    title: r.title,
    cuisine: r.cuisine,
    thumbnail_url: r.thumbnail_url,
    prep_time: r.prep_time,
    cook_time: r.cook_time,
    category: r.category,
    base_servings: r.base_servings,
  }));

  const createdRecipes = FALLBACK_RECIPES.filter((r) => createdIds.has(r.id)).map((r) => ({
    id: r.id,
    title: r.title,
    cuisine: r.cuisine,
    thumbnail_url: r.thumbnail_url,
    prep_time: r.prep_time,
    cook_time: r.cook_time,
    category: r.category,
    base_servings: r.base_servings,
  }));

  const checkedCount = Array.from(groceryChecks.values()).filter(Boolean).length;

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar_url: user.avatar_url,
      default_servings: user.default_servings,
      created_at: user.created_at,
    },
    preferences: { ...preferences },
    stats: {
      savedCount: savedRecipes.length,
      createdCount: createdRecipes.length,
      mealPlansCount: mealPlans.length,
      groceryChecksCount: checkedCount,
    },
    savedRecipes,
    createdRecipes,
    recentMealPlans: mealPlans.slice(0, 5).map((mp) => {
      const recipe = FALLBACK_RECIPES.find((r) => r.id === mp.recipe_id);
      return {
        ...mp,
        recipe_title: recipe ? recipe.title : 'Custom Meal',
        thumbnail_url: recipe ? recipe.thumbnail_url : null,
      };
    }),
  };
};

// POST /api/users/signup
exports.signup = async (req, res) => {
  const { name, email, password, avatar_url, default_servings } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const cleanEmail = email.toLowerCase().trim();

  try {
    // Check if email exists in MySQL
    const [existing] = await pool.query('SELECT id FROM users WHERE LOWER(email) = ?', [cleanEmail]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    const dummyHash = 'hashed_' + password;
    const [result] = await pool.query(
      `INSERT INTO users (name, email, password_hash, avatar_url, default_servings)
       VALUES (?, ?, ?, ?, ?)`,
      [
        name || 'Home Chef',
        cleanEmail,
        dummyHash,
        avatar_url || null,
        parseInt(default_servings || 4, 10),
      ]
    );

    const newUserId = result.insertId;

    // Create default preferences
    await pool.query(
      `INSERT INTO user_preferences (user_id, dietary_restrictions, allergies, spice_level, preferred_cuisines)
       VALUES (?, ?, ?, 'Medium', ?)`,
      [
        newUserId,
        JSON.stringify(['Halal']),
        JSON.stringify([]),
        JSON.stringify(['Bangladeshi', 'Indian', 'Western']),
      ]
    );

    // Also mirror to fallback
    const fallbackNew = addUser({
      id: newUserId,
      name: name || 'Home Chef',
      email: cleanEmail,
      password,
      avatar_url,
      default_servings,
    });

    const userObj = {
      id: newUserId,
      name: name || 'Home Chef',
      email: cleanEmail,
      avatar_url: avatar_url || fallbackNew.avatar_url,
      default_servings: parseInt(default_servings || 4, 10),
      created_at: new Date().toISOString(),
    };

    return res.json({
      success: true,
      message: 'Account created successfully',
      user: userObj,
      token: 'jwt_mock_token_user_' + newUserId,
    });
  } catch (err) {
    console.warn('MySQL error in signup, using fallback store:', err.message);

    const existingUser = getUserByEmail(cleanEmail);
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    const newUser = addUser({
      name: name || 'Home Chef',
      email: cleanEmail,
      password,
      avatar_url,
      default_servings,
    });

    return res.json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar_url: newUser.avatar_url,
        default_servings: newUser.default_servings,
        created_at: newUser.created_at,
      },
      token: 'jwt_mock_token_user_' + newUser.id,
    });
  }
};

// POST /api/users/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const cleanEmail = email.toLowerCase().trim();

  try {
    const [rows] = await pool.query(
      'SELECT id, name, email, password_hash, avatar_url, default_servings, created_at FROM users WHERE LOWER(email) = ?',
      [cleanEmail]
    );

    if (rows.length === 0) {
      // Check in fallbackStore
      const fallbackU = getUserByEmail(cleanEmail);
      if (!fallbackU) {
        return res.status(401).json({ error: 'Account not found with this email' });
      }
      return res.json({
        success: true,
        message: 'Welcome back!',
        user: {
          id: fallbackU.id,
          name: fallbackU.name,
          email: fallbackU.email,
          avatar_url: fallbackU.avatar_url,
          default_servings: fallbackU.default_servings,
          created_at: fallbackU.created_at,
        },
        token: 'jwt_mock_token_user_' + fallbackU.id,
      });
    }

    const user = rows[0];

    return res.json({
      success: true,
      message: 'Welcome back, ' + user.name + '!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
        default_servings: user.default_servings,
        created_at: user.created_at,
      },
      token: 'jwt_mock_token_user_' + user.id,
    });
  } catch (err) {
    console.warn('MySQL error in login, checking fallback store:', err.message);
    const fallbackU = getUserByEmail(cleanEmail);
    if (!fallbackU) {
      return res.status(401).json({ error: 'Account not found with this email' });
    }
    return res.json({
      success: true,
      message: 'Welcome back, ' + fallbackU.name + '!',
      user: {
        id: fallbackU.id,
        name: fallbackU.name,
        email: fallbackU.email,
        avatar_url: fallbackU.avatar_url,
        default_servings: fallbackU.default_servings,
        created_at: fallbackU.created_at,
      },
      token: 'jwt_mock_token_user_' + fallbackU.id,
    });
  }
};

// GET /api/users/accounts (List saved/registered accounts on machine)
exports.getAccounts = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, email, avatar_url, default_servings, created_at FROM users ORDER BY id ASC'
    );
    if (rows.length > 0) {
      return res.json(rows);
    }
  } catch (err) {
    // ignore, use fallback
  }

  const accounts = fallbackUsers.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    avatar_url: u.avatar_url,
    default_servings: u.default_servings,
    created_at: u.created_at,
  }));
  res.json(accounts);
};

// GET /api/users/profile
exports.getProfile = async (req, res) => {
  const userId = parseInt(req.headers['x-user-id'] || '1', 10);
  try {
    const [userRows] = await pool.query(
      'SELECT id, name, email, avatar_url, default_servings, created_at FROM users WHERE id = ?',
      [userId]
    );

    if (userRows.length === 0) {
      return res.json(getFallbackProfile(userId));
    }

    const user = userRows[0];

    const [prefRows] = await pool.query(
      'SELECT dietary_restrictions, allergies, spice_level, preferred_cuisines FROM user_preferences WHERE user_id = ?',
      [userId]
    );

    let preferences = getUserPreferences(userId);

    if (prefRows.length > 0) {
      const p = prefRows[0];
      preferences = {
        dietary_restrictions: typeof p.dietary_restrictions === 'string' ? JSON.parse(p.dietary_restrictions) : (p.dietary_restrictions || []),
        allergies: typeof p.allergies === 'string' ? JSON.parse(p.allergies) : (p.allergies || []),
        spice_level: p.spice_level || 'Medium',
        preferred_cuisines: typeof p.preferred_cuisines === 'string' ? JSON.parse(p.preferred_cuisines) : (p.preferred_cuisines || []),
      };
    }

    const [savedRows] = await pool.query(
      `SELECT r.id, r.title, r.cuisine, r.thumbnail_url, r.prep_time, r.cook_time, r.category, r.base_servings
       FROM user_saved_recipes usr
       JOIN recipes r ON usr.recipe_id = r.id
       WHERE usr.user_id = ?
       ORDER BY usr.created_at DESC`,
      [userId]
    );

    const [createdRows] = await pool.query(
      `SELECT r.id, r.title, r.cuisine, r.thumbnail_url, r.prep_time, r.cook_time, r.category, r.base_servings
       FROM user_created_recipes ucr
       JOIN recipes r ON ucr.recipe_id = r.id
       WHERE ucr.user_id = ?
       ORDER BY ucr.created_at DESC`,
      [userId]
    );

    const [mealCountRows] = await pool.query('SELECT COUNT(*) as count FROM meal_plans WHERE user_id = ?', [userId]);
    const [groceryCountRows] = await pool.query('SELECT COUNT(*) as count FROM grocery_checks WHERE user_id = ? AND is_checked = 1', [userId]);

    const [recentMealRows] = await pool.query(
      `SELECT mp.id, mp.date, mp.meal_type, mp.servings, r.title as recipe_title, r.thumbnail_url
       FROM meal_plans mp
       JOIN recipes r ON mp.recipe_id = r.id
       WHERE mp.user_id = ?
       ORDER BY mp.date DESC LIMIT 5`,
      [userId]
    );

    res.json({
      user,
      preferences,
      stats: {
        savedCount: savedRows.length,
        createdCount: createdRows.length,
        mealPlansCount: mealCountRows[0]?.count || 0,
        groceryChecksCount: groceryCountRows[0]?.count || 0,
      },
      savedRecipes: savedRows,
      createdRecipes: createdRows,
      recentMealPlans: recentMealRows,
    });
  } catch (err) {
    res.json(getFallbackProfile(userId));
  }
};

// PUT /api/users/profile (Now supports email change with uniqueness check!)
exports.updateProfile = async (req, res) => {
  const userId = parseInt(req.headers['x-user-id'] || '1', 10);
  const { name, email, avatar_url, default_servings } = req.body;

  let cleanEmail = null;
  if (email) {
    cleanEmail = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }
  }

  try {
    // Check if new email is taken by another user
    if (cleanEmail) {
      const [existing] = await pool.query(
        'SELECT id FROM users WHERE LOWER(email) = ? AND id != ?',
        [cleanEmail, userId]
      );
      if (existing.length > 0) {
        return res.status(400).json({ error: 'This email is already registered to another account' });
      }
    }

    await pool.query(
      `UPDATE users 
       SET name = COALESCE(?, name),
           email = COALESCE(?, email),
           avatar_url = COALESCE(?, avatar_url), 
           default_servings = COALESCE(?, default_servings)
       WHERE id = ?`,
      [name ? name.trim() : null, cleanEmail, avatar_url, default_servings, userId]
    );

    // Also update in-memory fallback
    const updated = updateUser(userId, {
      name,
      email: cleanEmail,
      avatar_url,
      default_servings,
    });

    const [userRows] = await pool.query('SELECT id, name, email, avatar_url, default_servings, created_at FROM users WHERE id = ?', [userId]);

    res.json({
      success: true,
      user: userRows[0] || updated,
      message: 'Profile updated successfully',
    });
  } catch (err) {
    console.warn('MySQL error in updateProfile, updating in-memory store:', err.message);

    // Check email uniqueness in fallback
    if (cleanEmail) {
      const existingUser = getUserByEmail(cleanEmail);
      if (existingUser && existingUser.id !== userId) {
        return res.status(400).json({ error: 'This email is already registered to another account' });
      }
    }

    const updated = updateUser(userId, {
      name,
      email: cleanEmail,
      avatar_url,
      default_servings,
    });

    res.json({
      success: true,
      user: updated,
      message: 'Profile updated successfully',
    });
  }
};

// PUT /api/users/preferences
exports.updatePreferences = async (req, res) => {
  const userId = parseInt(req.headers['x-user-id'] || '1', 10);
  const { dietary_restrictions, allergies, spice_level, preferred_cuisines } = req.body;

  try {
    await pool.query(
      `INSERT INTO user_preferences (user_id, dietary_restrictions, allergies, spice_level, preferred_cuisines)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         dietary_restrictions = VALUES(dietary_restrictions),
         allergies = VALUES(allergies),
         spice_level = VALUES(spice_level),
         preferred_cuisines = VALUES(preferred_cuisines)`,
      [
        userId,
        JSON.stringify(dietary_restrictions || []),
        JSON.stringify(allergies || []),
        spice_level || 'Medium',
        JSON.stringify(preferred_cuisines || []),
      ]
    );

    const updated = setUserPreferences(userId, {
      dietary_restrictions,
      allergies,
      spice_level,
      preferred_cuisines,
    });

    res.json({
      success: true,
      preferences: updated,
      message: 'Preferences updated successfully',
    });
  } catch (err) {
    const updated = setUserPreferences(userId, {
      dietary_restrictions,
      allergies,
      spice_level,
      preferred_cuisines,
    });

    res.json({
      success: true,
      preferences: updated,
      message: 'Preferences updated successfully',
    });
  }
};

// PUT /api/users/password
exports.updatePassword = async (req, res) => {
  const userId = parseInt(req.headers['x-user-id'] || '1', 10);
  const { current_password, new_password } = req.body;

  if (!new_password || new_password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  try {
    const dummyHash = 'hashed_' + new_password;
    await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [dummyHash, userId]);
    updateUser(userId, { password: new_password });
    res.json({ success: true, message: 'Password changed successfully' });
  } catch (err) {
    updateUser(userId, { password: new_password });
    res.json({ success: true, message: 'Password changed successfully' });
  }
};

// POST /api/users/saved-recipes/:recipeId (Toggle bookmark)
exports.toggleSaveRecipe = async (req, res) => {
  const userId = parseInt(req.headers['x-user-id'] || '1', 10);
  const recipeId = parseInt(req.params.recipeId, 10);
  const savedSet = getUserSavedRecipeIds(userId);

  try {
    const [rows] = await pool.query(
      'SELECT id FROM user_saved_recipes WHERE user_id = ? AND recipe_id = ?',
      [userId, recipeId]
    );

    let isSaved = false;
    if (rows.length > 0) {
      await pool.query('DELETE FROM user_saved_recipes WHERE user_id = ? AND recipe_id = ?', [userId, recipeId]);
      savedSet.delete(recipeId);
      isSaved = false;
    } else {
      await pool.query('INSERT INTO user_saved_recipes (user_id, recipe_id) VALUES (?, ?)', [userId, recipeId]);
      savedSet.add(recipeId);
      isSaved = true;
    }

    res.json({
      success: true,
      saved: isSaved,
      savedCount: savedSet.size,
      message: isSaved ? 'Recipe saved to your profile' : 'Recipe removed from saved list',
    });
  } catch (err) {
    let isSaved = false;
    if (savedSet.has(recipeId)) {
      savedSet.delete(recipeId);
      isSaved = false;
    } else {
      savedSet.add(recipeId);
      isSaved = true;
    }
    res.json({
      success: true,
      saved: isSaved,
      savedCount: savedSet.size,
      message: isSaved ? 'Recipe saved to your profile' : 'Recipe removed from saved list',
    });
  }
};

// GET /api/users/saved-recipes
exports.getSavedRecipes = async (req, res) => {
  const userId = parseInt(req.headers['x-user-id'] || '1', 10);

  try {
    const [rows] = await pool.query(
      `SELECT r.* FROM user_saved_recipes usr
       JOIN recipes r ON usr.recipe_id = r.id
       WHERE usr.user_id = ?
       ORDER BY usr.created_at DESC`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    const savedSet = getUserSavedRecipeIds(userId);
    const saved = FALLBACK_RECIPES.filter((r) => savedSet.has(r.id));
    res.json(saved);
  }
};
