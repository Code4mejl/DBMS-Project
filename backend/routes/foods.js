const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM Food_Items');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { name, calories, protein, carbs, fats } = req.body;
  const [result] = await db.query('INSERT INTO Food_Items (name, calories, protein, carbs, fats) VALUES (?,?,?,?,?)', [name, calories, protein, carbs, fats]);
  res.json({ food_id: result.insertId });
});

module.exports = router;