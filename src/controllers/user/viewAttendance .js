const User = require('../../models/userModel'); 
const Attendance = require('../../models/attendanceModel');
const { ApiError } = require('../../utils/apiError');


exports.getAttendance = async (req, res, next) => {
  try {
    const studentId = req.userId; 

  
    const user = await User.getUserById(studentId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

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
