'use strict';

const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

router.use(cors());

const indexController = require('../controllers/indexController');

router.get('/', indexController.index);
router.get('/:id', indexController.show);
router.put('/:id', indexController.update);
router.post('/', indexController.create);
router.delete('/', indexController.destroy);

const messageController = require('../controllers/messageController');

router.get('/message', messageController.index);
router.get('/message/:id', messageController.show);
router.put('/message/:id', messageController.update);
router.post('/message', messageController.create);
router.delete('/message', messageController.destroy);

router.use((req, res) => {
  res.status(404).json({ message: "Couldn't find what you're looking for." });
});

router.use((err, req, res) => {
  if (err) console.log(err);

  res.status(500).json({ message: 'Something broke!' });
});

module.exports = router;
