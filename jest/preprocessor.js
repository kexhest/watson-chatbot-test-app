/* eslint-disable use-strict */

'use-strict';

const babelJest = require('babel-jest');
const webpackAlias = require('jest-webpack-alias');

module.exports = {
  process(src, filename) {
    if (filename.indexOf('node_modules') === -1) {
      return webpackAlias.process(babelJest.process(src, filename), filename);
    }

    return babelJest.process(src, filename);
  },
};
