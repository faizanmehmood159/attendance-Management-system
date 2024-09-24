const pool = require('../../config/db');

// Insert a user report into the user_report table
exports.insertUserReport = async (report) => {
  const query = `
    INSERT INTO user_report (userId, name, email, profilePicture, totalDaysAttended, totalDaysAbsents, totalDaysLeaves, grade, attendanceRecords)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;
  const values = [
    report.userId,
    report.name,
    report.email,
    report.profilePicture,
    report.totalDaysAttended,
    report.totalDaysAbsents,
    report.totalDaysLeaves,
    report.grade,
    JSON.stringify(report.attendanceRecords) // Convert attendanceRecords to JSON string
  ];

  await pool.query(query, values);
};
