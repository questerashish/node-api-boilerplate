const randomstring = require('randomstring');

class OtherUtil {

    getRandomString(length = 10) {
        return randomstring.generate(length);
    }
}

module.exports = new OtherUtil();