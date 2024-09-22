const Attendance = require('../../models/attendanceModel');
const { ApiError } = require('../../utils/apiError');
const LeaveRequest = require('../../models/leaveRequestModel.js');


exports.requestLeave = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await LeaveRequest.createLeaveRequest(userId, req.body);
    res.status(201).json({ message: 'Leave request submitted' });
  } catch (err) {
    next(new ApiError(500, 'Error submitting leave request'));
  }
};