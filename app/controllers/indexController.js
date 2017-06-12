'use strict';

const index = (req, res) =>
  res.status(501).json({
    error: {
      message: 'Nothing to see here.. yet.',
    },
  });

const show = (req, res) =>
  res.status(501).json({
    error: {
      message: 'Nothing to see here.. yet.',
    },
  });

const update = (req, res) =>
  res.status(501).json({
    error: {
      message: 'Nothing to see here.. yet.',
    },
  });

const create = (req, res) =>
  res.status(501).json({
    error: {
      message: 'Nothing to see here.. yet.',
    },
  });

const destroy = (req, res) =>
  res.status(501).json({
    error: {
      message: 'Nothing to see here.. yet.',
    },
  });

module.exports = {
  index,
  show,
  update,
  create,
  destroy,
};
