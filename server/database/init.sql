CREATE DATABASE IF NOT EXISTS sizzlespoon;
USE sizzlespoon;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(500) DEFAULT NULL,
  default_servings INT DEFAULT 4,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_preferences (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  dietary_restrictions JSON,
  allergies JSON,
  spice_level ENUM('Mild', 'Medium', 'Hot', 'Extra Hot') DEFAULT 'Medium',
  preferred_cuisines JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_saved_recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  recipe_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_recipe (user_id, recipe_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_created_recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  recipe_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_created (user_id, recipe_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  cuisine VARCHAR(100) NOT NULL DEFAULT 'western',
  description TEXT,
  prep_time INT COMMENT 'minutes',
  cook_time INT COMMENT 'minutes',
  base_servings INT DEFAULT 4,
  video_url VARCHAR(500),
  thumbnail_url VARCHAR(500),
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS recipe_ingredients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  base_quantity DECIMAL(10,2) NOT NULL,
  unit VARCHAR(50),
  department VARCHAR(100),
  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS recipe_steps (
  id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_id INT NOT NULL,
  step_number INT NOT NULL,
  instruction TEXT NOT NULL,
  timer_seconds INT DEFAULT NULL,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS meal_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL DEFAULT 1,
  date DATE NOT NULL,
  meal_type ENUM('breakfast','lunch','dinner') NOT NULL,
  recipe_id INT NOT NULL,
  servings INT DEFAULT 2,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS grocery_checks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL DEFAULT 1,
  item_key VARCHAR(255) NOT NULL,
  is_checked BOOLEAN DEFAULT FALSE,
  UNIQUE KEY unique_user_item (user_id, item_key)
);
