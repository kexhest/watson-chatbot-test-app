// @flow
/*
 * This file is part of the Watson Chatbot Test App.
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import thunk from 'redux-thunk';

import api from './middleware/api';

import reducers from './reducers/reducers';

import App from './components/App/App';
import NotFound from './components/NotFound/NotFound';

const enhancer = compose(applyMiddleware(thunk, api));

const preloadedState = window.__PRELOADED_STATE__ || {};

const store = createStore(reducers, preloadedState, enhancer);

const rootEl = document.getElementById('root');

if (rootEl instanceof HTMLDivElement) {
  rootEl.innerHTML = '';
}

/**
 * Render Application.
 */
render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>,
  rootEl
);
