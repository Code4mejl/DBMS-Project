// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const usersRouter = require('./routes/users');
// const foodsRouter = require('./routes/foods');
// const mealsRouter = require('./routes/meals');
// const preferencesRouter = require('./routes/preferences');
// const progressRouter = require('./routes/progress');

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/users', usersRouter);
// app.use('/api/foods', foodsRouter);
// app.use('/api/meals', mealsRouter);
// app.use('/api/preferences', preferencesRouter);
// app.use('/api/progress', progressRouter);

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log('Server running on', PORT));


// import express from "express";
// import cors from "cors";
// import mealsRoutes from "./routes/meals.js";
// import pool from "./db.js"; // ensure this exports your MySQL connection

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ Mount the meals routes here
// app.use("/api/meals", mealsRoutes);

// app.get("/", (req, res) => {
//   res.send("NutriTrack backend is running!");
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));



import express from "express";
import cors from "cors";
import mealsRouter from "./routes/meals.js";
import usersRouter from "./routes/users.js";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ This line is crucial:
app.use("/api/meals", mealsRouter);
app.use("/api/users", usersRouter);

app.listen(5000, () => console.log("✅ Server running on port 5000"));
