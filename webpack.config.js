// ======================================================================================================
//
// Webpack Config File
//
// ======================================================================================================

// ---------------------------------------------------
// Import Modules
// ---------------------------------------------------

var path     = require("path");
var webpack  = require("webpack");
var merge    = require('webpack-merge');
var validate = require('webpack-validator');
const parts  = require('./lib/parts');

// ---------------------------------------------------
// Define path variables
// ---------------------------------------------------

var PATHS = {
  app:   path.join(__dirname, './app'),
  style: path.join(__dirname, './app', 'scss/app.scss'),
  build: path.join(__dirname, 'dist')
};

// ---------------------------------------------------
// Shared Webpack config between dev and staging
// ---------------------------------------------------

var common = {
  resolve: {
    extensions: [
      "",
      ".js"
    ],
    modulesDirectories: [
      "app",
      "node_modules"
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: [
          "react-hot",
          "babel-loader"
        ],
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|ttf)$/,
        exclude: /node_modules/,
        loader: "url-loader?limit=5000"
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};

// ---------------------------------------------------
// Define specific enviromental settings
// ---------------------------------------------------

var config;

switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
      parts.prductionPath(PATHS),
      common,
      {
        devtool: 'source-map',
        output: {
          path: path.join(__dirname, 'dist'),
          filename: '[name].js'
        },
      },
      parts.clean(PATHS.build),
      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),
      parts.minify(),
      parts.extractCSS(PATHS.style),
      parts.postcss()
    );
    break;
  default:
    config = merge(
      parts.devPath(PATHS),
      common,
      { devtool: 'source-map' },
      parts.extractCSS(PATHS.style),
      parts.postcss(),
      parts.devServer({
        host: process.env.HOST,
        port: 3000
      })
    );
}

// ---------------------------------------------------
// Export and validate webpack config file
// ---------------------------------------------------

module.exports = validate(config);
