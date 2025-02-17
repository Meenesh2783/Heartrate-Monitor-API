const db = require('../config/database');

// Add new patient
const addPatient = async (req, res) => {
  const { user_id, name, age, gender } = req.body;

  // Basic validation
  if (!user_id || !name || !age || !gender) {
    return res.status(400).send({ error: 'Missing required fields' });
  }

  // Insert new patient
  const insertPatientQuery = `
    INSERT INTO patients (user_id, name, age, gender) 
    VALUES (?, ?, ?, ?)
  `;
  try {
    const [result] = await db.promise().execute(insertPatientQuery, [user_id, name, age, gender]);

    const newPatient = {
      id: result.insertId,
      user_id,
      name,
      age,
      gender,
      created_at: new Date().toISOString(),
    };

    res.status(201).send({
      message: 'Patient added successfully!',
      patient: newPatient,
    });
  } catch (error) {
    res.status(500).send({ error: 'Failed to add patient' });
  }
};

// Get Patient by ID
const getPatientById = async (req, res) => {
  const { id } = req.params;

  const getPatientQuery = `SELECT * FROM patients WHERE id = ?`;
  try {
    const [patient] = await db.promise().execute(getPatientQuery, [id]);

    if (patient.length === 0) {
      return res.status(404).send({ error: 'Patient not found' });
    }

    res.status(200).send({
      message: 'Patient retrieved successfully!',
      patient: patient[0],
    });
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve patient' });
  }
};

// Get all Patients for a user
const getPatientsForUser = async (req, res) => {
  const { user_id } = req.query; // Assuming `user_id` is passed as a query param

  const getPatientsQuery = `SELECT * FROM patients WHERE user_id = ?`;
  try {
    const [patients] = await db.promise().execute(getPatientsQuery, [user_id]);

    if (patients.length === 0) {
      return res.status(404).send({ error: 'No patients found for this user' });
    }

    res.status(200).send({
      message: 'Patients retrieved successfully!',
      patients,
    });
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve patients' });
  }
};

module.exports = { addPatient, getPatientById, getPatientsForUser };
