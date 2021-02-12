import React, { Component } from 'react';
import { Layout, Menu, Switch } from 'antd';
import 'antd/dist/antd.css';
import '../Styles/style.css';
import {
  MenuUnfoldOutlined,MenuFoldOutlined,
  DashboardOutlined,LogoutOutlined,
  FolderOutlined,LineChartOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { GiPaperWindmill } from "react-icons/gi";
import { DiYii } from "react-icons/di"
import { FiSettings, FiImage, FiSliders, FiActivity } from "react-icons/fi";
import { AiOutlineTable, AiFillDatabase } from "react-icons/ai";

import { BrowserRouter as Router, Route, Link, Switch as SW } from 'react-router-dom';

import Demo from './Demo';
import Demotwo from './Demotwo';
import TestConfig from './ConfigurationPage/TestConfig';
import TurbineConfig from './ConfigurationPage/TurbineConfig';
import ParamConfig from './ConfigurationPage/ParamConfig';
import DashboardConfig from './ConfigurationPage/DashboardConfig';
import TransferComponent from './Components/TransferComponent';
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

            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >

              <SubMenu key="sub1" icon={<DashboardOutlined />} title="Dashboard"  >
                <Menu.Item key="3" icon={<LineChartOutlined style={{ color: '#42dbdc' }} />}> <Link to="/runningreport1" style={{ textDecoration: 'none', color: '#fff' }}> Graph View </Link></Menu.Item>
                <Menu.Item key="4" icon={<AiOutlineTable style={{ color: '#42dbdc' }} />}> <Link to="/runningreport2" style={{ textDecoration: 'none', color: '#fff' }}> Table View </Link></Menu.Item>
                <Menu.Item key="5" icon={<FiImage style={{ color: '#42dbdc' }} />}> <Link to="/runningreport3" style={{ textDecoration: 'none', color: '#fff' }}> Image View </Link></Menu.Item>
              </SubMenu>

              <Menu.Item key="2" icon={<DashboardOutlined />} >
                <text style={{ marginBottom: '10px' }}>
                  <Link to="/dashboard" style={{ textDecoration: 'none', color: 'rgb(151, 150, 151)', fontSize: '15px' }}> Test </Link>
                </text>
              </Menu.Item>

              <SubMenu key="sub2" icon={<ToolOutlined />} title="Configuration"  >
                <Menu.Item key="3" icon={<DiYii style={{ color: '#42dbdc' }} />}> <Link to="/runningreport3" style={{ textDecoration: 'none', color: '#fff' }}> Test Config </Link></Menu.Item>
                <Menu.Item key="4" icon={<FiSliders style={{ color: '#42dbdc' }} />}> <Link to="/runningreport4" style={{ textDecoration: 'none', color: '#fff' }}> Param Config </Link></Menu.Item>
                <Menu.Item key="5" icon={<GiPaperWindmill style={{ color: '#42dbdc' }} />}> <Link to="/runningreport5" style={{ textDecoration: 'none', color: '#fff' }}> Turbine Config </Link></Menu.Item>
                <Menu.Item key="6" icon={<FiSettings style={{ color: '#42dbdc' }} />}> <Link to="/runningreport6" style={{ textDecoration: 'none', color: '#fff' }}> Dashboard Config </Link></Menu.Item>
              </SubMenu>

              <SubMenu key="sub3" icon={<FolderOutlined />} title="Report"  >
                <Menu.Item key="3" icon={<FiActivity style={{ color: '#42dbdc' }} />}> <Link to="/runningreport1" style={{ textDecoration: 'none', color: '#fff' }}> Running </Link></Menu.Item>
                <Menu.Item key="4" icon={<AiFillDatabase style={{ color: '#42dbdc' }} />}> <Link to="/runningreport2" style={{ textDecoration: 'none', color: '#fff' }}>  Export Data </Link></Menu.Item>
              </SubMenu>

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
                  padding: 10,
                  minHeight: 280,
                }}>

                <SW>
                  <Route exact path='/dashboard' component={Demotwo}></Route>
                  <Route exact path='/runningreport3' component={TestConfig}></Route>
                  <Route exact path='/runningreport4' component={ParamConfig}></Route>
                  <Route exact path='/runningreport5' component={TurbineConfig}></Route>
                  <Route exact path='/runningreport6' component={DashboardConfig}></Route>
                  <Route exact path='/runningreport10' component={TransferComponent}></Route>
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
