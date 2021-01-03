const HTTPError = require('./http-error');

class InvalidRequestException extends HTTPError {
    constructor(message) {
        super(message, 400);
        this.messageJson = message;
    }
}

class UnauthorizedException extends HTTPError {
    constructor(message) {
        super(message, 401);
    }
}

module.exports = {
    InvalidRequestException,
    UnauthorizedException
}