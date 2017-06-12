// @flow
/*
 * This file is part of the Watson Chatbot Test App.
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './not-found.scss';

/**
 * This is the NotFound component.
 *
 * @author Magnus Bergman <magnus@apt.no>
 */
export default class NotFound extends Component {
  /**
   * Render NotFound.
   *
   * @return {Object}
   */
  render() {
    return (
      <article className={styles.main}>
        <header>
          <h1>404.</h1>
        </header>
        <p><Link to="/">Take me home.</Link></p>
      </article>
    );
  }
}
