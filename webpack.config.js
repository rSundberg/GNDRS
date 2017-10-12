const path = require('path');

// const cssOptions = {
//     localIdentName: '[name]__[local]-[hash:base32:5]',
//     modules: true
// }

const config = {
    entry: './App/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'App.bundle.js'
    },
    module: {
        rules: [
            {   
                test: /(.js$|.jsx$)/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ["transform-class-properties"],
                        presets: ['env', 'react']
                    }
                }
            },
            {
                test: /(.css$|.scss$)/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 8080
    }
}

module.exports = config;