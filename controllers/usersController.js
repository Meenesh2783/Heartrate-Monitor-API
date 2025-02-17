const db = require('../config/database');
const bcrypt = require('bcryptjs');
const { convertUserDbObjectToResponseObject } = require('../utils/dbUtils');

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).send({ error: 'Missing required fields' });
    }
  
    const checkEmailQuery = `SELECT * FROM users WHERE email = ?`;
    const [existingUser] = await db.promise().execute(checkEmailQuery, [email]);
  
    if (existingUser.length > 0) {
      return res.status(400).send({ error: 'Email already in use' });
    }
  
    
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
  

    const insertUserQuery = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    const [result] = await db.promise().execute(insertUserQuery, [name, email, hashedPassword]);
  
    const newUser = { id: result.insertId, name, email, created_at: new Date().toISOString() };
    res.status(201).send({
      message: 'User registered successfully!',
      user: convertUserDbObjectToResponseObject(newUser),
    });
  };

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    const getUserQuery = `SELECT * FROM users WHERE email = ?`;
    const [user] = await db.promise().execute(getUserQuery, [email]);
  
    if (user.length === 0) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }
  
    // Compare the hashed password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
  
    if (!isPasswordValid) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }
  
    res.status(200).send({
      message: 'Login successful!',
      user: convertUserDbObjectToResponseObject(user[0]),
    });
  };
  

module.exports = { registerUser, loginUser };
