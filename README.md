# 🍳 SizzleSpoon 2.0 (Mob-Infused)

A premium, mobile-first recipe and meal-planning web application built with Node.js/Express, MySQL, React 18, Vite, Tailwind CSS, Lucide Icons, and React Three Fiber.

---

## 🏗️ Architecture Overview

```
d:\KAYUM\sizzlespoon\
│
├── 📁 server/                              # Node.js + Express Backend (Port 5001)
│   ├── 📁 config/
│   │   └── db.js                           # mysql2 connection pool (dotenv-driven)
│   ├── 📁 controllers/
│   │   ├── recipeController.js             # CRUD + Pantry reverse-match logic
│   │   ├── mealPlanController.js           # Mon-Sun weekly meal plan CRUD
│   │   └── groceryController.js            # Aggregated, summed, department-grouped list
│   ├── 📁 database/
│   │   ├── init.sql                        # Relational schema (all 6 normalized tables)
│   │   └── seed.js                         # 3 realistic recipes with steps & ingredients
│   ├── 📁 middleware/
│   │   └── errorHandler.js                 # Global error handling middleware
│   ├── 📁 routes/
│   │   ├── recipeRoutes.js
│   │   ├── mealPlanRoutes.js
│   │   └── groceryRoutes.js
│   ├── .env                                # DB configuration & Port
│   ├── .env.example
│   ├── package.json
│   └── index.js                            # Express entry point
│
├── 📁 client/                              # React 18 + Vite Frontend (Port 5173)
│   ├── 📁 src/
│   │   ├── 📁 api/
│   │   │   └── index.js                    # Axios API client
│   │   ├── 📁 components/
│   │   │   ├── 📁 feed/                    # Video feed, filter pills, recipe card
│   │   │   ├── 📁 grocery/                 # Grouped department grocery list & check toggle
│   │   │   ├── 📁 hero/                    # React Three Fiber 3D rotating bowl/spoon (Desktop)
│   │   │   ├── 📁 layout/                  # Mobile shell (430px centered) & bottom navigation
│   │   │   ├── 📁 pantry/                  # Pantry chip selector & ranked match results
│   │   │   ├── 📁 planner/                 # Mon-Sun x Breakfast/Lunch/Dinner visual calendar
│   │   │   └── 📁 recipe/                  # Client-side scaler & swipeable Cook Mode with timers
│   │   ├── 📁 hooks/
│   │   │   ├── useSwipe.js                 # Mobile touch swipe detector
│   │   │   └── useTimer.js                 # Circular SVG countdown timer hook
│   │   ├── 📁 pages/                       # Home, Recipe detail, Planner, Grocery, Pantry
│   │   ├── 📁 store/
│   │   │   └── pantryStore.js              # Zustand store for pantry items
│   │   ├── App.jsx
│   │   ├── index.css                       # Warm editorial typography & colors
│   │   └── main.jsx
│   ├── tailwind.config.js                  # Warm palette tokens (#FAFAF8, #1C1C1A, #E8572A)
│   ├── vite.config.js                      # Dev proxy to http://localhost:5001
│   └── package.json
│
├── start-server.bat                        # Double-click to start backend
├── start-client.bat                        # Double-click to start frontend
└── seed-db.bat                             # Seed realistic recipes to MySQL
```

---

## 🗄️ Normalized Relational Database Schema

Import `server/database/init.sql` into MySQL:

1. **`users`** (`id`, `username`, `email`, `password_hash`, `created_at`)
2. **`recipes`** (`id`, `title`, `description`, `prep_time`, `cook_time`, `base_servings`, `video_url`, `thumbnail_url`, `category`, `created_at`)
3. **`recipe_ingredients`** (`id`, `recipe_id` FK, `name`, `base_quantity`, `unit`, `department`)
4. **`recipe_steps`** (`id`, `recipe_id` FK, `step_number`, `instruction`, `timer_seconds`)
5. **`meal_plans`** (`id`, `user_id` FK, `date`, `meal_type` ENUM, `recipe_id` FK, `servings`)
6. **`grocery_checks`** (`id`, `user_id`, `item_key`, `is_checked`, UNIQUE `(user_id, item_key)`)

---

## 🚀 Quick Start Guide

### 1. Database Setup
Make sure your MySQL service is running, create the database, and run the seeder:
```bash
# In MySQL Workbench, phpMyAdmin, or mysql CLI:
# Import server/database/init.sql

# Seed 3 realistic recipes (Creamy Tuscan Pasta, Honey Garlic Salmon, Shakshuka):
.\seed-db.bat
# or: agy-node server/database/seed.js
```

### 2. Start the Backend (Port 5001)
```bash
.\start-server.bat
# or: agy-node server/index.js
```

### 3. Start the Frontend (Port 5173)
```bash
.\start-client.bat
# or: cd client && npm run dev
```
Open **`http://localhost:5173`** in your browser!

---

## ✨ Features Implemented

1. **Reels/Video Explore Feed**:
   - Recipe cards with video playback indicators and category badges
   - Quick filters: *Under 30 Mins*, *Vegetarian*, *Pasta*, *Seafood*, *Breakfast*
2. **Interactive Cook Mode & Dynamic Scaler**:
   - Pure client-side math dynamically recalculates ingredient quantities based on selected servings ratio
   - Full-screen, distraction-free swipeable card carousel
   - Active step countdown timers with circular SVG progress animations, play/pause/reset
3. **Weekly Meal Planner**:
   - Mon–Sun visual calendar grid across Breakfast, Lunch, and Dinner
   - Recipe picker modal and one-click removal
4. **Smart Grocery List**:
   - Aggregates duplicate ingredients across planned meals using SQL `ROUND(SUM(ri.base_quantity * (mp.servings / r.base_servings)), 2)`
   - Groups items automatically by department (*Produce*, *Dairy*, *Pantry*, *Meat/Seafood*)
   - Persistent checkbox toggling via `POST /api/grocery/check`
5. **Pantry Mode (Reverse Search)**:
   - Multi-select interactive pantry interface
   - `POST /api/recipes/pantry-match` queries matched ingredients and ranks recipes by highest match count
6. **3D Hero Element**:
   - Standalone React Three Fiber rotating bowl and floating spoon with studio ambient lighting
   - Visible on desktop viewports and gracefully hidden on mobile viewports
