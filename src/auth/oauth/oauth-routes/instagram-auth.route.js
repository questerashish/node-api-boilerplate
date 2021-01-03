const router = require('express').Router();
const passport = require('passport');

router.get('/callback', passport.authenticate('instagram'),
    (req, res, next) => {
        res.render('post-oauth.ejs');
    }
)

router.get('/', passport.authenticate('instagram'));

module.exports = router;