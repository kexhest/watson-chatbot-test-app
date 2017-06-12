// @flow
/*
 * This file is part of the Watson Chatbot Test App.
 */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import api from './middleware/api';
import reducers from './reducers/reducers';

import App from './components/App/App';
import NotFound from './components/NotFound/NotFound';

const enhancer = compose(applyMiddleware(thunk, api, createLogger()));

const preloadedState = window.__PRELOADED_STATE__ || {};

// Create Redux store with initial state
const store = module.hot && module.hot.data && module.hot.data.store
  ? module.hot.data.store
  : createStore(reducers, preloadedState, enhancer);

const rootEl = document.getElementById('root');

const renderHot = Component => {
  render(
    <Provider store={store}>
      <AppContainer>
        <Router>
          <Switch>
            <Route exact path="/" component={Component} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </AppContainer>
    </Provider>,
    rootEl
  );
};

if (rootEl instanceof HTMLDivElement) {
  rootEl.innerHTML = '';
}

renderHot(App);

if (module.hot) {
  module.hot.accept(require('./components/App/App').default, () => {
    renderHot(App);
  });

  module.hot.dispose((data: Object) => {
    data.store = store;
  });
}
