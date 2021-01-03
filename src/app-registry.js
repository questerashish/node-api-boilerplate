const passport = require('passport')
const userRoutes = require('./users/routes');
const authRoutes = require('./auth/routes');
const authMiddlewares = require('./auth/auth-middlewares');

const appRegistry = async app => {
    console.info(`REGISTERING APPS`);

    app.use(passport.initialize())
    app.use(authMiddlewares.sessionParser);
    app.use('/api/user', userRoutes);
    app.use('/api/auth', authRoutes);

}

module.exports = { registerApps: appRegistry };