const express = require('express');
const router = express.Router();
const { addPatient, getPatientById, getPatientsForUser } = require('../controllers/patientController');

// Add new patient
router.post('/', addPatient);

// Get patient by ID
router.get('/:id', getPatientById);

// Get all patients for a user
router.get('/', getPatientsForUser);

module.exports = router;
