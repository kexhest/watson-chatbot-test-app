/*
 * This file is part of the Watson Chatbot Test App.
 */

import {
  CLEAR_ERROR,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
} from 'actions/messages';

const initialState = {
  error: null,
  context: {},
  tones: [],
  data: [],
};

/**
 * This is the upload reducer. It listens for actions and updates the upload object.
 *
 * @author Magnus Bergman <magnus@apt.no>
 */
export default function(state = initialState, { type, payload }) {
  switch (type) {
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case SEND_MESSAGE_REQUEST:
      return {
        ...state,
        error: null,
        data: [...state.data, payload.message],
      };

    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        context: {
          ...state.context,
          ...payload.context,
        },
        tones: payload.tones || [],
        data: [...state.data, payload.data],
      };

    case SEND_MESSAGE_FAILURE:
      return {
        ...state,
        error: payload.error,
        data: state.data.map(message => {
          if (message.id === payload.id) {
            return {
              ...message,
              failed: true,
            };
          }

          return message;
        }),
      };

    default:
      return state;
  }
}
