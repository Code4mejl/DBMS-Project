 -- CREATE DATABASE IF NOT EXISTS nutritrack;
  -- USE nutritrack;

-- CREATE TABLE IF NOT EXISTS Users (
--   user_id INT PRIMARY KEY AUTO_INCREMENT,
--   name VARCHAR(100),
--   email VARCHAR(100) UNIQUE,
--   password VARCHAR(255),
--   age INT,
--   weight FLOAT,
--   height FLOAT,
--   activity_level ENUM('Low','Medium','High'),
--   goal ENUM('Lose Weight','Maintain Weight','Gain Weight')
-- );

-- CREATE TABLE IF NOT EXISTS Food_Items (
--   food_id INT PRIMARY KEY AUTO_INCREMENT,
--   name VARCHAR(100),
--   calories FLOAT,
--   protein FLOAT,
--   carbs FLOAT,
--   fats FLOAT
-- );

-- CREATE TABLE IF NOT EXISTS Meals (
--   meal_id INT PRIMARY KEY AUTO_INCREMENT,
--   user_id INT,
--   food_id INT,
--   quantity FLOAT,
--   meal_type ENUM('Breakfast','Lunch','Dinner','Snack'),
--   date DATE,
--   FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
--   FOREIGN KEY (food_id) REFERENCES Food_Items(food_id) ON DELETE RESTRICT
-- );

-- CREATE TABLE IF NOT EXISTS Meal_Plans (
--   plan_id INT PRIMARY KEY AUTO_INCREMENT,
--   user_id INT,
--   date DATE,
--   FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
-- );

-- CREATE TABLE IF NOT EXISTS MealPlan_Meals (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   plan_id INT,
--   meal_id INT,
--   FOREIGN KEY (plan_id) REFERENCES Meal_Plans(plan_id) ON DELETE CASCADE,
--   FOREIGN KEY (meal_id) REFERENCES Meals(meal_id) ON DELETE CASCADE
-- );

-- CREATE TABLE IF NOT EXISTS User_Preferences (
--   preference_id INT PRIMARY KEY AUTO_INCREMENT,
--   user_id INT,
--   preference_type ENUM('Allergy','Dislike','Like','DietType'),
--   value VARCHAR(100),
--   FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
-- );

-- CREATE TABLE IF NOT EXISTS User_Progress (
--   progress_id INT PRIMARY KEY AUTO_INCREMENT,
--   user_id INT,
--   date DATE,
--   weight FLOAT,
--   calories_consumed FLOAT,
--   calories_burned FLOAT,
--   FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
-- );

-- INSERT INTO Food_Items (name, calories, protein, carbs, fats) VALUES
-- ('Rice (100g)', 130, 2.7, 28, 0.3),
-- ('Chicken (100g)', 239, 27, 0, 14),
-- ('Oats (100g)', 389, 17, 66, 7),
-- ('Apple (100g)', 52, 0.3, 14, 0.2),
-- ('Milk (100g)', 42, 3.4, 5, 1);




-- 0️⃣ CREATE AND SELECT DATABASE
CREATE DATABASE IF NOT EXISTS nutritrack;
USE nutritrack;

-- 1️⃣ USERS TABLE
CREATE TABLE IF NOT EXISTS Users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  age INT,
  gender VARCHAR(10),
  height DECIMAL(5,2),
  weight DECIMAL(5,2),
  activity_level VARCHAR(20),
  goal VARCHAR(30),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2️⃣ FOOD_ITEMS TABLE
CREATE TABLE IF NOT EXISTS Food_Items (
  food_id INT AUTO_INCREMENT PRIMARY KEY,
  food_name VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  calories DECIMAL(6,2),
  protein DECIMAL(6,2),
  carbs DECIMAL(6,2),
  fat DECIMAL(6,2),
  serving_size VARCHAR(50),
  allergens TEXT
);

-- 3️⃣ MEALS TABLE
CREATE TABLE IF NOT EXISTS Meals (
  meal_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  meal_name VARCHAR(100),
  date_logged DATE DEFAULT (CURDATE()),
  total_calories DECIMAL(6,2),
  notes TEXT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Junction Table: Meals ↔ Food_Items
CREATE TABLE IF NOT EXISTS Meal_Food_Items (
  meal_id INT,
  food_id INT,
  quantity DECIMAL(6,2),
  PRIMARY KEY(meal_id, food_id),
  FOREIGN KEY (meal_id) REFERENCES Meals(meal_id) ON DELETE CASCADE,
  FOREIGN KEY (food_id) REFERENCES Food_Items(food_id)
);

-- 4️⃣ MEAL_PLANS TABLE
CREATE TABLE IF NOT EXISTS Meal_Plans (
  plan_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  plan_name VARCHAR(100),
  start_date DATE,
  end_date DATE,
  total_calories DECIMAL(6,2),
  description TEXT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Meal_Plan_Meals (
  plan_id INT,
  meal_id INT,
  PRIMARY KEY(plan_id, meal_id),
  FOREIGN KEY (plan_id) REFERENCES Meal_Plans(plan_id) ON DELETE CASCADE,
  FOREIGN KEY (meal_id) REFERENCES Meals(meal_id) ON DELETE CASCADE
);

-- 5️⃣ USER_PREFERENCES TABLE
CREATE TABLE IF NOT EXISTS User_Preferences (
  preference_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  diet_type VARCHAR(30),
  calorie_target DECIMAL(6,2),
  excluded_ingredients TEXT,
  meal_frequency INT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- 6️⃣ USER_PROGRESS TABLE
CREATE TABLE IF NOT EXISTS User_Progress (
  progress_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  date DATE DEFAULT (CURDATE()),
  weight DECIMAL(5,2),
  bmi DECIMAL(5,2),
  calories_consumed DECIMAL(6,2),
  calories_burned DECIMAL(6,2),
  notes TEXT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);
