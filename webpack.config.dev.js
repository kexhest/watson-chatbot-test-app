'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

module.exports = {
  devtool: 'cheap-module-source-map',

  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      path.join(src, 'entry.js'),
    ],
  },

  output: {
    path: dist,
    publicPath: '/',
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/[name].js',
  },

  resolve: {
    modules: [
      path.join(src, 'scripts'),
      path.join(src, 'styles'),
      path.join(src, 'media'),
      path.join(src, 'fonts'),
      path.join(src, 'translations'),
      'node_modules',
    ],
    alias: {},
  },

  externals: {
    cheerio: 'window',
    'react/addons': 'react',
    'react/lib/ExecutionEnvironment': 'react',
    'react/lib/ReactContext': 'react',
  },

  module: {
    rules: [
      {
        exclude: [
          /\.json$/,
          /\.jsx?$/,
          /\.html$/,
          /\.(css|scss)$/,
          /\.svg$/,
          /\.yml$/,
        ],
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'media/[name].[ext]',
          },
        },
      },
      {
        test: /\.json$/,
        use: { loader: 'json-loader' },
        exclude: /(node_modules)/,
      },
      {
        test: /\.jsx?$/,
        use: [
          { loader: 'react-hot-loader/webpack' },
          { loader: 'babel-loader' },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({
                  browsers: ['>1%', 'last 2 versions'],
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              includePaths: [
                path.resolve(__dirname, 'node_modules'),
                path.join(src, 'styles'),
              ],
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [{ loader: 'babel-loader' }, { loader: 'react-svg-loader' }],
        exclude: /(node_modules)/,
      },
      {
        test: /\.yml$/,
        use: [{ loader: 'json-loader' }, { loader: 'yaml-loader' }],
        exclude: /(node_modules)/,
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new HtmlWebpackPlugin({
      inject: false,
      chunksSortMode: 'dependency',
      template: path.join(src, 'templates', 'index.html'),
      favicon: path.join(src, 'static', 'favicon.ico'),
      filename: 'index.html',
      minify: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
