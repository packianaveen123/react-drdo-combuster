import React, { Component } from 'react';
import { Layout, Menu, Switch } from 'antd';
import 'antd/dist/antd.css';

import '../../Styles/style.css';
import { BrowserRouter as Router, Route, Link, Switch as SW } from 'react-router-dom';

import TestConfig from './ConfigurationPage/TestConfig';
import TurboConfig from './ConfigurationPage/TurboConfig';
import ParamConfig from './ConfigurationPage/ParamConfig';
import DashboardConfig from './ConfigurationPage/DashboardConfig';
import RunningReport from './Reports/RunningReport';
import ExportData from './Reports/ExportData';
import TableElement from '../Components/TableElement';
import LoginPage from '../Components/Forms/LoginPage';
import MainComponent from './MainComponent';
import TestPage from './TestPage';
import GraphView from './DashboardPage/GraphView';
import TableView from './DashboardPage/TableView';
const { Content } = Layout;

class NavigationComponent extends Component {

  render() {
    // console.log(this.props.sensorData)
    return (
      <Router>
        <Layout >
            <MainComponent/>
            <div className="content-part">
              <Content
                className="site-layout-background"
                style={{
                  margin: '24px 16px',
                  padding: 10,
                  minHeight: 280,
                }}>

                <SW>
                  <Route exact path='/TestConfig' component={TestConfig}></Route>
                  <Route exact path='/ParamConfig' component={ParamConfig}></Route>
                  <Route exact path='/TurboConfig' component={TurboConfig}></Route>
                  <Route exact path='/DashboardConfig' component={DashboardConfig}></Route>
                  <Route exact path='/TestPage' component={TestPage}></Route>
                  <Route exact path='/TableElement' component={TableElement}></Route>   
                  <Route exact path='/GraphView' component={GraphView}></Route>  
                  <Route exact path='/TableView' component={TableView}></Route>           
                  <Route exact path='/ExportData' component={ExportData}></Route>
                  <Route exact path='/RunningReport' component={RunningReport}></Route>             
                  <Route exact path='/LoginPage' component={LoginPage}></Route>
                </SW>
              </Content>
            </div>          
          </Layout>  
      </Router>
    )
  }
}


export default NavigationComponent;
