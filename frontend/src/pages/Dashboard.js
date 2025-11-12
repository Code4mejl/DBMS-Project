import React, { useEffect, useState } from 'react';
import API from '../api';
import { authHeader } from '../auth';

export default function Dashboard(){
  const [foods,setFoods] = useState([]);
  const [meals,setMeals] = useState([]);
  const [form,setForm] = useState({food_id:'',quantity:100,meal_type:'Breakfast',date:new Date().toISOString().slice(0,10)});

  useEffect(()=>{ loadFoods(); loadMeals(); },[]);
  async function loadFoods(){ const res = await API.get('/foods'); setFoods(res.data); }
  async function loadMeals(){ try{ const res = await API.get('/meals?date=' + form.date, { headers: authHeader() }); setMeals(res.data);}catch(e){ setMeals([]); } }
  async function addMeal(e){ e.preventDefault(); await API.post('/meals', form, { headers: authHeader() }); await loadMeals(); }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <form onSubmit={addMeal} className="mb-4">
        <select value={form.food_id} onChange={e=>setForm({...form,food_id:e.target.value})} className="p-2 border mr-2">
          <option value="">Select food</option>
          {foods.map(f=> <option key={f.food_id} value={f.food_id}>{f.name} - {f.calories} kcal/100g</option>)}
        </select>
        <input type="number" value={form.quantity} onChange={e=>setForm({...form,quantity:e.target.value})} className="p-2 border mr-2" />
        <select value={form.meal_type} onChange={e=>setForm({...form,meal_type:e.target.value})} className="p-2 border mr-2">
          <option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Snack</option>
        </select>
        <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="p-2 border mr-2" />
        <button className="p-2 bg-blue-600 text-white">Add</button>
      </form>

      <h2 className="text-lg mb-2">Meals</h2>
      <table className="w-full table-auto border">
        <thead><tr><th>Food</th><th>Qty</th><th>kcal</th><th>Protein</th><th>Type</th></tr></thead>
        <tbody>
          {meals.map(m => (
            <tr key={m.meal_id}>
              <td>{m.food_name}</td>
              <td>{m.quantity} g</td>
              <td>{((m.calories*m.quantity)/100).toFixed(1)}</td>
              <td>{((m.protein*m.quantity)/100).toFixed(1)}</td>
              <td>{m.meal_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}