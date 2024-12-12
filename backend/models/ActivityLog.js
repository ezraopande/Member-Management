const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const User = require('./User');

const ActivityLog = sequelize.define('ActivityLog', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    action: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'activity_logs',
});

module.exports = ActivityLog;