const router = require('express').Router();
const passport = require('passport');

router.get('/callback', passport.authenticate('facebook'),
    (req, res, next) => {
        res.render('post-oauth.ejs');
    }
)

router.get('/', passport.authenticate('facebook'));

module.exports = router;