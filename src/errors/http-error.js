const { stat } = require("fs");

class HTTPError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.status = status;
    }
}

module.exports = HTTPError;