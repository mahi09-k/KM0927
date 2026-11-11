const FALLBACK_RECIPES = require('../database/allRecipes');

// Multi-user repository
let fallbackUsers = [
  {
    id: 1,
    name: 'Ayesha Rahman',
    email: 'ayesha@sizzlespoon.com',
    password: 'password123',
    password_hash: 'hashed_password123',
    avatar_url: null,
    default_servings: 4,
    created_at: '2024-03-15T10:00:00.000Z',
  },
];

let fallbackUserPreferencesMap = new Map([
  [
    1,
    {
      dietary_restrictions: ['Halal', 'Low-Carb'],
      allergies: ['Peanuts', 'Shellfish'],
      spice_level: 'Medium',
      preferred_cuisines: ['Bangladeshi', 'Indian', 'Western'],
    },
  ],
]);

let fallbackUserSavedMap = new Map([
  [1, new Set([1, 4, 51, 101])],
]);

let fallbackUserCreatedMap = new Map([
  [1, new Set([1, 2])],
]);

let fallbackUserMealPlansMap = new Map([
  [
    1,
    [
      { id: 1, user_id: 1, date: new Date().toISOString().split('T')[0], meal_type: 'dinner', recipe_id: 1, servings: 4 },
      { id: 2, user_id: 1, date: new Date().toISOString().split('T')[0], meal_type: 'lunch', recipe_id: 51, servings: 4 },
    ],
  ],
]);

let fallbackUserGroceryChecksMap = new Map([
  [1, new Map()],
]);

// Helper Accessors
const getUserById = (id) => fallbackUsers.find((u) => u.id === parseInt(id, 10));
const getUserByEmail = (email) =>
  fallbackUsers.find((u) => (u.email || '').toLowerCase() === (email || '').toLowerCase().trim());

const addUser = (userData) => {
  const nextId = fallbackUsers.reduce((max, u) => Math.max(max, u.id), 0) + 1;
  const newUser = {
    id: nextId,
    name: userData.name || 'Chef ' + nextId,
    email: userData.email.toLowerCase().trim(),
    password: userData.password || 'password123',
    password_hash: 'hashed_' + (userData.password || 'password123'),
    avatar_url: userData.avatar_url || null,
    default_servings: parseInt(userData.default_servings || 4, 10),
    created_at: new Date().toISOString(),
  };

  fallbackUsers.push(newUser);

  // Initialize their default preferences and sets
  fallbackUserPreferencesMap.set(nextId, {
    dietary_restrictions: ['Halal'],
    allergies: [],
    spice_level: 'Medium',
    preferred_cuisines: ['Bangladeshi', 'Indian', 'Western'],
  });
  fallbackUserSavedMap.set(nextId, new Set([1, 51]));
  fallbackUserCreatedMap.set(nextId, new Set());
  fallbackUserMealPlansMap.set(nextId, []);
  fallbackUserGroceryChecksMap.set(nextId, new Map());

  return newUser;
};

const updateUser = (id, updates) => {
  const user = getUserById(id);
  if (!user) return null;
  if (updates.name !== undefined) user.name = updates.name.trim();
  if (updates.email !== undefined) user.email = updates.email.toLowerCase().trim();
  if (updates.avatar_url !== undefined) user.avatar_url = updates.avatar_url;
  if (updates.default_servings !== undefined) user.default_servings = parseInt(updates.default_servings, 10);
  if (updates.password !== undefined) {
    user.password = updates.password;
    user.password_hash = 'hashed_' + updates.password;
  }
  return user;
};

const getUserPreferences = (userId) => {
  const uid = parseInt(userId, 10);
  if (!fallbackUserPreferencesMap.has(uid)) {
    fallbackUserPreferencesMap.set(uid, {
      dietary_restrictions: ['Halal'],
      allergies: [],
      spice_level: 'Medium',
      preferred_cuisines: ['Bangladeshi', 'Indian', 'Western'],
    });
  }
  return fallbackUserPreferencesMap.get(uid);
};

const setUserPreferences = (userId, prefs) => {
  const uid = parseInt(userId, 10);
  const current = getUserPreferences(uid);
  const updated = {
    ...current,
    ...prefs,
  };
  fallbackUserPreferencesMap.set(uid, updated);
  return updated;
};

const getUserSavedRecipeIds = (userId) => {
  const uid = parseInt(userId, 10);
  if (!fallbackUserSavedMap.has(uid)) {
    fallbackUserSavedMap.set(uid, new Set());
  }
  return fallbackUserSavedMap.get(uid);
};

const getUserCreatedRecipeIds = (userId) => {
  const uid = parseInt(userId, 10);
  if (!fallbackUserCreatedMap.has(uid)) {
    fallbackUserCreatedMap.set(uid, new Set());
  }
  return fallbackUserCreatedMap.get(uid);
};

const getUserMealPlans = (userId) => {
  const uid = parseInt(userId, 10);
  if (!fallbackUserMealPlansMap.has(uid)) {
    fallbackUserMealPlansMap.set(uid, []);
  }
  return fallbackUserMealPlansMap.get(uid);
};

const getUserGroceryChecks = (userId) => {
  const uid = parseInt(userId, 10);
  if (!fallbackUserGroceryChecksMap.has(uid)) {
    fallbackUserGroceryChecksMap.set(uid, new Map());
  }
  return fallbackUserGroceryChecksMap.get(uid);
};

module.exports = {
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
  // Backward compatibility:
  fallbackUser: fallbackUsers[0],
  fallbackPreferences: fallbackUserPreferencesMap.get(1),
  fallbackSavedRecipeIds: fallbackUserSavedMap.get(1),
  fallbackCreatedRecipeIds: fallbackUserCreatedMap.get(1),
  fallbackMealPlans: fallbackUserMealPlansMap.get(1),
  fallbackGroceryChecks: fallbackUserGroceryChecksMap.get(1),
};
