"use strict";

const path = require("path");
const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "main_[hash].css"
});


const PROJECT_PATHS = {
    app: path.join(__dirname, "client"),
    build: path.join(__dirname, "dist")
};
module.exports = {
    devtool: 'inline-source-map',
    entry: [path.join(PROJECT_PATHS.app, "main.js")],
    output: {
        path: path.resolve(__dirname, "dist"),
        //    filename: 'bundle.js'
        filename: "bundle_[hash].js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: [path.resolve(__dirname, "/node_modules/")],
                options: {
                    presets: [
                        "react",
                        "es2015"
                    ]
                }
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                exclude: [path.resolve(__dirname, "/node_modules/")]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: "file-loader",
                exclude: [path.resolve(__dirname, "/node_modules/")],
                options: {
                    name: "[name].[ext]",
                    outputPath: "img/",
                    publicPath: "img/"
                }
            },
            {
                test: /\.(scss|sass)$/,
                use: extractSass.extract({
                    use: [
                        "css-loader",
                        "sass-loader"
                    ],
                    fallback: "style-loader"
                }),
                exclude: [path.resolve(__dirname, "/node_modules/")]
            }
        ]

    },
    plugins: [
        new Webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        extractSass,
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(PROJECT_PATHS.app, "index.html")
        }),
        new CleanWebpackPlugin([PROJECT_PATHS.build])
    ]
};


