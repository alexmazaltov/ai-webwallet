const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js', // assuming your main entry file is index.js
    output: {
        path: path.resolve(__dirname, 'dist'), // set your desired output folder
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'), // specify the source folder
                use: 'babel-loader', // configure for your project
            },
        ],
    },
    plugins: [
        new Dotenv(), // loads environment variables from .env file
    ],
};
