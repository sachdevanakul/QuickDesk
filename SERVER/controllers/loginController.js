const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Register user
exports.register = (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
    [name, email, hashedPassword],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Email already exists' });
        }
        return res.status(500).json({ error: 'Database error', details: err });
      }
      res.status(201).json({ message: 'User registered successfully' });
    }
  );
};

// Login user
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(401).json({ error: 'User not found' });

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password_hash);

    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    res.status(200).json({
      message: 'Login successful',
      role: user.role,
      name: user.name,
      email: user.email
    });
  });
};
