'use strict';

const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const config = require('./');

const toneAnalyzer = new ToneAnalyzerV3({
  url: config.get('TONE_ANALYZER_URL'),
  username: config.get('TONE_ANALYZER_USERNAME'),
  password: config.get('TONE_ANALYZER_PASSWORD'),
  version_date: '2016-05-19',
});

module.exports = toneAnalyzer;
