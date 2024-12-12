const express = require('express');
const Member = require('../models/Member');
const Role = require('../models/Role');
const ActivityLog = require('../models/ActivityLog');
const router = express.Router();

router.get('/stats', async (req, res) => {
    try {
        const memberCount = await Member.count({ where: { role_id: 2 } });
        const adminCount = await Member.count({ where: { role_id: 1 } });
        const roleCount = await Role.count();
        const activityCount =
        req.user.role === 1
            ? await ActivityLog.count()
            : await ActivityLog.count({ where: { user_id: req.user.id } });
        res.json({ adminCount, memberCount, roleCount, activityCount });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
