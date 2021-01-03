const { DataTypes } = require('sequelize');
const sequelize = require('./../database/index').default;

const Role = sequelize.define('role', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
});

module.exports = Role;