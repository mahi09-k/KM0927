const express = require('express');
const router = express.Router();
const { getMealPlan, addMealPlan, removeMealPlan } = require('../controllers/mealPlanController');

router.get('/', getMealPlan);
router.post('/', addMealPlan);
router.delete('/:id', removeMealPlan);

module.exports = router;
