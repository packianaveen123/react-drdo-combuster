import React, { Component } from 'react';

import MainComponent from './Scenes/MainComponent';
import LoginPage from '../src/Scenes/Components/Login/LoginPage';

import RegisterPage from '../src/Scenes/Components/Register/RegisterPage';
export default class App extends Component {
  render() {
    return (
      <div>
        <MainComponent/>
        {/* <LoginPage/> */}
        {/* <RegisterPage/> */}
      </div>
    )
  }
}
