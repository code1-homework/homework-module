const webpack = require('webpack')
const {merge} = require('webpack-merge')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const webpackCommonConfig = require('./webpack.common')
const {distPath} = require('../lib/paths')

module.exports = merge(webpackCommonConfig, {
    mode: 'production',

    output: {
        filename: '[name].[contenthash:8].js',
        path: distPath
    },

    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5*1024,
                        outputPath: '/images/'
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            // weindow.ENV = 'production'
            ENV: JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css'
        })
    ],

    optimization: {
        minimizer: [
            new optimizeCSSAssetsPlugin({}),
            new TerserJSPlugin({})
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                common: {
                    name: 'common',
                    priority: 0,
                    minSize: 0,
                    minChunks: 2
                }
            }
        }
    },

   
})
    