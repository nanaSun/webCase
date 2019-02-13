'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {getStyleLoaders,cssRegex,cssModuleRegex,sassRegex,sassModuleRegex}=require("./styleLoader")

const publicPath = '/';
const NODE_ENV = "production";

module.exports={
  mode: NODE_ENV,
  resolve: {
    extensions: [
      '.mjs',
      '.web.ts',
      '.ts',
      '.web.tsx',
      '.tsx',
      '.web.js',
      '.js',
      '.json',
      '.web.jsx',
      '.jsx',
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 9000
  },
  entry: [
    path.resolve(__dirname,'src/index')
  ],
  output: {
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath,
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(ts|tsx)$/,
            include: path.resolve(__dirname,"src"),//important
            use: {
                loader: 'ts-loader'
              }
          },
          {
            test: /\.(js|mjs|jsx)$/,
            include: path.resolve(__dirname,"src"),//important
            use: {
                loader: 'babel-loader'
              }
          },
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoaders({importLoaders: 1 }, "",NODE_ENV),
          },
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: getStyleLoaders({ importLoaders: 2 }, 'sass-loader',NODE_ENV),
          }
        ],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename:  'static/css/[name].css',
      chunkFilename: 'static/css/[id].css',
    })
  ]
};
