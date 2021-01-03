const { body } = require('express-validator');

module.exports = {
    createUser: [
        body('firstName').not().isEmpty().trim().escape(),
        body('lastName').isString().optional({ nullable: true }),
        body('email').isEmail().normalizeEmail(),
        body('password').not().isEmpty().trim().escape().isLength({ min: 5 }, 'Password length should be greater than 5')
    ]
}