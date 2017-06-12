'use strict';

module.exports = {
  set: (prop, val) => {
    this[prop] = val;
  },

  get: prop => this[prop],
};
