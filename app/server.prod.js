'use strict';

const express = require('express');
const compression = require('compression');

module.exports = (app, root) => {
  app.use(compression());

  app.use(express.static(root, { maxAge: 0 }));

  app.use((req, res, next) => {
    if (req.method === 'GET' && req.accepts('html')) {
      res.sendFile('index.html', { root });
    } else {
      next();
    }
  });
};
