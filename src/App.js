import React, { Component } from 'react';

import NavigationComponent from './Scenes/Pages/NavigationComponent';
import LoginPage from './Scenes/Components/Forms/LoginPage';
import RegisterPage from './Scenes/Components/Forms/RegisterPage';
import ForgotPassword from './Scenes/Components/Forms/ForgotPassword';
import Demo from '../src/Scenes/Demo';
import Testvb from './testvb';
import CardComponent from './Scenes/Components/ChartContainer/CardComponent'
import TableElement from './Scenes/Components/TableElement';
import ParamConfig from './Scenes/Pages/ConfigurationPage/ParamConfig';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavigationComponent />
        {/* <LoginPage />
        <RegisterPage />
        <ForgotPassword/> */}
        {/* <Demo/> */}
        {/* <Testvb /> */}
        {/* <CardComponent/> */}
        {/* <TableElement/> */}
        {/* <ParamConfig/> */}
      </div>
    )
  }
}
