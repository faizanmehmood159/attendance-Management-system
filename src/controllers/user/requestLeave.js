const LeaveRequest = require('../../models/leaveRequestModel.js');
const ApiError = require('../../utils/apiError.js'); 

exports.requestLeave = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const leaveData = req.body;

        // Validate leave data
        if (!leaveData.leaveType || !leaveData.reason || !leaveData.startDate || !leaveData.endDate) {
            return next(new ApiError(400, 'All fields are required'));
        }

        await LeaveRequest.createLeaveRequest(userId, leaveData);
        res.status(201).json({ message: 'Leave request submitted successfully' });
    } catch (err) {
        next(new ApiError(500, 'Error submitting leave request'));
    }
};
