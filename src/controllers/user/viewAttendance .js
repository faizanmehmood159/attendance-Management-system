const User = require('../../models/userModel'); // Make sure to import the User model
const Attendance = require('../../models/attendanceModel');
const { ApiError } = require('../../utils/apiError');

// Get Attendance with User Details
exports.getAttendance = async (req, res, next) => {
  try {
    const studentId = req.userId; // Get student ID from the token

    // Get user details
    const user = await User.getUserById(studentId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get attendance records
    const attendanceRecords = await Attendance.getAttendanceByStudentId(studentId);

    res.status(200).json({
      user,
      attendanceRecords,
    });
  } catch (err) {
    console.error('Error fetching attendance:', err);
    next(new ApiError(500, 'Failed to fetch attendance records'));
  }
};
