const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const usersRouter = require('./routes/users');
const foodsRouter = require('./routes/foods');
const mealsRouter = require('./routes/meals');
const preferencesRouter = require('./routes/preferences');
const progressRouter = require('./routes/progress');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/foods', foodsRouter);
app.use('/api/meals', mealsRouter);
app.use('/api/preferences', preferencesRouter);
app.use('/api/progress', progressRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server running on', PORT));