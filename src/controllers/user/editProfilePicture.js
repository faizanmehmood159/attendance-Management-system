const connection = require('../../../config/db');

const editProfilePicture = (req, res) => {
    const userId = req.user.id;
    const profilePicture = req.file.path;
  
    const query = `UPDATE users SET profile_picture = ? WHERE id = ?`;
    connection.query(query, [profilePicture, userId], (err, result) => {
      if (err) throw err;
      res.send('Profile picture updated.');
    });
  };

  module.exports = editProfilePicture;