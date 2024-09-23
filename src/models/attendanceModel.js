const pool = require('../../config/db');

const Attendance = {
  markAttendance: async (studentId, status) => {
    const [result] = await pool.query(
      'INSERT INTO attendance (studentId, status, date) VALUES (?, ?, NOW())',
      [studentId, status]
    );
    return result.insertId;
  },

  getAttendanceByStudentId: async (studentId) => {
    const [rows] = await pool.query('SELECT * FROM attendance WHERE studentId = ?', [studentId]);
    return rows;
  },
};

module.exports = Attendance;
