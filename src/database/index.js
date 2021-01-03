
const { Sequelize } = require('sequelize');

const defaultConnection = new Sequelize(process.env.DEFAULT_DATABASE_URL, { logging: false });


module.exports = {
    default: defaultConnection
}