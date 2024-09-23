const Attendance = require('../../models/attendanceModel');
const ApiError  = require('../../utils/apiError');


exports.addAttendanceById = async (req, res, next) => {
    try {
      const studentId = req.params.id;
      const { status } = req.body; 
  
      if (!studentId || !status) {
        return res.status(400).json({ message: 'Student ID and status are required.' });
      }
  
      if (status !== 'Present' && status !== 'Absent' && status !== 'leave') {
        return res.status(400).json({ message: 'Invalid status.' });
      }
  
      const attendanceId = await Attendance.markAttendance(studentId, status);
      res.status(201).json({ message: 'Attendance added successfully', attendanceId, studentId, status });
    } catch (err) {
      console.error('Error adding attendance:', err);
      next(new ApiError(500, 'Attendance adding failed'));
    }
  };

  exports.editAttendance = async (req, res, next) => {
    try {
      const studentId = req.params.id; 
      const { status } = req.body; 

      if (!status) {
        return res.status(400).json({ message: 'Status is required.' });
      }

      // Ensure status is consistent with what the DB expects
      const validStatuses = ['present', 'Absent', 'leave'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status.' });
      }

      const result = await Attendance.updateAttendanceStatusByStudentId(studentId, status);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Attendance record not found.' });
      }

      res.status(200).json({ message: 'Attendance updated successfully' });
    } catch (err) {
      console.error('Error updating attendance:', err);
      next(new ApiError(500, 'Attendance updating failed'));
    }
};



exports.deleteAttendanceByStudentId = async (req, res, next) => {
    try {
      const studentId = req.params.id; // Assuming you are passing studentId
  
      const result = await Attendance.deleteAttendanceByStudentId(studentId);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'No attendance records found for this student.' });
      }
  
      res.status(200).json({ message: 'Attendance records deleted successfully for this student.' });
    } catch (err) {
      console.error('Error deleting attendance:', err);
      next(new ApiError(500, 'Attendance deletion failed'));
    }
  };

//   exports.deleteAttendance = async (req, res, next) => {
//     try {
//       const attendanceId = req.params.id; // Assuming you are passing attendanceId
  
//       const result = await Attendance.deleteAttendanceById(attendanceId);
      
//       if (result.affectedRows === 0) {
//         return res.status(404).json({ message: 'Attendance record not found.' });
//       }
  
//       res.status(200).json({ message: 'Attendance deleted successfully' });
//     } catch (err) {
//       console.error('Error deleting attendance:', err);
//       next(new ApiError(500, 'Attendance deletion failed'));
//     }
//   };