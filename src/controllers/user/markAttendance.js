const Attendance = require('../../models/attendanceModel');
const { ApiError } = require('../../utils/apiError');
const LeaveRequest = require('../../models/leaveRequestModel.js');

exports.markAttendance = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (await Attendance.hasMarkedAttendance(userId)) {
      return next(new ApiError(400, 'Attendance already marked for today'));
    }
    await Attendance.markAttendance(userId);
    res.status(201).json({ message: 'Attendance marked' });
  } catch (err) {
    next(new ApiError(500, 'Error marking attendance'));
  }
};