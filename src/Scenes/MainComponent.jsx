import React, { Component } from 'react';
import { Layout, Menu, Switch } from 'antd';
import 'antd/dist/antd.css';
import '../Styles/style.css';
import { BrowserRouter as Router, Route, Link, Switch as SW } from 'react-router-dom';

import TestConfig from './ConfigurationPage/TestConfig';
import TurbineConfig from './ConfigurationPage/TurbineConfig';
import ParamConfig from './ConfigurationPage/ParamConfig';
import DashboardConfig from './ConfigurationPage/DashboardConfig';
import RunningReport from './Components/Reports/RunningReport';
import ExportData from './Components/Reports/ExportData';
import TableElement from './Components/TableElement';
import LoginPage from '../Scenes/Components/Login/LoginPage';
import SiderElement from './Components/Sider/SiderElement';
const { Content } = Layout;

class MainComponent extends Component {

  render() {
    console.log(this.props.sensorData)
    return (
      <Router>
        <Layout >
            <SiderElement/>
            <div className="content-part">
              <Content
                className="site-layout-background"
                style={{
                  margin: '24px 16px',
                  padding: 10,
                  minHeight: 280,
                }}>

                <SW>
                  <Route exact path='/testconfig' component={TestConfig}></Route>
                  <Route exact path='/paramconfig' component={ParamConfig}></Route>
                  <Route exact path='/turbineconfig' component={TurbineConfig}></Route>
                  <Route exact path='/dashboardconfig' component={DashboardConfig}></Route>
                  <Route exact path='/tableelement' component={TableElement}></Route>                 
                  <Route exact path='/exportdata' component={ExportData}></Route>
                  <Route exact path='/runningreport' component={RunningReport}></Route>             
                  <Route exact path='/logout' component={LoginPage}></Route>
                </SW>
              </Content>
            </div>          
          </Layout>  
      </Router>
    )
  }
}
const LogoValue = () => (
  <div className="testlogo" >
    <text style={{ color: '#42dad6', fontSize: "20px" }}>ENERTEK</text>
    <text style={{ color: '#8a8d93', fontSize: "20px" }}>COMBUSTER</text>
  </div>
)

export default MainComponent;
