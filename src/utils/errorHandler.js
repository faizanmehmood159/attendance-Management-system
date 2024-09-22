const { ApiError } = require('../utils/apiError');

exports.errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  res.status(500).json({ message: 'Internal server error' });
};
