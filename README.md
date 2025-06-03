EV Charging Station 
A full-stack application for managing electric vehicle charging stations, featuring user authentication, CRUD operations, and interactive map visualization.

1. Features:
-> Backend (Node.js/Express)
    User Authentication: JWT-based signup/login with password hashing
    CRUD Operations: Create, read, update, and delete charging stations

->Database: MySQL with Sequelize ORM
  SSL Support: Secure database connections
  API Endpoints: RESTful API for stations and auth

->Frontend (React)
  User Authentication: Login and signup forms with validation
  Interactive Map: Google Maps integration with station markers
  Dashboard: Filterable station list with power/status filters
  CRUD Interface: Add, edit, and delete stations with modals
  Responsive Design: Works on all device sizes
  Protected Routes: Authentication-based navigation

2. Technologies Used
  Backend
  Node.js
  Express
  Sequelize (MySQL)
  JWT Authentication
  Bcrypt
  Dotenv
  Frontend
  React
  React Router
  Google Maps API
  Axios
  SweetAlert2
  React Icons

3. Installation
  Prerequisites
    Node.js (v14+)
    MySQL
    Google Maps API Key

  Backend Setup
    Clone the repository:
    ```bash
    git clone https://github.com/yourusername/ev-charging-system.git
    cd ev-charging-system/backend
    ```
    Install dependencies:
    
    ```bash
    npm install
    ```
   Create a .env file in the backend directory with:
    ```bash
     env
    DB_NAME=your_db_name
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_HOST=localhost
    DB_PORT=3306
    JWT_SECRET=your_jwt_secret
    ```
   Set up the database:
    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
  
  Frontend Setup
    Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```
    Install dependencies:
    ```bash
    npm install
    ```

4.Running the Application
  Start Backend
    ```bash
    cd backend
    npm start
    ```
    
  Start Frontend
  ```bash
  cd frontend
  npm start
```

  The application will be available at:
  Backend: http://localhost:5000
  Frontend: http://localhost:5143

5.Configuration
Database
    Modify the .env file to match your MySQL configuration
    Supported environment variables:
    DB_NAME: Database name
    DB_USER: Database username 
    DB_PASSWORD: Database password
    DB_HOST: Database host
    DB_PORT: Database port
    SSL: Set to 'true' for SSL connections

Google Maps
  Obtain an API key from Google Cloud Console
  Add the key to the frontend .env file



Deployment
The application can be deployed using:
Backend: Host on services like Render, Heroku, or AWS
Frontend: Deploy to Netlify, Vercel, or S3
Database: Use managed services like AWS RDS or Planetscale or Aiven
Update the frontend .env file with your production API URL:
env
REACT_APP_API_BASE_URL=https://your-production-api-url.com
