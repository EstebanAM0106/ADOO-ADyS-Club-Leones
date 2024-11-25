// backend/server.js
const express = require('express');
const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

// Routes
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Nombre de Usuario y contraseña son necesarios' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO administrators (username, password) VALUES (?, ?)',
    [username, hashedPassword],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(201).json({ message: 'Administrador registrado con exito' });
    }
  );
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM administrators WHERE username = ?', [username], async (err, result) => {
    if (err || result.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, result[0].password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login exitoso', token });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
