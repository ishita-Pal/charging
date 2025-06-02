const express = require('express');
const router = express.Router();
const chargingController = require('../controllers/chargingStationController');
const authMiddleware = require('../middleware/auth');


router.post('/', authMiddleware, chargingController.createStation);
router.get('/', authMiddleware, chargingController.getAllStations);
router.put('/:id', authMiddleware, chargingController.updateStation);
router.delete('/:id', authMiddleware, chargingController.deleteStation);

module.exports = router;
