const router = require('express').Router();
const validators = require('./validators');
const authController = require('./auth-controller');
const authMiddlewares = require('./auth-middlewares');
const Roles = require('./../utils/Roles');

const oauthRoutes = require('./oauth/oauth-routes/index')

router.post('/login', validators.login, (req, res, next) => authController.login(req, res, next))

router.get('/session', authMiddlewares.validateSession, (req, res, next) => authController.sessionData(req, res, next));

router.use(oauthRoutes);

module.exports = router;
