const {merge} = require('webpack-merge')
const webpack = require('webpack')

const webpackCommonConfig = require('./webpack.common')
const {distPath} = require('../lib/paths')

module.exports = merge(webpackCommonConfig, {
    mode: 'development',

    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(scss|sass)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            // weindow.ENV = 'development'
            ENV: JSON.stringify('development')
        })
    ],

    devServer: {
        port: 3002,
        progress: true,
        contentBase: distPath,
        open: true,
        compress: true,
        proxy: {
            '/api': 'http://localhost:3000',
            '/api2': {
                target: 'http://localhost:3000',
                pathRewrite: {
                    '/api2': ''
                }
            }
        }
    }
})
    