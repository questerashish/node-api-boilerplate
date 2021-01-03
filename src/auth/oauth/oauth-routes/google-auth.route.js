const router = require('express').Router();
const passport = require('passport');

const authController = require('./../../auth-controller');

router.get('/callback',
    passport.authenticate('google'),
    (req, res, next) => authController.attachTokenWithOauthFlow(req, res, next));

router.get('/', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.post('/token', (req, res, next) => authController.loginWithGoogleToken(req, res, next));

module.exports = router;