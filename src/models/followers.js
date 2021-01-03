const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('./../database/index').default;

const Follower = sequelize.define('follower', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    isApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});

module.exports = Follower;