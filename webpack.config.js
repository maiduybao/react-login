'use strict';
const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TextWebpackPlugin = require('extract-text-webpack-plugin');
let extractPlugin = new TextWebpackPlugin({
    filename: 'main_[hash].css'
});

const PROJECT_PATHS = {
    app: path.join(__dirname, 'client'),
    build: path.join(__dirname, 'dist')
};

module.exports = {
  //  devtool: 'source-map',
    entry: [path.join(PROJECT_PATHS.app, 'main.js')],
    output: {
        path: PROJECT_PATHS.build,
        //    filename: 'bundle.js'
        filename: 'bundle_[hash].js',
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
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
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
            },
            {
                test: /\.(css|scss|sass)$/,
                loader: extractPlugin.extract({use: ['css-loader', 'sass-loader']}),
            }
        ]
    },
    plugins: [
        new Webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }, 
            sourceMap: false
        }),
        extractPlugin,
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(PROJECT_PATHS.app, 'index.html')
        }),
        new CleanWebpackPlugin([PROJECT_PATHS.build])
    ]
};


