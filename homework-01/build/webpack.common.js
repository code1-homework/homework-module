const path = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")

const {srcPath} = require("../lib/paths")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: {
        index: path.join(srcPath, 'index.js'),
        // other: path.join(srcPath, 'other.js')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: srcPath,
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html',
            chunks: ['index']
        }),
        // new HtmlWebpackPlugin({
        //     template: path.join(srcPath, 'other.html'),
        //     filename: 'other.html',
        //     chunks: ['other']
        // })    
    ]
}