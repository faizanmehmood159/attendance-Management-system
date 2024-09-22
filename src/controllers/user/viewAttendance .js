const Attendance = require('../../models/attendanceModel');
const { ApiError } = require('../../utils/apiError');

exports.viewAttendance = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const attendance = await Attendance.getAttendanceByUser(userId);
    res.status(200).json({ attendance });
  } catch (err) {
    next(new ApiError(500, 'Error fetching attendance'));
  }
};