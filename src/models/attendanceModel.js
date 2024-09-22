const pool = require('../../config/db');

exports.markAttendance = async (userId) => {
  const today = new Date().toISOString().split('T')[0];
  await pool.query(
    'INSERT INTO attendance (userId, date, status) VALUES (?, ?, ?)', 
    [userId, today, 'present']
  );
};

exports.getAttendanceByUser = async (userId) => {
  const [rows] = await pool.query('SELECT * FROM attendance WHERE userId = ?', [userId]);
  return rows;
};

exports.hasMarkedAttendance = async (userId) => {
  const today = new Date().toISOString().split('T')[0];
  const [rows] = await pool.query('SELECT * FROM attendance WHERE userId = ? AND date = ?', [userId, today]);
  return rows.length > 0;
};
