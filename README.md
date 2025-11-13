# Personalized Diet and Nutrition Tracker (React + Express + MySQL)m

## Quick start (Windows / Linux / macOS)

1. Install MySQL and create a user with password 'admin123' or change .env accordingly.
2. Extract this folder.

### Database
- Run the SQL script to create DB and seed data:
  ```bash
  cd backend
  mysql -u root -p < db_init.sql
  ```
  (If password is required, enter it when prompted.)

### Backend
```bash
cd backend
npm install
# create .env from .env.example and update DB_PASS if needed
# e.g. DB_PASS=admin123
npm run dev
```

### Frontend
```bash
cd frontend
npm install
# create .env from .env.example
npm start
```

Open http://localhost:3000 and the backend runs on port 4000 by default.

JWT secret in .env.example is 'supersecretkey'.

<a href="https://ibb.co/5X7NMxsP"><img src="https://i.ibb.co/6cd3nJDk/Screenshot-2025-11-13-221707.png" alt="Screenshot-2025-11-13-221707" border="0"></a>

<a href="https://ibb.co/5X7NMxsP"><img src="https://i.ibb.co/6cd3nJDk/Screenshot-2025-11-13-221707.png" alt="Screenshot-2025-11-13-221707" border="0"></a>

<a href="https://ibb.co/Swhv7gt1"><img src="https://i.ibb.co/fdh0GWkK/Screenshot-2025-11-13-221942.png" alt="Screenshot-2025-11-13-221942" border="0"></a>

<a href="https://ibb.co/zVYmpHFY"><img src="https://i.ibb.co/v4GcpvhG/Screenshot-2025-11-12-225723.png" alt="Screenshot-2025-11-12-225723" border="0"></a>




