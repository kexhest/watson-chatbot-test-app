// @flow
/*
 * This file is part of the Watson Chatbot Test App.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import styles from './app.scss';

import Mic from './mic.svg';

import {
  sendMessage as sendMessageAction,
  clearError as clearErrorAction,
} from '../../actions/messages';

/**
 * Declare Message type for flow.
 */
type Message = {
  id: string,
  sender: string,
  text: string,
  failed: boolean,
};

/**
 * Declare Tone type for flow.
 */
type Tone = {
  tone_id: string,
  tone_name: string,
  score: number,
};

/**
 * Declare SpeechRecognition type for flow.
 */
type SpeechRecognition = {
  start: Function,
  stop: Function,
  continuous: boolean,
  lang: string,
  onresult: Function,
  onend: Function,
};

/**
 * Declare SpeechSynthesisUtterance type for flow.
 */
type SpeechSynthesisUtterance = {
  voice: Object,
  volume: number,
  rate: number,
  pitch: number,
  text: string,
};

/**
 * Declare Props type for flow.
 */
type Props = {
  location: Object,
  error: Object,
  context: Object,
  tones: Array<Tone>,
  messages: Array<Message>,
  sendMessage: Function,
  clearError: Function,
};

/**
 * Declare State type for flow.
 */
type State = {
  value: string,
  listening: boolean,
};

const synth = window.speechSynthesis;

/**
 * This is the App component.
 *
 * @author Magnus Bergman <magnus@apt.no>
 */
export class App extends Component {
  props: Props;
  state: State;
  recognition: SpeechRecognition;
  speech: SpeechSynthesisUtterance;

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
    tones: [],
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

    this.speech = new window.SpeechSynthesisUtterance();
    this.recognition = new window.webkitSpeechRecognition();

    this.state = {
      listening: false,
      value: '',
    };
  }

  /**
   * React lifecycle method that is triggered when the component has been mounted.
   */
  componentDidMount() {
    this.recognition.onresult = event => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          this.setState(() => ({ value: event.results[i][0].transcript }));
        }
      }
    };

    this.recognition.onend = () => {
      this.setState({ listening: false });
      this.sendMessage();
    };

    const initialMessage =
      this.props.messages.length === 1 && this.props.messages[0];

    if (initialMessage) {
      setTimeout(() => {
        this.speech.voice = synth
          .getVoices()
          .find(voice => voice.lang === 'nb-NO');
        this.speech.volume = 1;
        this.speech.rate = 1;
        this.speech.pitch = 1;
        this.speech.text = initialMessage.text;

        synth.speak(this.speech);
      }, 1000);
    }
  }

  /**
   * React lifecycle method that is triggered when the component will receive new props.
   *
   * @param {Object} props
   */
  componentWillReceiveProps({ messages }: Props) {
    const latestMessage = messages.length > 0
      ? messages[messages.length - 1]
      : {};

    if (
      messages.length !== this.props.messages.length &&
      latestMessage.sender === 'bot' &&
      latestMessage.text
    ) {
      this.speech.voice = synth
        .getVoices()
        .find(voice => voice.lang === 'nb-NO');
      this.speech.volume = 1;
      this.speech.rate = 1;
      this.speech.pitch = 1;
      this.speech.text = latestMessage.text;

      synth.speak(this.speech);
    }
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
  sendMessage = (event?: SyntheticEvent) => {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }

    const { context, sendMessage } = this.props;
    const { value } = this.state;

    if (!value.trim()) {
      return;
    }

    sendMessage({ id: Date.now(), sender: 'me', context, text: value });

    this.setState({ value: '' });
  };

  /**
   * Eventhandler for button to start capturing audio.
   *
   * @param {SyntheticEvent} event
   */
  captureAudio = (event: SyntheticEvent) => {
    event.preventDefault();

    const { listening } = this.state;

    if (listening) {
      this.setState({ listening: false });
      this.recognition.stop();
      return;
    }

    this.setState({ listening: true });

    this.recognition.continuous = true;
    this.recognition.lang = 'nb-NO';
    this.recognition.start();
  };

  /**
   * Render App.
   *
   * @return {JSX}
   */
  render() {
    const { error, tones, context, messages } = this.props;
    const { value, listening } = this.state;

    return (
      <main className={styles.main}>
        <div className={styles.controls}>
          <ul>
            {Object.keys(context)
              .filter(key => context[key] === true || context[key] === false)
              .map(key =>
                <li
                  key={key}
                  className={classNames(styles.onOff, {
                    [styles.on]: context[key],
                  })}
                >
                  {key}
                </li>
              )}
          </ul>
          <ul>
            {tones.map(({ tone_id, tone_name, score }: Tone) =>
              <li key={tone_id}>
                {tone_name}: {Math.round(score * 100)}
              </li>
            )}
          </ul>
        </div>
        <div className={styles.chatBox}>
          <ul>
            {messages &&
              messages.map(({ id, sender, text, failed }: Message) =>
                <li
                  key={id}
                  className={classNames({
                    [styles.userMessage]: sender === 'me',
                    [styles.failed]: failed === true,
                  })}
                >
                  {text}
                </li>
              )}
          </ul>
          <form onSubmit={this.sendMessage} className={styles.input}>
            <button onClick={this.captureAudio}>
              <Mic
                className={classNames(styles.mic, {
                  [styles.listening]: listening,
                })}
              />
            </button>
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
