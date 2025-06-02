Charging Station Management 

A full-stack web application to manage EV charging stations using **Node.js**, **Express**, **Vue.js**, and MySQL. Includes user authentication and map integration for a complete UI/UX experience.
Features
Backend (Node.js + Express)
- RESTful API for CRUD operations on Charging Stations
- JWT-based user authentication:
  - Register & Login endpoints
  - Protected routes for station management
- Charging Station Data:
  - Name
  - Location (Latitude & Longitude)
  - Status (Active/Inactive)
  - Power Output (kW)
  - Connector Type

Frontend (Vue.js+jsx)
- User login screen connected to backend auth
- Charging Station Listing Page with:
  - Filters (Status, Power Output, Connector Type)
  - Add/Edit/Delete functionality
- Map View using Google Maps or OpenStreetMap:
  - Displays chargers as markers
  - Clickable markers to view charger details

Deploymed
- Frontend deployed on: `https://your-frontend-url.com`
- Backend deployed on: `https://your-backend-api.com`



Setup Instructions

Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
2.Install dependencies: npm install
3.Configure environment variables (.env):
  PORT=5000
  DB_URI=your_database_uri
  JWT_SECRET=your_secret_key

4.Start the server: npm start

1. Navigate to the frontend directory:
cd frontend

2.Install dependencies: npm install

3. Start the frontend: npm run serve

