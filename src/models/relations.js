const User = require('./user');
const Role = require('./roles');
const Follwers = require('./followers');
const UserRoles = require('./user-roles');

User.belongsToMany(Role, { through: UserRoles });
Role.belongsToMany(User, { through: UserRoles });

User.belongsToMany(User, { through: Follwers, as: 'followers' });