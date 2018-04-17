"use strict";
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const config = require("./config");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const _ = require("./utils");

const extractSCSS = new ExtractTextPlugin("styles/main.css");
const htmlWebPackPlugin = new HtmlWebpackPlugin({
  title: config.title,
  template: path.resolve(__dirname, "index.html"),
  filename: _.outputIndexPath
});
const loaderOptionsPlugin = new webpack.LoaderOptionsPlugin(_.loadersOptions());
const copyWebPackPlugin = new CopyWebpackPlugin([
  {
    from: _.cwd("./static"),
    // to the root of dist path
    to: "./"
  }
]);

module.exports = {
  entry: {
    client: "./client/index.js"
  },
  output: {
    path: _.outputPath,
    filename: "[name].js",
    publicPath: config.publicPath,
    // Point sourcemap entries to original disk location
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath),
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true
  },
  performance: {
    hints: process.env.NODE_ENV === "production" ? "warning" : false
  },
  resolve: {
    extensions: [".js", ".vue", ".css", ".json"],
    alias: {
      root: path.join(__dirname, "../client"),
      components: path.join(__dirname, "../client/components")
    },
    modules: [
      _.cwd("node_modules"),
      // this meanse you can get rid of dot hell
      // for example import 'components/Foo' instead of import '../../components/Foo'
      _.cwd("client")
    ]
  },
  plugins: [
    htmlWebPackPlugin,
    loaderOptionsPlugin,
    copyWebPackPlugin,
    extractSCSS
  ],
  target: _.target,
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loaders: ["vue-loader"]
      },
      {
        test: /\.js$/,
        loaders: ["babel-loader"],
        exclude: [/node_modules/]
      },
      {
        test: /\.es6$/,
        loaders: ["babel-loader"]
      },
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
        loader: "file-loader",
        query: {
          name: "static/media/[name].[hash:8].[ext]"
        }
      },
      {
        test: /\.scss$/,
        use: extractSCSS.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                url: false,
                minimize: true,
                sourceMap: false
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: false
              }
            }
          ]
        })
      },
      {
        test: /\.svg$/,
        loader: "raw-loader"
      }
    ]
  }
};
