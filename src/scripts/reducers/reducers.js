// @flow
/*
 * This file is part of the Watson Chatbot Test App.
 */

import { combineReducers } from 'redux';

import messages from './messages';

const rootReducer = combineReducers({
  messages,
});

export default rootReducer;
