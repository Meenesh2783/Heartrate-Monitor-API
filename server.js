const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const patientRoutes = require('./routes/patientRoutes');
const heartRateRoutes = require('./routes/heartRateRoutes');

app.use('/api/users', userRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/heart-rate', heartRateRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
