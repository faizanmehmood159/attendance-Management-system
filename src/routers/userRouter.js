const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); 
const authenticateToken = require('../middlewares/authMiddleware'); 
const { updateUserProfileImage } = require('../controllers/user/updateProfilePicture');
const { markAttendance } = require('../controllers/user/markAttendance');
const { getAttendance } = require('../controllers/user/viewAttendance ');
const { requestLeave } = require('../controllers/user/requestLeave');

router.post('/uploadImage', authenticateToken, upload.single('profilePicture'), updateUserProfileImage);
router.post('/markAttendance', authenticateToken, markAttendance);
router.post('/leaverequest', authenticateToken, requestLeave);

router.get('/viewAttendance', authenticateToken, getAttendance);

module.exports = router;
