import React, { Component } from 'react';
import MainComponent from './Scenes/Pages/MainComponent'
import 'antd/dist/antd.css';
import '../src/Styles/style.css';

export default class App extends Component {
  render() {
    return (

      <div className="site-layout-background">
        <MainComponent />
      </div>
    )
  }
}
