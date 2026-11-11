const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Auth endpoints
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/accounts', userController.getAccounts);

// Profile & Preferences
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.put('/preferences', userController.updatePreferences);
router.put('/password', userController.updatePassword);

// Saved Recipes
router.get('/saved-recipes', userController.getSavedRecipes);
router.post('/saved-recipes/:recipeId', userController.toggleSaveRecipe);

module.exports = router;
