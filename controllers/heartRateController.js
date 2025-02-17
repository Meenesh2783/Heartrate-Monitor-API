const db = require('../config/database');

// Add Heart Rate for a patient
const addHeartRate = async (req, res) => {
  const { patient_id, heart_rate } = req.body;

  // Basic validation
  if (!patient_id || !heart_rate) {
    return res.status(400).send({ error: 'Missing required fields' });
  }

  // Insert heart rate data
  const insertHeartRateQuery = `
    INSERT INTO heart_rate (patient_id, heart_rate) 
    VALUES (?, ?)
  `;
  try {
    const [result] = await db.promise().execute(insertHeartRateQuery, [patient_id, heart_rate]);

    const newHeartRate = {
      id: result.insertId,
      patient_id,
      heart_rate,
      timestamp: new Date().toISOString(),
    };

    res.status(201).send({
      message: 'Heart rate recorded successfully!',
      heart_rate: newHeartRate,
    });
  } catch (error) {
    res.status(500).send({ error: 'Failed to record heart rate' });
  }
};

// Get all Heart Rates for a patient
const getHeartRatesForPatient = async (req, res) => {
  const { patientId } = req.params;

  const getHeartRateQuery = `SELECT * FROM heart_rate WHERE patient_id = ?`;
  try {
    const [heartRates] = await db.promise().execute(getHeartRateQuery, [patientId]);

    if (heartRates.length === 0) {
      return res.status(404).send({ error: 'No heart rate data found for this patient' });
    }

    res.status(200).send({
      message: 'Heart rate data retrieved successfully!',
      heart_rates: heartRates,
    });
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve heart rate data' });
  }
};

module.exports = { addHeartRate, getHeartRatesForPatient };
