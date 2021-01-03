const router = require('express').Router();

const googleRoutes = require('./google-auth.route');
const fbRoutes = require('./fb-auth.route');
const instagram = require('./instagram-auth.route');

router.use('/instagram', instagram);

router.use('/facebook', fbRoutes);

router.use('/google', googleRoutes);

module.exports = router;