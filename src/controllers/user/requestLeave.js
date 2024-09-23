const LeaveRequest = require('../../models/leaveRequestModel.js');
const ApiError = require('../../utils/apiError.js'); 

exports.requestLeave = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { leave_type, reason, startDate, endDate } = req.body;

        if (!leave_type || !reason || !startDate || !endDate) {
            return next(new ApiError(400, 'All fields are required'));
        }

        await LeaveRequest.createLeaveRequest(userId, { leave_type, reason, startDate, endDate });

        res.status(201).json({ message: 'Leave request submitted successfully' });
    } catch (err) {
        console.error('Error in requestLeave:', err);
        next(new ApiError(500, 'Error submitting leave request'));
    }
};
