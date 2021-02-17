import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch as SW } from 'react-router-dom';

import Demo from './Demo';
import Demotwo from './Demotwo';
import HeaderElement from './Components/Header/HeaderElement';
import FooterElement from './Components/footer/FooterElement';
import TestConfig from './ConfigurationPage/TestConfig';
import TurbineConfig from './ConfigurationPage/TurbineConfig';
import ParamConfig from './ConfigurationPage/ParamConfig';
import DashboardConfig from './ConfigurationPage/DashboardConfig';
import TransferComponent from './Components/TransferComponent';
import RunningReport from './Components/Reports/RunningReport';
import ExportData from './Components/Reports/ExportData';
import TableElement from './Components/TableElement';
import LoginPage from '../Scenes/Components/Login/LoginPage';
const { Header, Sider, Content } = Layout;
export default class Navigation extends Component {
    render() {
        return (
            <div>
                <div className="content-part">
              <Content
                className="site-layout-background"
                style={{
                  margin: '24px 16px',
                  padding: 10,
                  minHeight: 280,
                }}>

                <SW>
                  <Route exact path='/dashboard' component={Demotwo}></Route>
                  <Route exact path='/runningreport4' component={TestConfig}></Route>
                  <Route exact path='/runningreport5' component={ParamConfig}></Route>
                  <Route exact path='/runningreport6' component={TurbineConfig}></Route>
                  <Route exact path='/runningreport7' component={DashboardConfig}></Route>
                  <Route exact path='/runningreport10' component={TransferComponent}></Route>
                  <Route exact path='/runningreport' component={RunningReport}></Route>
                  <Route exact path='/exportdata' component={ExportData}></Route>
                  <Route exact path='/exportdata' component={ExportData}></Route>
                  <Route exact path='/tableelement' component={TableElement}></Route>
                  <Route exact path='/logout' component={LoginPage}></Route>
                </SW>
              </Content>
            </div>
            </div>
        )
    }
}
