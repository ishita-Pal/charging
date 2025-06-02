const ChargingStation = require('../models/ChargingStation');

exports.createStation = async (req, res) => {
  try {
    const station = await ChargingStation.create(req.body);
    res.status(201).json(station);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllStations = async (req, res) => {
  try {
    const stations = await ChargingStation.findAll();
    res.json(stations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStation = async (req, res) => {
  try {
    const station = await ChargingStation.findByPk(req.params.id);
    if (!station) return res.status(404).json({ message: 'Station not found' });

    await station.update(req.body);
    res.json(station);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStation = async (req, res) => {
  try {
    const station = await ChargingStation.findByPk(req.params.id);
    if (!station) return res.status(404).json({ message: 'Station not found' });

    await station.destroy();
    res.json({ message: 'Station deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
