const userController = require('./../../../users/services/user.service');
const authController = require('./../../services/auth.service');
const otherUtil = require('./../../../utils/OtherUtil');

module.exports = {
    findOrCreateUserWithEmail: async (firstName, lastName, email, pic) => {
        let user = await userController.findOrCreateUser({
            firstName,
            lastName,
            email,
            pic,
            password: otherUtil.getRandomString()
        });
        return user;
    }
}