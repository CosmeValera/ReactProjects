const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({

  mode: "development",
  cache: false,
  target: 'web',
  devtool: false,
  entry: path.resolve(__dirname, "./src/index.js"),
  
  output: {
    publicPath: "http://localhost:4002/",
    libraryExport: 'index',
    chunkLoading: false,
    // path: path.resolve(__dirname, 'dist'),
    // module: true, // Disable for CJ
    // library: {
    //   type: "var",
    //   name: "webpack_host"
    // },
  },
  // target: 'es2020', // Disable for CJ

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 4002,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "webpack_remote",
      // library: {
      //   type: "var", name: "webpack_remote"
      // },
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./WebpackApp": "./src/WebpackApp",
      },
      shared: {
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
      template: "./index.html"
    })
  ],
});
