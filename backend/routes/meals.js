const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ message: 'No token' });
  const token = header.split(' ')[1];
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); } catch (e) { return res.status(401).json({ message: 'Invalid token' }); }
}

router.post('/', auth, async (req, res) => {
  try {
    const { food_id, quantity, meal_type, date } = req.body;
    const [result] = await db.query('INSERT INTO Meals (user_id, food_id, quantity, meal_type, date) VALUES (?,?,?,?,?)', [req.user.user_id, food_id, quantity, meal_type, date]);
    res.json({ meal_id: result.insertId });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.get('/', auth, async (req, res) => {
  try {
    const date = req.query.date;
    const [rows] = await db.query(
      `SELECT m.*, f.name as food_name, f.calories, f.protein, f.carbs, f.fats FROM Meals m JOIN Food_Items f ON m.food_id=f.food_id WHERE m.user_id=? ${date ? 'AND m.date=?' : ''}`,
      date ? [req.user.user_id, date] : [req.user.user_id]
    );
    res.json(rows);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;