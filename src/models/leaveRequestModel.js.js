const pool = require('../../config/db');

exports.createLeaveRequest = async (userId, leaveData) => {
  const { leave_type, reason, startDate, endDate } = leaveData;
  await pool.query(
    'INSERT INTO leave_requests (user_id, leave_type, reason, start_date, end_date, status) VALUES (?, ?, ?, ?, ?, ?)', 
    [userId, leave_type, reason, startDate, endDate, 'pending']
  );
};


exports.getAllLeaveRequests = async () => {
  const [rows] = await pool.query('SELECT * FROM leave_requests');
  return rows;
};


exports.updateLeaveRequestStatus = async (requestId, status) => {
  await pool.query('UPDATE leave_requests SET status = ? WHERE id = ?', [status, requestId]);
};
