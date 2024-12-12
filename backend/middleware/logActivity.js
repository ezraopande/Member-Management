const ActivityLog = require('../models/ActivityLog');
const User = require('../models/User');

const logActivity = async (req, res, next) => {
    const { user } = req;
    const action = `${req.method} ${req.originalUrl}`;
    const ip_address = req.ip;

    try {
        let username = null;

        if (user && user.id) {
            const userRecord = await User.findOne({ where: { id: user.id } });
            username = userRecord ? userRecord.username : null;
        }

        await ActivityLog.create({
            user_id: user ? user.id : null,
            username, 
            action,
            details: JSON.stringify(req.body),
            ip_address,
        });
    } catch (error) {
        console.error('Failed to log activity:', error);
    }

    next();
};

module.exports = logActivity;
