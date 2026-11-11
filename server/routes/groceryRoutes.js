const express = require('express');
const router = express.Router();
const { getGroceryList, toggleGroceryCheck } = require('../controllers/groceryController');

router.get('/', getGroceryList);
router.post('/check', toggleGroceryCheck);

module.exports = router;
