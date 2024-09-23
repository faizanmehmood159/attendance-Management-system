// controllers/admin/leaveController.js
const Attendance = require('../../models/attendanceModel');
const  ApiError  = require('../../utils/apiError');

exports.applyLeave = async (req, res, next) => {
  try {
    const studentId = req.params.id; 
    const { leaveType } = req.body; 

    if (!leaveType) {
      return res.status(400).json({ message: 'Leave type is required.' });
    }


    await Attendance.markAttendance(studentId, 'leave');
    res.status(201).json({ message: 'Leave applied successfully.' });
  } catch (err) {
    console.error('Error applying leave:', err);
    next(new ApiError(500, 'Leave application failed'));
  }
};

exports.getAttendanceCounts = async (req, res, next) => {
    try {
      const studentId = req.params.id; // Get student ID from params
      const attendanceCounts = await Attendance.getAttendanceCounts(studentId);
      
      res.status(200).json({
        message: "Attendance counts retrieved successfully",
        counts: attendanceCounts
      });
    } catch (err) {
      console.error('Error retrieving attendance counts:', err);
      next(new ApiError(500, 'Failed to retrieve attendance counts'));
    }
  };
  