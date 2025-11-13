// import axios from 'axios';
// const API = axios.create({ baseURL: process.env.REACT_APP_API });
// export default API;

// import axios from "axios";

// export default axios.create({
//   baseURL: "http://localhost:5000/api",
// });


import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api", // ✅ matches the backend
});
