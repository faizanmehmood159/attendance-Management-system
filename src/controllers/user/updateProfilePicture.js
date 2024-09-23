const pool = require('../../../config/db');
const ApiError = require('../../utils/apiError');


exports.updateUserProfileImage = async (req, res, next) => {
  try {
    const userId = req.userId;

    
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const profilePicture = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const [updatedUser] = await pool.query(
      'UPDATE users SET profilePicture = ? WHERE id = ?',
      [profilePicture, userId]
    );

    if (updatedUser.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile image updated successfully', profilePicture });
  } catch (err) {
    console.error('Error during profile image update:', err);
    next(new ApiError(500, 'Update failed'));
  }
};
