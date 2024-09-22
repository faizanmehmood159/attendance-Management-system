
const approveLeave = (req, res) => {
    const { leave_id, status } = req.body;
  
    const query = `UPDATE leave_requests SET status = ? WHERE id = ?`;
    connection.query(query, [status, leave_id], (err, result) => {
      if (err) throw err;
      res.send('Leave request status updated.');
    });
  };


module.exports = approveLeave;