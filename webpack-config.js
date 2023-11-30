// TODO: Consult with lesctor about this stuff
const Dotenv = require('dotenv-webpack');

module.exports = {
    // Other Webpack configuration...

    plugins: [
        new Dotenv(),
    ],
};