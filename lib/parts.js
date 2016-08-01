// ======================================================================================================
//
// Define Configuration Settings for Webpack
//
// ======================================================================================================

// ---------------------------------------------------
// Import Modules
// ---------------------------------------------------

var webpack            = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin  = require("extract-text-webpack-plugin");
var PurifyCSSPlugin    = require('purifycss-webpack-plugin');
var precss             = require('precss');
var autoprefixer       = require('autoprefixer');

// ---------------------------------------------------
// Export parts to be added to webpack.config.js
// ---------------------------------------------------

exports.prductionPath = function(paths) {
  return {
    entry: {
      style: paths.style,
      app: paths.app
    },
    output: {
      path: paths.build,
      filename: '[name].js'
    }
  }
}

exports.devPath = function(paths) {
  return {
    entry: {
      style: paths.style,
      app: paths.app
    },
    output: {
      path: paths.app,
      filename: '[name].js'
    }
  }
}

exports.devServer = function(options) {
  return {
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      host: options.host,
      port: options.port
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]
  };
}

exports.minify = function() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  };
}

exports.setFreeVariable = function(key, value) {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
}

exports.clean = function(path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        root: process.cwd()
      })
    ]
  };
}

exports.extractCSS = function(paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader"),
          include: paths
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].css')
    ]
  };
}

// exports.purifyCSS = function(paths) {
//   return {
//     plugins: [
//       new PurifyCSSPlugin({
//         basePath: process.cwd(),
//         paths: paths
//       }),
//     ]
//   }
// }

exports.postcss = function() {
  return {
    postcss: function () {
      return [autoprefixer, precss];
    }
  }
}
