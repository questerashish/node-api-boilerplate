const passport = require('passport');
const InstagramStrategy = require('passport-instagram');
const Keys = require('./../../keys/dummy').INSTAGRAM;

passport.serializeUser((user, cb) => {
    console.log(`called Instagram serialize`, user);
    cb(null, user);
})

passport.deserializeUser((user, cb) => {
    console.log(`called Instagram deserialize`, user);
    cb(null, user);
})

passport.use(new InstagramStrategy({
    clientID: Keys.clientID,
    clientSecret: Keys.clientSecret,
    callbackURL: '/api/auth/instagram/callback'
}, (accessToken, refreshToken, profile, cb) => {
    console.log(`Instagram auth response received`);
    console.log('Instagram Profile', profile)

    cb(null, profile);
}))