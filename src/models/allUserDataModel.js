const pool = require('../../config/db');

exports.getAllData = async () => {
    const [rows] = await pool.query(`
        SELECT 
          users.id AS user_id,
          users.firstName,
          users.lastName,
          users.email,
          leave_requests.leave_type,
          leave_requests.reason,
          leave_requests.start_date,
          leave_requests.end_date,
          leave_requests.status AS leave_status,
          attendance.date AS attendance_date, -- Adjusted
          attendance.status AS attendance_status
        FROM users
        LEFT JOIN leave_requests ON users.id = leave_requests.user_id
        LEFT JOIN attendance ON users.id = attendance.user_id
      `);
    }      
