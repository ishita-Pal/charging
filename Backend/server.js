const express = require('express');
const app = express();
const chargingRoutes = require('./routes/chargingStationRoutes');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();
const sequelize = require('./config/db');
const cors = require('cors');
app.use(cors());
app.use(express.json()); 


app.use('/api/auth', authRoutes);
app.use('/api/charging-stations', chargingRoutes); 


sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
  });
});
