const User = require('../../models/userModel.js'); 
const Attendance = require('../../models/attendanceModel.js');
const LeaveRequest = require('../../models/leaveRequestModel.js'); 
const { ApiError } = require('../../utils/apiError.js');

exports.getAllUsersRecords = async (req, res, next) => {
  try {

    const users = await User.getAllUsers();

    const userRecords = await Promise.all(users.map(async (user) => {
   
        
      const attendanceRecords = await Attendance.getAttendanceByStudentId(user.id);
      const leaveRequests = await LeaveRequest.getAllLeaveRequests();
      const userLeaveRequests = leaveRequests.filter(request => request.user_id === user.id);

      return {
        user,
        attendanceRecords,
        leaveRequests: userLeaveRequests,
      };
    }));

    res.status(200).json(userRecords);
  } catch (err) {
    console.error('Error fetching all user records:', err);
    next(new ApiError(500, 'Failed to fetch user records'));
  }
};
