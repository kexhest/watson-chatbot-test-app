// @flow
/*
 * This file is part of the Watson Chatbot Test App.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import styles from './app.scss';

import {
  sendMessage as sendMessageAction,
  clearError as clearErrorAction,
} from '../../actions/messages';

/**
 * Declare Props type for flow.
 */
type Props = {
  location: Object,
  error: Object,
  context: Object,
  tones: Object,
  messages: Array,
  sendMessage: Function,
  clearError: Function,
};

/**
 * Declare State type for flow.
 */
type State = {
  value: string,
};

/**
 * This is the App component.
 *
 * @author Magnus Bergman <magnus@apt.no>
 */
export class App extends Component {
  props: Props;
  state: State;

  /**
   * Declare default props.
   *
   * @type {object}
   */
  static defaultProps = {
    match: {},
    location: {},
    error: {},
    context: {},
    tones: {},
    messages: [],
    sendMessage: () => {},
    clearError: () => {},
  };

  /**
   * Create App.
   *
   * @param {object} props
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  /**
   * Clear error event handler.
   */
  onClearError = () => {
    const { clearError } = this.props;

    clearError();
  };

  /**
   * Update state when input field value changes.
   */
  onInputChange = ({ target }: SyntheticInputEvent) => {
    const { value } = target;

    this.setState({ value });
  };

  /**
   * Submit message to the server.
   *
   * @param {object} event
   */
  sendMessage = (event: SyntheticEvent) => {
    event.preventDefault();

    const { context, sendMessage } = this.props;
    const { value } = this.state;

    if (!value.trim()) {
      return;
    }

    sendMessage({ id: Date.now(), sender: 'me', context, text: value });

    this.setState({ value: '' });
  };

  /**
   * Render App.
   *
   * @return {JSX}
   */
  render() {
    const { error, tones, context, messages } = this.props;
    const { value } = this.state;

    return (
      <main className={styles.main}>
        <div className={styles.controls}>
          <ul>
            {Object.keys(context)
              .filter(key => context[key] === 'on' || context[key] === 'off')
              .map(key =>
                <li
                  key={key}
                  className={classNames(styles.onOff, {
                    [styles.on]: context[key] === 'on',
                  })}
                >
                  {key.replace('onoff', '')}
                </li>
              )}
          </ul>
          <ul>
            {Object.keys(tones).map(key =>
              <li key={tones[key].tone_id}>
                {tones[key].tone_name}: {Math.round(tones[key].score * 100)}
              </li>
            )}
          </ul>
        </div>
        <div className={styles.chatBox}>
          <ul>
            {messages &&
              messages.map(message =>
                <li
                  key={message.id}
                  className={classNames({
                    [styles.userMessage]: message.sender === 'me',
                    [styles.failed]: message.failed === true,
                  })}
                >
                  {message.text}
                </li>
              )}
          </ul>
          <form onSubmit={this.sendMessage} className={styles.input}>
            <input type="text" value={value} onChange={this.onInputChange} />
            <button type="submit">Send</button>
          </form>
        </div>
        {error &&
          <div className={styles.error}>
            {typeof error === 'object' &&
              Object.keys(error).length > 0 &&
              Object.keys(error).map(key => <p key={key}>{error[key]}</p>)}
            <button onClick={this.onClearError}>Ok.</button>
          </div>}
      </main>
    );
  }
}

/**
 * Connect the react component to redux by using the connect composer.
 * This binds the redux state and actions to the component props.
 */
export default connect(
  ({ messages: { data, context, tones, error } }) => ({
    messages: data,
    context,
    tones,
    error,
  }),
  {
    sendMessage: sendMessageAction,
    clearError: clearErrorAction,
  }
)(App);
