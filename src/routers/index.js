const express = require('express');
const router = express.Router();
const auth = require('./auth');
const adminRouter = require('./adminRouter');
const userRouter = require('./userRouter');

router.use('/auth', auth);
router.use('/admin', adminRouter);
router.use('/user', userRouter);

module.exports = router;
