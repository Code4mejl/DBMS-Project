// const express = require('express');
// const router = express.Router();
// const db = require('../db');
// const jwt = require('jsonwebtoken');

// function auth(req, res, next) {
//   const header = req.headers['authorization'];
//   if (!header) return res.status(401).json({ message: 'No token' });
//   const token = header.split(' ')[1];
//   try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); } catch (e) { return res.status(401).json({ message: 'Invalid token' }); }
// }

// router.post('/', auth, async (req, res) => {
//   try {
//     const { food_id, quantity, meal_type, date } = req.body;
//     const [result] = await db.query('INSERT INTO Meals (user_id, food_id, quantity, meal_type, date) VALUES (?,?,?,?,?)', [req.user.user_id, food_id, quantity, meal_type, date]);
//     res.json({ meal_id: result.insertId });
//   } catch (err) { res.status(500).json({ message: 'Server error' }); }
// });

// router.get('/', auth, async (req, res) => {
//   try {
//     const date = req.query.date;
//     const [rows] = await db.query(
//       `SELECT m.*, f.name as food_name, f.calories, f.protein, f.carbs, f.fats FROM Meals m JOIN Food_Items f ON m.food_id=f.food_id WHERE m.user_id=? ${date ? 'AND m.date=?' : ''}`,
//       date ? [req.user.user_id, date] : [req.user.user_id]
//     );
//     res.json(rows);
//   } catch (err) { res.status(500).json({ message: 'Server error' }); }
// });

// module.exports = router;



// import express from "express";
// import pool from "../db.js";
// const router = express.Router();
import express from "express";
import pool from "../db.js";

const router = express.Router();

// ✅ GET all meals for a specific user
router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM Meals WHERE user_id = ? ORDER BY date DESC",
      [user_id]
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching meals:", err);
    res.status(500).json({ message: "Server error while fetching meals" });
  }
});

// ✅ ADD a new meal
router.post("/", async (req, res) => {
  const { user_id, meal_name, total_calories, protein, carbs, fat, notes } = req.body;
  try {
    await pool.query(
      `INSERT INTO Meals (user_id, meal_name, total_calories, protein, carbs, fat, notes, date) 
       VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE())`,
      [user_id, meal_name, total_calories, protein, carbs, fat, notes]
    );
    res.status(201).json({ message: "Meal added successfully ✅" });
  } catch (err) {
    console.error("❌ Error adding meal:", err);
    res.status(500).json({ message: "Server error while adding meal" });
  }
});

// ✅ UPDATE an existing meal
router.put("/:meal_id", async (req, res) => {
  const { meal_id } = req.params;
  const { meal_name, total_calories, protein, carbs, fat, notes } = req.body;
  try {
    await pool.query(
      `UPDATE Meals 
       SET meal_name = ?, total_calories = ?, protein = ?, carbs = ?, fat = ?, notes = ? 
       WHERE meal_id = ?`,
      [meal_name, total_calories, protein, carbs, fat, notes, meal_id]
    );
    res.json({ message: "Meal updated successfully ✏️" });
  } catch (err) {
    console.error("❌ Error updating meal:", err);
    res.status(500).json({ message: "Server error while updating meal" });
  }
});

// ✅ DELETE a meal
router.delete("/:meal_id", async (req, res) => {
  const { meal_id } = req.params;
  try {
    await pool.query("DELETE FROM Meals WHERE meal_id = ?", [meal_id]);
    res.json({ message: "Meal deleted successfully 🗑️" });
  } catch (err) {
    console.error("❌ Error deleting meal:", err);
    res.status(500).json({ message: "Server error while deleting meal" });
  }
});

export default router;
