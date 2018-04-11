//React Import
import React, { Component } from 'react';

//CSS import
import './App.css';

import { Route, Switch, withRouter } from 'react-router-dom';

import AuthLayout from './containers/auth/AuthLayout';
import HomePage from './containers/HomePage';
import ProtectedRouteHOC from './containers/hoc/ProtectedRoute';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>

        <Switch>
          <Route exact path="/auth" component={AuthLayout} />
          <Route exact path="/" component={ProtectedRouteHOC(HomePage)} />
        </Switch>

      </div>
    );
  }
}

export default withRouter(App);
