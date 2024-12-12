const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Role = sequelize.define(
    'Role',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        timestamps: true,
        tableName: 'roles',
    }
);

Role.associate = (models) => {
    Role.hasMany(models.Member, {
        foreignKey: 'role_id',
        as: 'members',
    });
};

module.exports = Role;
