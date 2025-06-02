const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ChargingStation = sequelize.define('ChargingStation', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    defaultValue: 'Active'
  },
  powerOutput: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  connectorType: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = ChargingStation;
