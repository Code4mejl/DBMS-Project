import React, { useState, useEffect } from "react";
import API from "../api.js";
import { FOOD_DATA } from "../foodData.js";
import "./Dashboard.css";

export default function Dashboard() {
  const [meals, setMeals] = useState([]);
  const [form, setForm] = useState({ meal_name: "", total_calories: "", notes: "" });
  const [summary, setSummary] = useState(null);
  const user_id = 1;

  async function fetchMeals() {
    try {
      const res = await API.get(`/meals/${user_id}`);
      setMeals(res.data);
    } catch (err) {
      console.error("Error fetching meals:", err);
    }
  }

  useEffect(() => {
    fetchMeals();
  }, []);

  function calculateNutrition(foodName, calories) {
    const match = FOOD_DATA.find(
      f => f.name.toLowerCase() === foodName.toLowerCase()
    );
    if (!match) return null;

    const factor = calories / match.calories;
    return {
      protein: (match.protein * factor).toFixed(1),
      carbs: (match.carbs * factor).toFixed(1),
      fat: (match.fat * factor).toFixed(1)
    };
  }

  async function handleAdd(e) {
    e.preventDefault();
    const nutrition = calculateNutrition(form.meal_name, form.total_calories);
    setSummary(nutrition);
    if (!nutrition) {
      alert("Food not found in database. Try another name!");
      return;
    }

    await API.post("/meals", { ...form, user_id, ...nutrition });
    setForm({ meal_name: "", total_calories: "", notes: "" });
    fetchMeals();
  }

  async function handleDelete(id) {
    if (window.confirm("Delete this meal?")) {
      await API.delete(`/meals/${id}`);
      fetchMeals();
    }
  }

  const totalCalories = meals.reduce((sum, m) => sum + Number(m.total_calories || 0), 0);
  const totalProtein = meals.reduce((sum, m) => sum + Number(m.protein || 0), 0);
  const totalCarbs = meals.reduce((sum, m) => sum + Number(m.carbs || 0), 0);
  const totalFat = meals.reduce((sum, m) => sum + Number(m.fat || 0), 0);

  return (
    <div className="dashboard">
      <h1>🥗 Nutrition Dashboard</h1>

      <form className="meal-form" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Food name (e.g. Rice, Egg)"
          value={form.meal_name}
          onChange={(e) => setForm({ ...form, meal_name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Calories"
          value={form.total_calories}
          onChange={(e) => setForm({ ...form, total_calories: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <button type="submit">➕ Add Meal</button>
      </form>

      {/* 🧮 Summary after upload */}
      {summary && (
        <div className="nutrition-summary">
          <h3>🍽️ Nutrition Breakdown</h3>
          <p>Protein: {summary.protein} g</p>
          <p>Carbs: {summary.carbs} g</p>
          <p>Fat: {summary.fat} g</p>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Meal</th>
            <th>Calories</th>
            <th>Protein (g)</th>
            <th>Carbs (g)</th>
            <th>Fat (g)</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((m) => (
            <tr key={m.meal_id}>
              <td>{m.meal_name}</td>
              <td>{m.total_calories}</td>
              <td>{m.protein}</td>
              <td>{m.carbs}</td>
              <td>{m.fat}</td>
              <td>{m.notes}</td>
              <td>
                <button onClick={() => handleDelete(m.meal_id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="summary">
        <h3>📊 Daily Summary</h3>
        <p>Total Meals: {meals.length}</p>
        <p>Calories: {totalCalories} kcal</p>
        <p>Protein: {totalProtein} g</p>
        <p>Carbs: {totalCarbs} g</p>
        <p>Fat: {totalFat} g</p>
      </div>
    </div>
  );
}
