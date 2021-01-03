require('dotenv').config();

const database = require('./src/database');
const { User, Role } = require('./src/models');
const UserService = require('./src/users/services/user.service');

const Roles = require('./src/utils/Roles');

const initializeRoles = async () => {
    const existingRoles = await Role.findAll();
    console.info(`Existing Roles `, existingRoles.map(role => role.dataValues));

    if (existingRoles.length == 0) {
        const rolesToBeMade = [
            { name: Roles.Admin }
        ]
        let createdRoles = await Role.bulkCreate(rolesToBeMade)
        console.info(`Created Roles`)
        console.info(createdRoles.map(role => role.dataValues));
    }
}

const initUsers = async () => {
    let user = await User.findOne({
        where: {
            email: process.env.ADMIN_EMAIL
        }
    });
    if (!user) {
        console.info(`Admin user not found, initializing user`);
        user = await UserService.create({
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            firstName: 'Admin',
            lastName: 'Admin'
        });
        user = await User.findOne({ where: { email: process.env.ADMIN_EMAIL } })
        let roles = await Role.findAll();
        await user.addRoles(roles);
        console.info(`User Created`, user.dataValues);
    } else {
        console.info(`User already exists`);
    }
}

const init = async () => {
    await database.default.sync();
    await initializeRoles();
    await initUsers();
}

init().then(() => {
    console.info('********ALL DONE********');
    process.exit(0)
});
