const Attendance = require('../../models/attendanceModel');
const { ApiError } = require('../../utils/apiError');

// Mark Attendance
exports.markAttendance = async (req, res, next) => {
  try {
    const studentId = req.userId; 
    const { status } = req.body;

    
    if (status !== 'present' && status !== 'Absent' && status !== 'leave') {
      return res.status(400).json({ message: 'Invalid status. ' });
    }

    const attendanceId = await Attendance.markAttendance(studentId, status);
    res.status(201).json({ message: 'Attendance marked successfully', attendanceId });
  } catch (err) {
    console.error('Error marking attendance:', err);
    next(new ApiError(500, 'Attendance marking failed'));
  }
};