const { InvalidRequestException } = require('./errors/invalid-request')
const { Error } = require('sequelize')
const HTTPError = require("./errors/http-error");
const { validationResult } = require('express-validator');

class Controller {
    handleSuccess(res, data) {
        return res.send(data);
    }

    handleRequestErrors(req) {
        const errors = validationResult(req);

        if (!errors.isEmpty())
            throw new InvalidRequestException(errors.array())

    }

    handleFailure(res, error) {
        if (error && error instanceof HTTPError) {
            console.log('HTTP ERROR', error.messageJson)
            return res.status(error.status).json({ errors: error.messageJson });
        }
        let message = error.message;
        if (error instanceof Error) {
            message = error.name
        }
        return res.status(500).send({ errors: [message] });
    }
}

module.exports = Controller;