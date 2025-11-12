const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

function auth(req, res, next) { const header = req.headers['authorization']; if (!header) return res.status(401).json({ message: 'No token' }); const token = header.split(' ')[1]; try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); } catch (e) { return res.status(401).json({ message: 'Invalid token' }); } }

router.post('/', auth, async (req, res) => {
  const { preference_type, value } = req.body;
  const [result] = await db.query('INSERT INTO User_Preferences (user_id, preference_type, value) VALUES (?,?,?)', [req.user.user_id, preference_type, value]);
  res.json({ preference_id: result.insertId });
});

router.get('/', auth, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM User_Preferences WHERE user_id=?', [req.user.user_id]);
  res.json(rows);
});

module.exports = router;