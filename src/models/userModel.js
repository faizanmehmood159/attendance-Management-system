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

exports.getAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
};


exports.getUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};


exports.getStudentReportById = async (req, res, next) => {
  try {
    const studentId = req.params.id; 

    const reportQuery = `
      SELECT * FROM student_report
      WHERE studentId = ?;
    `;
    const [report] = await pool.query(reportQuery, [studentId]);

    if (!report.length) {
      return res.status(404).json({ message: 'No report found for this student' });
    }

    res.status(200).json({
      message: 'Student report retrieved successfully',
      report: report[0],
    });
  } catch (err) {
    console.error("Error retrieving student report:", err);
    next(new ApiError(500, 'Failed to retrieve student report'));
  }
};

