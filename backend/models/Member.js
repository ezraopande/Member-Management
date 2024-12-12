const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Member = sequelize.define(
    'Member',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        date_of_birth: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        tableName: 'members',
    }
);

Member.associate = (models) => {
    Member.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
    });

    Member.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'role',
    });
};

module.exports = Member;
