const jwt = require('jsonwebtoken');

class JWTManager {

    constructor(sessionSecret, tokenExpiration = '1d') {
        this.secret = sessionSecret;
        this.tokenExpiration = tokenExpiration;
    }

    async generateToken(payload) {
        let token = jwt.sign(
            payload,
            this.secret,
            {
                expiresIn: this.tokenExpiration,
                algorithm: 'HS256'
            }
        );
        return token;
    }

    async decrypt(token) {
        let decrypted = await jwt.verify(token, this.secret);
        return decrypted;
    }

}

module.exports = JWTManager;