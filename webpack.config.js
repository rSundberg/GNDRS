const path = require('path')
require('uglifyjs-webpack-plugin')

const config = {
    entry: ["babel-polyfill", './App/index.js'],
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
                        plugins: ["transform-class-properties", "transform-object-rest-spread"],
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
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "babel-loader"
                    },
                    {
                        loader: "react-svg-loader",
                        options: {
                            jsx: true
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [
                    'url-loader?limit=10000',
                    'img-loader'
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