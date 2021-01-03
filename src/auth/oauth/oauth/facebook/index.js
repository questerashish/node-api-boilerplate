const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const Keys = require('./../../keys//dummy').FACEBOOK;


passport.serializeUser((user, cb) => {
    console.log(`called FB serialize`, user);
    cb(null, user);
})

passport.deserializeUser((user, cb) => {
    console.log(`called FB deserialize`, user);
    cb(null, user);
})

passport.use(new FacebookStrategy({
    clientID: Keys.clientID,
    clientSecret: Keys.clientSecret,
    callbackURL: '/api/auth/facebook/callback'
}, (accessToken, refreshToken, profile, cb) => {
    console.log(`FB auth response received`);
    console.log(`FB User`, profile)
    cb(null, profile);
}))