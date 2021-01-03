const User = require('./user');
const Role = require('./roles');
const UserRole = require('./user-roles');
const Follower = require('./followers');
require('./relations');

module.exports = {
    User,
    Role,
    UserRole,
    Follower,
}