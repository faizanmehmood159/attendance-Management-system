const Attendance = require('../../models/attendanceModel');
const ApiError = require('../../utils/apiError');

exports.getAllStudentsAttendanceCounts = async (req, res, next) => {
  try {
    const attendanceCounts = await Attendance.getAllStudentsAttendanceCounts();
    res.status(200).json({
      message: "Attendance counts retrieved successfully",
      attendanceCounts
    });
  } catch (err) {
    console.error('Error retrieving all students attendance counts:', err);
    next(new ApiError(500, 'Failed to retrieve attendance counts'));
  }
};
