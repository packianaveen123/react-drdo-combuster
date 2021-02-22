import React, { Component } from 'react';

import NavigationComponent from './Scenes/Pages/NavigationComponent';
import LoginPage from './Scenes/Components/Login/LoginPage';
import RegisterPage from './Scenes/Components/Register/RegisterPage';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavigationComponent />
        {/* <LoginPage /> */}
        {/* <RegisterPage /> */}
      </div>
    )
  }
}
