require('dotenv').config();
const express = require('express');
const cors = require('cors');
const recipeRoutes = require('./routes/recipeRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');
const groceryRoutes = require('./routes/groceryRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const pool = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/meal-plans', mealPlanRoutes);
app.use('/api/grocery', groceryRoutes);
app.use('/api/users', userRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'SizzleSpoon 2.0',
    timestamp: new Date().toISOString(),
  });
});

app.use(errorHandler);

if (!process.env.VERCEL) {
  app.listen(PORT, async () => {
    console.log(`🍳 SizzleSpoon server running on port ${PORT}`);
    try {
      const conn = await pool.getConnection();
      console.log('✅ MySQL database connection established');
      conn.release();
    } catch (err) {
      console.warn(`⚠️ MySQL connection notice: ${err.message}`);
      console.warn('👉 To connect database: ensure MySQL is running and database/init.sql is imported.');
    }
  });
}

module.exports = app;
