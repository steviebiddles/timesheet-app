'use strict'

process.env.BABEL_ENV = 'main'

const webpack = require('webpack')
const path = require('path')

let mainConfig = {
  entry: {
    main: path.join(__dirname, 'app/src/main/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'app/dist'),
    publicPath: '/app/dist/',
    filename: 'main.js'
  },
  target: 'electron-main',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules')
    ]
  }
}

module.exports = mainConfig
