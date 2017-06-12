// @flow
/*
 * This file is part of the Watson Chatbot Test App.
 */

import { API } from '../middleware/api';

export const CLEAR_ERROR = 'CLEAR_ERROR';
export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

/**
 * Declare Message structure for flow.
 */
type Message = {
  id: string,
  sender: string,
  context: Object,
  text: string,
};

/**
 * Send message.
 *
 * @param  {Object} message
 * @param  {string} message.id
 * @param  {string} message.sender
 * @param  {string} message.context
 * @param  {string} message.text
 *
 * @return {Object}
 */
export const sendMessage = ({ id, sender, context, text }: Message) => ({
  [API]: {
    endpoint: '/message',
    method: 'POST',
    body: {
      message: {
        id,
        sender,
        context,
        text,
      },
    },
    types: [SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAILURE],
  },
});

/**
 * Clear error.
 *
 * @return {Object}
 */
export const clearError = () => ({
  type: CLEAR_ERROR,
});
