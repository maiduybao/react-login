'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PROJECT_PATHS = {
    app: path.join(__dirname, 'client'),
    build: path.join(__dirname, 'dist')
};

module.exports = {
    devtool: 'inline-source-map',
    entry: [path.join(PROJECT_PATHS.app, 'main.js')],
    output: {
        path: PROJECT_PATHS.build,
        //    filename: 'bundle.js'
        filename: 'bundle_[chunkhash].js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(jpg|png)$/,
                loader: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: 'img/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(PROJECT_PATHS.app, 'index.html')
        }),
        new CleanWebpackPlugin([PROJECT_PATHS.build])
    ]

};


