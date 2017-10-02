const path = require('path');

const config = {
    entry: './App/App.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'App.bundle.js'
    },
    module: {
        rules: [
            {   
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            }
        ]
    }
}

module.exports = config;