const { UnauthorizedException } = require('../errors/invalid-request');
const authenticationHelper = require('./AuthenticationHelper');

const sessionParser = async (req, res, next) => {
    try {
        await authenticationHelper.verifyToken(req);
    } catch (error) { }
    next();
}

const validateSession = async (req, res, next) => {
    if (!req.session)
        return res.status(401).send(`Invalid Session`);
    else
        next();
}

const validateWithRole = role => {
    return (req, res, next) => {
        if (req.session?.roles?.indexOf(role) == -1)
            return req.status(401).send(`Invalid request`);
        else
            next();
    }
}

module.exports = {
    sessionParser,
    validateSession,
    validateWithRole,
}
