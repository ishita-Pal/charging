# ⚡ EV Charging Station

A full-stack application for managing electric vehicle charging stations, featuring user authentication, CRUD operations, and interactive map visualization.

---

## 🚀 Features

### 🔧 Backend (Node.js / Express)

- 🔐 **User Authentication:** JWT-based signup/login with password hashing  
- 🔁 **CRUD Operations:** Create, read, update, and delete charging stations  

### 🛢️ Database: MySQL with Sequelize ORM

- 🔒 **SSL Support:** Secure database connections  
- 🔗 **API Endpoints:** RESTful APIs for stations and authentication  

### 💻 Frontend (React)

- 🔐 **User Authentication:** Login and signup forms with validation  
- 🗺️ **Interactive Map:** Google Maps integration with station markers  
- 📋 **Dashboard:** Filterable station list with power/status filters  
- ✏️ **CRUD Interface:** Add, edit, and delete stations with modals  
- 📱 **Responsive Design:** Works on all device sizes  
- 🔐 **Protected Routes:** Authentication-based navigation  

---

## 🧰 Technologies Used

### Backend

- Node.js  
- Express  
- Sequelize (MySQL)  
- JWT Authentication  
- Bcrypt  
- Dotenv  

### Frontend

- React  
- React Router  
- Google Maps API  
- Axios  
- SweetAlert2  
- React Icons  

---

## ⚙️ Installation

### 📌 Prerequisites

- Node.js (v14+)  
- MySQL  
- Google Maps API Key  

---

### 🔙 Backend Setup

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/ev-charging-system.git
cd ev-charging-system/backend
```

Install dependencies:
bash
Copy code
npm install
Create a .env file in the backend directory:

env
Copy code
DB_NAME=your_db_name  
DB_USER=your_db_user  
DB_PASSWORD=your_db_password  
DB_HOST=localhost  
DB_PORT=3306  
JWT_SECRET=your_jwt_secret  
Set up the database:

bash
Copy code
npx sequelize-cli db:create  
npx sequelize-cli db:migrate  
🖥️ Frontend Setup
Navigate to the frontend directory:

bash
Copy code
cd ../frontend
Install dependencies:

bash
Copy code
npm install
▶️ Running the Application
Start Backend
bash
Copy code
cd backend
npm start
Start Frontend
bash
Copy code
cd frontend
npm start
🔗 The application will be available at:

Backend: http://localhost:5000

Frontend: http://localhost:5143

🔧 Configuration
🛢️ Database
Modify the .env file to match your MySQL configuration.
Supported environment variables:

env
Copy code
DB_NAME=your_db_name  
DB_USER=your_db_user  
DB_PASSWORD=your_db_password  
DB_HOST=your_db_host  
DB_PORT=3306  
SSL=true  
🗺️ Google Maps
Obtain an API key from the Google Cloud Console

Add the key to the frontend .env file:

env
Copy code
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key
🌐 Deployment
The application can be deployed using:

Backend: Render, Heroku, AWS

Frontend: Netlify, Vercel, AWS S3

Database: AWS RDS, Planetscale, Aiven

Update the frontend .env file with your production API URL:

env
Copy code
REACT_APP_API_BASE_URL=https://charging-6.onrender.com
🔗 Live Links
🌐 Frontend: https://ee-wvnr.onrender.com/
⚙️ Backend: https://charging-6.onrender.com/



