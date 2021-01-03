const bcrypt = require('bcrypt');

class BcryptManager {
    constructor() {
        this.salt = bcrypt.genSaltSync(12);
    }

    async encrypt(message) {
        return bcrypt.hash(message, this.salt);
    }

    async compare(message, hashedMessage) {
        return bcrypt.compare(message, hashedMessage)
    }
}

module.exports = new BcryptManager();