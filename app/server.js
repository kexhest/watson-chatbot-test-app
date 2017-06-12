'use strict';

const path = require('path');
const http = require('http');
const express = require('express');
const logger = require('morgan');
const multer = require('multer');

const config = require('./config');

config.set('CONVERSATION_WORKSPACE_ID', process.env.CONVERSATION_WORKSPACE_ID);
config.set('CONVERSATION_URL', process.env.CONVERSATION_URL);
config.set('CONVERSATION_USERNAME', process.env.CONVERSATION_USERNAME);
config.set('CONVERSATION_PASSWORD', process.env.CONVERSATION_PASSWORD);
config.set('TONE_ANALYZER_URL', process.env.TONE_ANALYZER_URL);
config.set('TONE_ANALYZER_USERNAME', process.env.TONE_ANALYZER_USERNAME);
config.set('TONE_ANALYZER_PASSWORD', process.env.TONE_ANALYZER_PASSWORD);

const v1 = require('./routes');

const root = path.join(__dirname, './../dist');
const uploadDest = path.join(__dirname, './../uploads');

const production = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;

const app = express();

app.use(logger(production ? 'combined' : 'dev'));

const storage = multer.diskStorage({
  destination: uploadDest,
  filename: (req, file, cb) => {
    let ext = '';

    switch (file.mimetype) {
      case 'image/webp':
        ext = '.webp';
        break;

      case 'image/jpeg':
        ext = '.jpg';
        break;

      case 'image/png':
        ext = '.png';
        break;

      default:
      // no-op
    }

    cb(null, file.originalname + ext);
  },
});

const upload = multer({ storage: storage });

app.use(upload.single('image'));

app.use('/v1', v1);

if (production) {
  require('./server.prod')(app, root);
} else {
  require('./server.dev')(app, root);
}

const server = http.createServer(app);

server.listen(port, err => {
  if (err) console.log(err);

  console.log('Server running on port %s', port);
});
