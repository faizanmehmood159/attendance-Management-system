const pool = require("../../config/db");

const Attendance = {
  markAttendance: async (studentId, status) => {
    const [result] = await pool.query(
      "INSERT INTO attendance (studentId, status, date) VALUES (?, ?, NOW())",
      [studentId, status]
    );
    return result.insertId;
  },

  getAttendanceByStudentId: async (studentId) => {
    const [rows] = await pool.query(
      "SELECT * FROM attendance WHERE studentId = ?",
      [studentId]
    );
    return rows;
  },

  updateAttendanceStatusByStudentId: async (studentId, status) => {
    const [result] = await pool.query(
      "UPDATE attendance SET status = ? WHERE studentId = ?",
      [status, studentId]
    );
    return result;
  },
  deleteAttendanceById: async (attendanceId) => {
    const [result] = await pool.query("DELETE FROM attendance WHERE id = ?", [
      attendanceId,
    ]);
    return result;
  },

  deleteAttendanceByStudentId: async (studentId) => {
    const [result] = await pool.query(
      "DELETE FROM attendance WHERE studentId = ?",
      [studentId]
    );
    return result;
  },

  getAttendanceCounts: async (studentId) => {
    const [rows] = await pool.query(`
      SELECT UPPER(status) as status, COUNT(*) as count 
      FROM attendance 
      WHERE studentId = ? 
      GROUP BY UPPER(status)
    `, [studentId]);
  
    return rows.reduce((acc, row) => {
      acc[row.status] = row.count; // Build a counts object
      return acc;
    }, {});
  },


  getAllStudentsAttendanceCounts: async (studentId) => {
    const [rows] = await pool.query(`
      SELECT u.id as studentId, u.name, 
             UPPER(a.status) as status, 
             COUNT(*) as count 
      FROM user u
      LEFT JOIN attendance a ON u.id = a.studentId
      GROUP BY u.id, UPPER(a.status)
    `);

    const counts = {};
    rows.forEach(row => {
      if (!counts[row.studentId]) {
        counts[row.studentId] = {
          studentId: row.studentId,
          name: row.name,
          attendanceCounts: {}
        };
      }
      counts[row.studentId].attendanceCounts[row.status] = row.count || 0; 
    });

    return Object.values(counts); 
  },
  getAttendanceByStudentIdAndDateRange: async (studentId, fromDate, toDate) => {
    const query = `
      SELECT * FROM attendance
      WHERE studentId = ? AND date BETWEEN ? AND ?;
    `;
    
    const [records] = await pool.query(query, [studentId, fromDate, toDate]);
    return records;
  },
  

  calculateGrade : (totalDaysAttended) => {
    
    if (totalDaysAttended >= 26) {
      return 'A';
    } else if (totalDaysAttended >= 20) {
      return 'B';
    } else if (totalDaysAttended >= 15) {
      return 'C';
    } else if (totalDaysAttended >= 10) {
      return 'D';
    } else {
      return 'F';
    }
  },
};
  




  (module.exports = Attendance);
