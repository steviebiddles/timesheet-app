'use strict'

process.env.BABEL_ENV = 'renderer'

const webpack = require('webpack')
const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let rendererConfig = {
  entry: [
    'font-awesome-webpack!font-awesome-webpack/font-awesome.config.js',
    path.join(__dirname, 'app/src/renderer/main.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'app/dist'),
    filename: 'renderer.js'
  },
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.json/,
        loader: 'json-loader',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1&data=@import "./app/src/renderer/globals"',
            scss: 'vue-style-loader!css-loader!sass-loader?data=@import "./app/src/renderer/globals";'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'components': path.join(__dirname, 'app/src/renderer/components'),
      'renderer': path.join(__dirname, 'app/src/renderer')
    },
    extensions: ['.js', '.vue', '.css', '.json'],
    modules: [
      path.join(__dirname, 'node_modules')
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './app/index.ejs'),
      appModules: process.env.NODE_ENV !== 'production'
        ? path.resolve(__dirname, 'node_modules')
        : false,
    })
  ],
  devtool: '#eval-source-map',
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  }
}

module.exports = rendererConfig
