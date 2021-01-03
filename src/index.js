const path = require('path');

const appRegistry = require('./app-registry');
const database = require('./database');
const models = require('./models');

require('./services')
const applicationInitializer = async app => {
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    await appRegistry.registerApps(app);
    await database.default.sync({})
}

module.exports = applicationInitializer;