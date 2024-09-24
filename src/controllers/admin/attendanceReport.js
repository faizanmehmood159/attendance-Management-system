const User = require('../../models/userModel');
const Attendance = require('../../models/attendanceModel');
const ApiError = require('../../utils/apiError');
const UserReport = require('../../models/userReportModel');

exports.generateUserReport = async (req, res, next) => {
  try {
    const userId = req.params.id; 
    const { fromDate, toDate } = req.body;

    if (!fromDate || !toDate) {
      return res.status(400).json({ message: 'From Date and To Date are required' });
    }

    const user = await User.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const attendanceRecords = await Attendance.getAttendanceByStudentIdAndDateRange(userId, fromDate, toDate);
    if (attendanceRecords.length === 0) {
      return res.status(404).json({ message: 'No attendance records found for the given date range' });
    }

    const totalDaysAttended = attendanceRecords.filter(record => record.status === 'Present').length;
    const totalDaysLeaves = attendanceRecords.filter(record => record.status === 'Leave').length;
    const totalDaysAbsents = attendanceRecords.filter(record => record.status === 'Absent').length;

    const grade = Attendance.calculateGrade(totalDaysAttended);

    const report = {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      profilePicture: user.profilePicture,
      totalDaysAttended,
      totalDaysLeaves,
      totalDaysAbsents,
      grade,
      attendanceRecords,
    };

    // Insert the report into the user_report table
    await UserReport.insertUserReport(report);

    res.status(200).json({
      message: 'User attendance report generated successfully',
      report,
    });
  } catch (err) {
    console.error("Error generating user report:", err);
    next(new ApiError(500, 'Failed to generate user report'));
  }
};
