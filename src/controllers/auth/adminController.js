const { ApiError } = require('../../utils/apiError');

const ADMIN_USERNAME = 'admin';  
const ADMIN_PASSWORD = 'admin';  

exports.adminLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.status(200).json({ message: 'Admin login successful' });
  } else {
    return next(new ApiError(401, 'Invalid admin credentials'));
  }
};
