const { User, Role } = require('./../../models');
const bcryptManager = require('./../../utils/BcryptManager');

class AuthService {

    async login(username, password) {
        let user = await User.findOne({
            where: { email: username },
            include: [{ model: Role, attributes: ['name'] }]
        });
        if (!user)
            throw new Error('Invalid request');
        let isSame = await bcryptManager.compare(password, user.password);
        if (!isSame)
            throw new Error(`Invalid request`);
        return this.sanitizeUser(user);
    }

    async getUser(email) {
        let user = await User.findOne({
            where: { email: email },
            include: [{ model: Role, attributes: ['name'] }]
        });
        return this.sanitizeUser(user)
    }

    sanitizeUser(userObject) {
        let values = userObject.dataValues;
        delete values['password'];
        delete values['createdAt'];
        delete values['updatedAt'];
        values.roles = values?.roles?.map(value => value.name);
        return values;
    }


    async getUserDetailWithGoogleAccessToken(accessToken) {
        let userDetails = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`);
        let { email, given_name, family_name, picture } = userDetails.data;
        let user = await userService.findOrCreateUser({
            firstName: given_name,
            lastName: family_name,
            email,
            pic: picture,
            password: otherUtil.getRandomString()
        });
        return user;
    }

}

module.exports = new AuthService();