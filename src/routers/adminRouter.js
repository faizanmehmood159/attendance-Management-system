const express = require('express');
const { getAllUsersRecords } = require('../controllers/admin/getAllUsersRecords');
const {  editAttendance, deleteAttendanceByStudentId, addAttendanceById,  } = require('../controllers/admin/editAndDeleteAttendance');
const { getAttendanceCounts } = require('../controllers/admin/attendanceCount');
const { generateUserReport } = require('../controllers/admin/attendanceReport');
const router = express.Router();

router.get('/records', getAllUsersRecords);

router.post('/addAttendance/:id', addAttendanceById );
router.put('/updateAttendance/:id', editAttendance); 
router.delete('/deleteAttendanceByStudentId/:id', deleteAttendanceByStudentId);
router.post('/generateUserReport/:id', generateUserReport);




module.exports = router;
