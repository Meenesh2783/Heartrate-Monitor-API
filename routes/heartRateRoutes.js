const express = require('express');
const router = express.Router();
const { addHeartRate, getHeartRatesForPatient } = require('../controllers/heartRateController');

// Add heart rate for a patient
router.post('/', addHeartRate);

// Get all heart rates for a patient
router.get('/:patientId', getHeartRatesForPatient);

module.exports = router;
