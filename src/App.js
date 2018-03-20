//React Import
import React, { Component } from 'react';

//CSS import
import './App.css';

import { withRouter } from 'react-router-dom';

import AuthLayout from './containers/auth/AuthLayout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <AuthLayout />
      </div>
    );
  }
}

export default withRouter(App);
