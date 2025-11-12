const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, age, weight, height, activity_level, goal } = req.body;
    const [exists] = await db.query('SELECT user_id FROM Users WHERE email = ?', [email]);
    if (exists.length) return res.status(400).json({ message: 'Email already used' });
    const hash = await bcrypt.hash(password, 10);
    const [result] = await db.query('INSERT INTO Users (name,email,password,age,weight,height,activity_level,goal) VALUES (?,?,?,?,?,?,?,?)', [name,email,hash,age,weight,height,activity_level,goal]);
    res.json({ user_id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
    if (!rows.length) return res.status(400).json({ message: 'Invalid credentials' });
    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { user_id: user.user_id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

function auth(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ message: 'No token' });
  const token = header.split(' ')[1];
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

router.get('/me', auth, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, name, email, age, weight, height, activity_level, goal FROM Users WHERE user_id = ?', [req.user.user_id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/me', auth, async (req, res) => {
  try {
    const { name, age, weight, height, activity_level, goal } = req.body;
    await db.query('UPDATE Users SET name=?, age=?, weight=?, height=?, activity_level=?, goal=? WHERE user_id=?', [name, age, weight, height, activity_level, goal, req.user.user_id]);
    res.json({ message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;