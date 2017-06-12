// @flow
/*
 * This file is part of the Watson Chatbot Test App.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from './nav.scss';

type Props = {
  match: Object,
  sets: Object,
  set: string,
  active: boolean,
  toggle: Function,
};

/**
 * This is the Intro component.
 *
 * @author Magnus Bergman <magnus@apt.no>
 */
const Nav = ({ match, sets, set, active, toggle }: Props) =>
  <div className={styles.main}>
    <button className={styles.button} onClick={toggle}>
      {active ? 'Hide' : 'Show'} nav
    </button>
    <ul className={styles.list}>
      {Object.keys(sets).map(name =>
        <li key={name} className={classNames({ active: name === set })}>
          <Link to={`${match.url}?set=${name}`}>
            {name}
          </Link>
        </li>
      )}
    </ul>
  </div>;

Nav.defaultProps = {
  match: {},
  sets: {},
  set: '',
  active: true,
  toggle: () => {},
};

export default Nav;
