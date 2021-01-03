const router = require('express').Router();

const validators = require('./validators/index');
const userController = require('./user-controller');

router.post('/', validators.createUser, (req, res, next) => userController.create(req, res, next));

module.exports = router;