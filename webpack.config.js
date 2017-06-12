'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

module.exports = {
  entry: {
    app: ['url-search-params-polyfill', path.join(src, 'entry.js')],
  },

  output: {
    path: dist,
    publicPath: '/',
    filename: 'scripts/[chunkhash:8].js',
    chunkFilename: 'scripts/[chunkhash:8].js',
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
        exclude: [/\.html$/, /\.jsx?$/, /\.s?css$/, /\.json$/, /\.yml$/],
        use: {
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: '[name][hash:5].[ext]',
          },
        },
      },
      {
        test: /\.json$/,
        use: { loader: require.resolve('json-loader') },
      },
      {
        test: /\.jsx?$/,
        use: { loader: require.resolve('babel-loader') },
        exclude: /(node_modules)/,
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: require.resolve('style-loader'),
          use: [
            {
              loader: require.resolve('css-loader'),
              options: {
                modules: true,
                camelCase: true,
                localIdentName: '[hash:base64:5]',
              },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                plugins: [
                  require('autoprefixer')({
                    browsers: ['>1%', 'last 2 versions'],
                  }),
                  require('cssnano')({ preset: 'default' }),
                ],
              },
            },
            {
              loader: require.resolve('sass-loader'),
              options: {
                outputStyle: 'expanded',
                includePaths: [
                  path.resolve(__dirname, 'node_modules'),
                  path.join(src, 'styles'),
                ],
              },
            },
          ],
        }),
      },
      {
        test: /\.yml$/,
        use: [
          {
            loader: require.resolve('json-loader'),
          },
          {
            loader: require.resolve('yaml-loader'),
          },
        ],
        exclude: /(node_modules)/,
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new HtmlWebpackPlugin({
      inject: false,
      chunksSortMode: 'dependency',
      template: path.join(src, 'templates', 'index.html'),
      favicon: path.join(src, 'static', 'favicon.ico'),
      filename: 'index.html',
      formula: {
        sets: {
          master: {
            dimensions: {
              width: 980,
              height: 250,
              responsive: false,
              align: '',
            },
            provider: 'adform',
            inline: {
              css: false,
              js: false,
            },
            includes: ['gsap', 'jquery'],
          },
          slave: {
            dimensions: {
              width: 980,
              height: 150,
              responsive: false,
              align: '',
            },
            sizeLimit: 150,
            extends: 'master',
            provider: 'adform',
            inline: false,
            includes: ['gsap', 'jquery'],
          },
          'slave-test': {
            dimensions: {
              width: 480,
              height: 480,
              responsive: false,
            },
            extends: 'master',
            provider: 'adform',
            inline: {
              css: false,
              js: false,
            },
            includes: ['gsap', 'jquery'],
          },
          'slave-test-2': {
            dimensions: {
              width: 980,
              height: 1,
              responsive: false,
            },
            provider: 'doubleclick',
            inline: {
              css: true,
              js: true,
            },
            includes: ['gsap'],
          },
          yolo: {
            dimensions: {
              width: 1,
              height: 1,
              responsive: false,
            },
            provider: 'adform',
            inline: {
              styles: false,
              scripts: false,
            },
            includes: ['gsap'],
          },
          'yolo-2': {
            dimensions: {
              width: 1,
              height: 1,
              responsive: false,
            },
            provider: 'adform',
            inline: {
              styles: false,
              scripts: true,
            },
            includes: ['gsap'],
          },
        },
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /(node_modules|lib)/.test(module.resource),
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        drop_console: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false,
        screw_ie8: true,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    }),
    new ExtractTextPlugin('styles/[contenthash:5].css'),
  ],
};
