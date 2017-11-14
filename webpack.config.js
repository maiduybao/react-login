"use strict";

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PROJECT_PATHS = {
    app: path.join(__dirname, "client"),
    build: path.join(__dirname, "dist")
};
module.exports = {
    devtool: "inline-source-map",
    entry: {
        "app": path.join(PROJECT_PATHS.app, "index.js")
    },
//    entry: [path.join(PROJECT_PATHS.app, "index.js")],
    output: {
        path: path.resolve(__dirname, "dist"),
        //    filename: 'bundle.js'
        filename: "bundle_[hash].js",
        publicPath: "/"
    },
    module: {
        rules: [
            /*
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: [path.resolve(__dirname, "/node_modules/")],
                loader: "eslint-loader"
            },*/
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: [path.resolve(__dirname, "/node_modules/")],
                options: {
                    presets: [
                        ["env", {
                            "targets": {
                                "browsers": ["last 2 versions"]
                            }
                        }],
                        "react",
                        "stage-3"
                    ],
                    plugins: [
                        "transform-decorators-legacy",
                        "transform-class-properties"
                    ]
                }
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                exclude: [path.resolve(__dirname, "/node_modules/")]
            },
            {
                test: /\.(scss)$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                            //    modules: true,
                                //   importLoaders: 1,
                            //    localIdentName: "[name]__[local]"
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                ident: 'postcss',
                                plugins: (loader) => [
                                    require('postcss-nested'),
                                    require('postcss-import')({ root: loader.resourcePath }),
                                    require('postcss-cssnext')({warnForDuplicates: false}),
                                    require('autoprefixer')(),
                                    require('cssnano')()
                                ],
                                sourceMap: true
                            }
                        },
                        {
                            loader: "resolve-url-loader",
                            options: { sourceMap: true }
                        },
                        {
                            loader: "sass-loader",
                            options: { sourceMap: true }
                        }

                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(jpe?g|png|gif|ttf|otf|eot|svg|ico|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
        }),
        new ExtractTextPlugin({
            filename: "main_[hash].css"
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(PROJECT_PATHS.app, "index.html"),
            favicon: path.join(PROJECT_PATHS.app, "favicon.ico")
        }),
        new CleanWebpackPlugin([PROJECT_PATHS.build])
    ].concat(process.env.NODE_ENV === "production" ? [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    ] : []),
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        compress: true,
        port: 8080,
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                secure: false
            }
        }
    },
    resolve: { extensions: [ ".js", ".json" ] }
};


