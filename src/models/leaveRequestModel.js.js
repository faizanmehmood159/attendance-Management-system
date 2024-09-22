const pool = require('../../config/db');

exports.createLeaveRequest = async (userId, leaveData) => {
  const { leaveType, reason, startDate, endDate } = leaveData;
  await pool.query(
    'INSERT INTO leave_requests (userId, leaveType, reason, startDate, endDate) VALUES (?, ?, ?, ?, ?)', 
    [userId, leaveType, reason, startDate, endDate]
  );
};

exports.getLeaveRequestsByUser = async (userId) => {
  const [rows] = await pool.query('SELECT * FROM leave_requests WHERE userId = ?', [userId]);
  return rows;
};
