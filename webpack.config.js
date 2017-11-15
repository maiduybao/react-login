"use strict";

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');


const PROJECT_PATHS = {
    app: path.resolve(__dirname, "client"),
    build: path.resolve(__dirname, "dist")
};
module.exports = {
    devtool: "cheap-module-source-map",
    entry: {
        "main": path.resolve(PROJECT_PATHS.app, "index.js")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "static/js/[name].[hash:8].js",
        chunkFilename: "static/js/[name].[hash:8].chunk.js",
        publicPath: "/"
    },
    module: {
        strictExportPresence: true,
        rules: [
            /*
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: [path.resolve(__dirname, "/node_modules/")],
                loader: "eslint-loader"
            },*/
            {
                test: /\.(js|jsx|mjs)$/,
                loader: "babel-loader",
                exclude: [path.resolve(__dirname, "/node_modules/")],
                include: PROJECT_PATHS.app,
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
                    ],
                    cacheDirectory: true,
                }
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                exclude: [path.resolve(__dirname, "/node_modules/")]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: process.env.NODE_ENV !== "production",
                            //    modules: true,
                                importLoaders: 1,
                            //    localIdentName: "[name]__[local]"
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                // Necessary for external CSS imports to work
                                // https://github.com/facebookincubator/create-react-app/issues/2677
                                ident: 'postcss',
                                plugins: () => [
                                    require("postcss-flexbugs-fixes"),
                                    autoprefixer({
                                        browsers: [
                                            '>1%',
                                            'last 4 versions',
                                            'Firefox ESR',
                                            'not ie < 9', // React doesn't support IE8 anyway
                                        ],
                                        flexbox: 'no-2009',
                                    }),
                                ].concat(process.env.NODE_ENV === "production" ? [
                                    require("cssnano")()
                                ] : []),
                                sourceMap: process.env.NODE_ENV !== "production"
                            }
                        },
                        {
                            loader: "resolve-url-loader",
                            options: {
                                sourceMap: process.env.NODE_ENV !== "production"
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: process.env.NODE_ENV !== "production"
                            }
                        }

                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(jpe?g|png|gif|ttf|otf|eot|svg|ico?)(\?[a-z0-9]+)?$/,
                loader: "file-loader",
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                }
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    mimetype: "application/font-woff",
                    name: 'static/media/[name].[hash:8].[ext]',
                }
            },

        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: "static/media/styles.bundle.[hash:8].css",
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(PROJECT_PATHS.app, "index.html"),
            favicon: path.join(PROJECT_PATHS.app, "favicon.ico"),
            inject: true
        }),
        new CaseSensitivePathsPlugin(),
        new CleanWebpackPlugin([PROJECT_PATHS.build])
    ].concat(process.env.NODE_ENV === "production" ? [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false
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


