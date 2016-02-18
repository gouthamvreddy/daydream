var path = require('path');
var webpack = require('webpack');

var PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

module.exports = {
  entry: "./app/index.js",
  output: {
    path: __dirname + "/build",
    filename: "bundle.js"
  },
  module: {
    loaders: [{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}]
  }
}
