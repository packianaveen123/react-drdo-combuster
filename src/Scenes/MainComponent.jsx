import React, { Component } from 'react';
import { Layout, Menu, Switch } from 'antd';
import 'antd/dist/antd.css';
import '../Styles/style.css';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  LogoutOutlined,
  FolderOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { BrowserRouter as Router, Route, Link, Switch as SW } from 'react-router-dom';

import Demo from './Demo';
import Demotwo from './Demotwo';
import TestConfig from './ConfigurationPage/TestConfig';
import TurbineConfig from './ConfigurationPage/TurbineConfig';
import ParamConfig from './ConfigurationPage/ParamConfig';
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
class MainComponent extends Component {
  state = {
    collapsed: false,
    showCompanyName: true,
    showMainViewSideBarText: true,
    showReportsSideBarText: true
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      showCompanyName: this.state.showCompanyName ? false : true,
      showMainViewSideBarText: this.state.showMainViewSideBarText ? false : true,
      showReportsSideBarText: this.state.showReportsSideBarText ? false : true
    });
  };

  render() {
    console.log(this.props.sensorData)
    return (
      <Router>
        <Layout >

          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo">
              {/* <img src="" alt="Logo" style={{ width: '50px', height: '40px', marginTop: '6px', marginLeft: '15px' }} /> */}
              {this.state.showCompanyName ? <LogoValue /> : null}
            </div>

            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item className="dashboard-icon" key="1" icon={<DashboardOutlined />}>
                <text style={{ marginTop: '10px' }}>
                  <Link to="/dashboard" style={{ textDecoration: 'none', color: '#fff' }}>Dashboard</Link>
                </text>
              </Menu.Item>
              <Menu.Item key="2" icon={<DashboardOutlined />}>
                <text style={{ marginBottom: '10px' }}>
                  <Link to="/dashboard" style={{ textDecoration: 'none', color: '#fff' }}> Test </Link>
                </text>
              </Menu.Item>

              <SubMenu key="sub1" icon={<UserOutlined />} title="Configuration">
                <Menu.Item key="3"> <Link to="/runningreport1" style={{ textDecoration: 'none', color: '#fff' }}> Test Configuration </Link></Menu.Item>
                <Menu.Item key="4"> <Link to="/runningreport2" style={{ textDecoration: 'none', color: '#fff' }}> Param Configuration </Link></Menu.Item>
                <Menu.Item key="5"> <Link to="/runningreport3" style={{ textDecoration: 'none', color: '#fff' }}> Turbine Configuration </Link></Menu.Item>
              </SubMenu>

              <Menu.Item key="6" icon={<FolderOutlined />}>
                <text style={{ marginBottom: '10px' }}>
                  <Link to="/runningreport3" style={{ textDecoration: 'none', color: '#fff' }}> Report </Link>
                </text>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: this.toggle,
              })}
              <div class="logout-element">
                <a id="logout" href="#" class="nav-link">
                  <span class="logout-content">
                    <Link to="/logout">Logout <LogoutOutlined /></Link>
                    {/* <div style={{float:'right', marginTop:'6px'}}><PoweroffOutlined /></div>  */}
                  </span>
                </a>
                <div className="welcome-message">
                  <text>Welcome Admin</text>
                </div>
              </div>
            </Header>
            <div className="content-part">
              <Content
                className="site-layout-background"
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 280,
                }}>

                <SW>
                  <Route exact path='/dashboard' component={Demotwo}></Route>
                  <Route exact path='/runningreport1' component={TestConfig}></Route>
                  <Route exact path='/runningreport2' component={ParamConfig}></Route>
                  <Route exact path='/runningreport3' component={TurbineConfig}></Route>
                  <Route exact path='/logout' component={Demo}></Route>
                </SW>
              </Content>
            </div>

          </Layout>
        </Layout>
      </Router>
    )
  }
}
const LogoValue = () => (
  <div className="testlogo" >
    <text style={{ color: '#42dad6', fontSize: "15px" }}>ENERTEK</text>
    <text style={{ color: '#8a8d93', fontSize: "15px" }}>COMBUSTER</text>
  </div>
)

export default MainComponent;
