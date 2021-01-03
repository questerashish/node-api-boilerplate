const google = require('./google/index');
const instagram = require('./instagram');
const facebook = require('./facebook');

console.log(`REGISTERING OAUTH THINGS`)

module.exports = {
    google,
    facebook,
    instagram
}