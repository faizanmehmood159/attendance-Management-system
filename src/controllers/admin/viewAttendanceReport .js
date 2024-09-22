const User = require('../../models/userModel');
const connection = require('../../../config/db');

const viewAttendanceReport = (req, res) => {
    const { from_date, to_date, user_id } = req.body;
  
    const query = `SELECT * FROM attendance WHERE user_id = ? AND date BETWEEN ? AND ?`;
    connection.query(query, [user_id, from_date, to_date], (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  };

  module.exports = viewAttendanceReport;