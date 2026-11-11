const express = require('express');
const router = express.Router();
const { getAllRecipes, getRecipeById, pantryMatch } = require('../controllers/recipeController');

// pantry-match MUST be before /:id to avoid param capture
router.post('/pantry-match', pantryMatch);
router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);

module.exports = router;
