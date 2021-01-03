const { DataTypes } = require('sequelize');
const sequelize = require('./../database/index').default;

const UserRole = sequelize.define('userRole', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    }
});

module.exports = UserRole;