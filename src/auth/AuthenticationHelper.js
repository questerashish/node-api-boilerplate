const JWTManager = require('./../utils/JWTManager');
const AESEncrypter = require('./../utils/AESEncryptor');

class AuthenticationHelper {
    constructor() {
        this.jwtManager = new JWTManager(
            process.env.SESSION_SECRET,
            process.env.JWT_TOKEN_EXPIRATION
        )
        this.aesEncrypter = new AESEncrypter(process.env.SESSION_SECRET);
        this.COOKIE_KEY = 'token';
        this.COOKIE_EXPIRATION = (process.env.APP_ENV === 'DEV' ? 1 : 30) * 86400;
    }

    async attachToken(res, payload) {
        // payload.uid = v3();
        let hashedToken = await this.jwtManager.generateToken(JSON.parse(JSON.stringify(payload)));
        let encryptedToken = this.aesEncrypter.encrypt(hashedToken);
        res.cookie(this.COOKIE_KEY, encryptedToken, {
            expiresIn: this.COOKIE_EXPIRATION,
            httpOnly: true,
        });
        return encryptedToken;
    }

    async removeCookie(res, payload) {
        res.clearCookie(this.COOKIE_KEY);
        return res;
    }

    async verifyToken(req) {
        let { cookies: { token = '' }, headers } = req;
        let decrypted = this.aesEncrypter.decrypt(token);
        let decData = await this.jwtManager.decrypt(decrypted);
        req.session = decData;
        return req;
    }

}

module.exports = new AuthenticationHelper();