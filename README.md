Heartrate-Monitor-APIProject Overview
The Janitri-Health-Backend is a Node.js-based backend system for managing heart rate data of patients monitored by healthcare devices. The project implements a set of RESTful APIs for managing users, patients, and heart rate data. The project uses raw SQL queries with MySQL for database interactions.

Table of Contents
Project Overview
Instructions to Set Up and Run
Assumptions and Decisions
API Documentation
Technologies Used
License
Instructions to Set Up and Run
Follow these steps to set up and run the project locally:

1. Clone the Repository:
https://github.com/Meenesh2783/Heartrate-Monitor-API.git
cd janitri Assignment

3. Install Dependencies:
Make sure you have Node.js installed. Then, run the following command to install project dependencies:
npm install

4. Set Up the MySQL Database:
Make sure you have MySQL installed and running on your machine. Create a database for the project and import the SQL schema.
CREATE DATABASE janitri_health;
Inside the database.js file, make sure the database connection details (user, password, host, etc.) are correct.

5. Run the Server:
After setting up the database, run the Node.js server with the following command:
The server will run on http://localhost:5000.

6. API Testing:
You can use Postman or cURL to test the API endpoints (see API Documentation below for more details).

Assumptions and Decisions:
Database Structure:

Used raw SQL queries for database interactions, without using an ORM like Sequelize to keep the implementation simple and basic.
Tables for Users, Patients, and Heart Rate Data are created with the assumption that each patient is monitored individually by a device.
Authentication:

For this project, authentication is done through basic email/password matching for simplicity. No token-based authentication or third-party authentication services are used.
Error Handling:

Basic error handling has been implemented. In production, this would likely be expanded with proper logging and more robust validation.
Validation:

Input validation is implemented for basic fields such as email format, password length, and mandatory fields for patient and heart rate records.

API Documentation:
1. User Registration and Login:
POST /users/register - Register a new user
POST /users/login - Login an existing user
Request Body (Register User):

{
  "email": "user@example.com",
  "password": "securePassword123"
}
Response:


{
  "message": "User registered successfully"
}
Request Body (Login User):


{
  "email": "user@example.com",
  "password": "securePassword123"
}
Response:


{
  "message": "User logged in successfully"
}

2. Manage Patients:
POST /patients - Add a new patient
GET /patients - Retrieve all patients
GET /patients/:id - Retrieve a specific patient by ID
PUT /patients/:id - Update patient details
DELETE /patients/:id - Delete a patient

3. Heart Rate Data:
POST /heart-rate - Add heart rate data for a patient
GET /heart-rate/:patient_id - Retrieve heart rate data for a patient
PUT /heart-rate/:heart_rate_id - Update heart rate data
DELETE /heart-rate/:heart_rate_id - Delete heart rate data

Technologies Used:
Node.js: Backend framework for building APIs.
Express: Web framework for Node.js to handle routes and HTTP requests.
MySQL: Relational database to store users, patients, and heart rate data.
bcrypt.js: Library to hash and compare passwords.
mysql2: Node.js MySQL library for interacting with the MySQL database.
Postman: Tool for testing API endpoints.
