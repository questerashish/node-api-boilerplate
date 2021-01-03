const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const keys = require('./../../keys/index');
const GoogleKeys = keys.GOOGLE;
const oauthHelper = require('./../oauth-helper');

passport.serializeUser((user, cb) => {
    cb(null, user);
})

passport.deserializeUser((user, cb) => {
    cb(null, user);
})

passport.use(new GoogleStrategy({
    clientID: GoogleKeys.clientId,
    clientSecret: GoogleKeys.secretId,
    callbackURL: '/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, cb) => {

    let error, response;
    try {
        const {
            emails = [],
            name = { familyName: '', givenName: '' },
            photos = [],
        } = profile;

        if (!name.givenName)
            name.givenName = profile.displayName;

        if (emails.length == 0)
            throw new Error(`Invalid email, please try again`);

        let email = emails[0].value;

        let pic;
        if (photos.length)
            pic = photos[0].value;

        let user = await oauthHelper.findOrCreateUserWithEmail(
            name.givenName,
            name.familyName,
            email,
            pic,
        )
        response = user;
    } catch (err) {
        error = err;
    }

    cb(error, response);
}))