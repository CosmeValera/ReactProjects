/* eslint-disable semi */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require('./package.json').dependencies;
const path = require('path');

module.exports = () => ({
    // mode: 'production',
    // entry: '/src/index.js',
    cache: false,
    devtool: false,
    optimization: {
        minimize: true,
    },
    output: {
        publicPath: '/aggregator/grafana/',
        clean: true,
        pathinfo: false,
        path: path.join(__dirname, '/dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'swc-loader',
                options: {
                    cacheDirectory: true,
                },
            },
            {
                test: /\.(css|s[ac]ss)$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "autoprefixer",
                                ],
                            },
                        },
                    }
                ],
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            }, {
                test: /\.svg$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            svgo: false,
                        },
                    },
                    'url-loader',
                ],
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "grafana_mfe",
            filename: "remoteEntry.js",
            remotes: {},
            exposes: {
                "./GrafanaRemote": "./src/components/GrafanaRemote.jsx",
                './GrafanaRefresh': './src/components/GrafanaRefresh.jsx',
                './GrafanaTimeRange': './src/components/GrafanaTimeRange.jsx',
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                    eager: true,
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                    eager: true,
                },
            },
        }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
        }),
    ],
});
