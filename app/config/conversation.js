'use strict';

const Conversation = require('watson-developer-cloud/conversation/v1');
const config = require('./');

const conversation = new Conversation({
  url: config.get('CONVERSATION_URL'),
  username: config.get('CONVERSATION_USERNAME'),
  password: config.get('CONVERSATION_PASSWORD'),
  version_date: Conversation.VERSION_DATE_2017_04_21,
});

module.exports = conversation;
