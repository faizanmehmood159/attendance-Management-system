const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/apiError');

exports.protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return next(new ApiError(401, 'Not authenticated'));
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    next(new ApiError(401, 'Token invalid'));
  }
};
