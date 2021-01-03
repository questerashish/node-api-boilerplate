const { User, Role } = require('./../../models')
const bcryptManager = require('./../../utils/BcryptManager');

class UserService {

    async create(user) {
        user.password = await bcryptManager.encrypt(user.password)
        let created = await User.create(user);
        return this.sanitizeUser(created);
    }

    sanitizeUser(userObject) {
        let values = userObject.dataValues;
        delete values['password'];
        return values;
    }

    async findOrCreateUser(user) {
        let existing = await User.findOne({ where: { email: user.email } });
        if (!existing)
            await this.create(user);
        existing = await User.findOne({
            where: {
                email: user.email,
            },
            include: [{ model: Role, attributes: ['name'] }]
        })
        return this.sanitizeUser(existing);
    }

}

module.exports = new UserService();