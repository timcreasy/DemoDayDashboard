const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: 'eval',
  entry: './client/app.js',
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
   module: {
    loaders: [
      { test: /\.coffee$/, loader: 'coffee-loader' },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};
