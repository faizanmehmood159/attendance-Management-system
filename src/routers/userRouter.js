const express = require('express');
const markAttendance = require('../controllers/user/markAttendance');
const viewAttendance = require('../controllers/user/viewAttendance ');
const requestLeave = require('../controllers/user/requestLeave');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/attendance', protect, markAttendance);
router.get('/attendance', protect, viewAttendance);
router.post('/leave', protect, requestLeave);

module.exports = router;
