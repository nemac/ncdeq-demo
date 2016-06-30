import React from 'react';
import App from '../components/App';
import MainComponent from '../components/MainComponent';

import { Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';

import { Provider } from 'react-redux';
import store, {history} from '../stores/RBRPStore';

var routes = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={MainComponent} />
      </Route>
    </Router>
  </Provider>
);

module.exports = routes;
