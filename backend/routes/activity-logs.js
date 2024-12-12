const express = require('express');
const router = express.Router();
const ActivityLog = require('../models/ActivityLog');
const authenticate = require('../middleware/auth');

router.use(authenticate);

router.get('/', async (req, res) => {
    try {
        const queryOptions = req.user.role === 1
            ? { order: [['createdAt', 'DESC']] }
            : { 
                where: { user_id: req.user.id },
                order: [['createdAt', 'DESC']] 
              };

        const logs = await ActivityLog.findAll(queryOptions);
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
