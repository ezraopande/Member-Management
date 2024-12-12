const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Role = require('./Role');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: 'id',
        },
    },
}, {
    timestamps: true,
    tableName: 'users',
});

User.associate = (models) => {
    User.hasOne(models.Member, {
        foreignKey: 'user_id',
        as: 'member',
    });
};

module.exports = User;