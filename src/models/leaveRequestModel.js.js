const pool = require('../../config/db');

exports.createLeaveRequest = async (userId, leaveData) => {
  const { leaveType, reason, startDate, endDate } = leaveData;
  await pool.query(
    'INSERT INTO leave_requests (userId, leaveType, reason, startDate, endDate, status) VALUES (?, ?, ?, ?, ?, ?)', 
    [userId, leaveType, reason, startDate, endDate, 'pending']
  );
};


exports.getLeaveRequests = async () => {
  const [rows] = await pool.query('SELECT * FROM leave_requests');
  return rows;
};


exports.updateLeaveRequestStatus = async (requestId, status) => {
  await pool.query('UPDATE leave_requests SET status = ? WHERE id = ?', [status, requestId]);
};
