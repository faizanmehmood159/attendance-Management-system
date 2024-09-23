const express = require('express');
const {login ,register} = require('../controllers/auth/authController');
const { adminLogin } = require('../controllers/auth/adminController');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/register', upload.single('profilePicture'), register);
router.post('/login', login);
router.post('/adminLogin', adminLogin);


module.exports = router;
