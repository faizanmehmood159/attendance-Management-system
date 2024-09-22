const pool = require('../../config/db');

exports.createUser = async (userData) => {
  const { firstName, lastName, email, password, profilePicture } = userData;
  const [result] = await pool.query(
    'INSERT INTO users (firstName, lastName, email, password, profilePicture) VALUES (?, ?, ?, ?, ?)', 
    [firstName, lastName, email, password, profilePicture]
  );
  return result.insertId;
};

exports.getUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

exports.getUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};
