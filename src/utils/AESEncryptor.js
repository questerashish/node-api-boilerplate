const CryptoJS = require('crypto-js');
const { AES } = require('crypto-js');

class AESEncrypter {

    constructor(privateKey) {
        this.privateKey = privateKey;
    }

    encrypt(value) {
        return AES.encrypt(value, this.privateKey).toString()
    }

    decrypt(encrypted) {
        return AES.decrypt(encrypted, this.privateKey).toString(CryptoJS.enc.Utf8)
    }
}

module.exports = AESEncrypter;