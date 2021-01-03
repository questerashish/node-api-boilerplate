const { body } = require('express-validator');

module.exports = {
    login: [
        body('email').isEmail().normalizeEmail(),
        body('password').not().isEmpty().trim().escape().isLength({ min: 5 }, 'Password length should be greater than 5')
    ]
}