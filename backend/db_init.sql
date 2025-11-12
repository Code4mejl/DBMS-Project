CREATE DATABASE IF NOT EXISTS nutritrack;
USE nutritrack;

CREATE TABLE IF NOT EXISTS Users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  age INT,
  weight FLOAT,
  height FLOAT,
  activity_level ENUM('Low','Medium','High'),
  goal ENUM('Lose Weight','Maintain Weight','Gain Weight')
);

CREATE TABLE IF NOT EXISTS Food_Items (
  food_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  calories FLOAT,
  protein FLOAT,
  carbs FLOAT,
  fats FLOAT
);

CREATE TABLE IF NOT EXISTS Meals (
  meal_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  food_id INT,
  quantity FLOAT,
  meal_type ENUM('Breakfast','Lunch','Dinner','Snack'),
  date DATE,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (food_id) REFERENCES Food_Items(food_id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS Meal_Plans (
  plan_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  date DATE,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS MealPlan_Meals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  plan_id INT,
  meal_id INT,
  FOREIGN KEY (plan_id) REFERENCES Meal_Plans(plan_id) ON DELETE CASCADE,
  FOREIGN KEY (meal_id) REFERENCES Meals(meal_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS User_Preferences (
  preference_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  preference_type ENUM('Allergy','Dislike','Like','DietType'),
  value VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS User_Progress (
  progress_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  date DATE,
  weight FLOAT,
  calories_consumed FLOAT,
  calories_burned FLOAT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

INSERT INTO Food_Items (name, calories, protein, carbs, fats) VALUES
('Rice (100g)', 130, 2.7, 28, 0.3),
('Chicken (100g)', 239, 27, 0, 14),
('Oats (100g)', 389, 17, 66, 7),
('Apple (100g)', 52, 0.3, 14, 0.2),
('Milk (100g)', 42, 3.4, 5, 1);