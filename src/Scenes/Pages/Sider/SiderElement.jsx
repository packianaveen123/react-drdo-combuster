import React, { Component } from 'react';
import { Layout, Menu, Switch } from 'antd';

import {
  MenuUnfoldOutlined, MenuFoldOutlined,
  DashboardOutlined, LogoutOutlined,
  FolderOutlined, LineChartOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { GiPaperWindmill } from "react-icons/gi";
import { DiYii } from "react-icons/di"
import { FiSettings, FiSliders, FiActivity } from "react-icons/fi";
import { AiOutlineTable, AiFillDatabase } from "react-icons/ai";

import { BrowserRouter as Router, Route, Link, Switch as SW } from 'react-router-dom';

import FooterElement from '../../Components/footer/FooterElement';

const { Header, Sider } = Layout;
const { SubMenu } = Menu;

class SiderElement extends Component {
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
    
        <Layout >

          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo">
              {/* <img src="" alt="Logo" style={{ width: '50px', height: '40px', marginTop: '6px', marginLeft: '15px' }} /> */}
              {this.state.showCompanyName ? <LogoValue /> : null}
            </div>

            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >
              <SubMenu key="sub1" icon={<DashboardOutlined />} title="Dashboard" style={{ fontSize: '15px' }} >
                <Menu.Item key="1" icon={<LineChartOutlined style={{ color: '#42dbdc' }} />}> <Link to="/graphview" style={{ textDecoration: 'none', color: '#666873', fontSize: '15px' }}> Graph View </Link></Menu.Item>
                <Menu.Item key="2" icon={<AiOutlineTable style={{ color: '#42dbdc' }} />}> <Link to="/TableElement" style={{ textDecoration: 'none', color: '#666873', fontSize: '15px' }}> Table View </Link></Menu.Item>
              </SubMenu>
              <Menu.Item key="10" icon={<DashboardOutlined />} >
                <text style={{ marginBottom: '10px' }}>
                  <Link to="/TestPage" class="test-input" style={{ textDecoration: 'none', color: '#adaeb8', fontSize: '18px' }}> Test </Link>
                </text>
              </Menu.Item>
              <SubMenu key="sub2" icon={<ToolOutlined />} title="Configuration" style={{ fontSize: '15px' }}  >
                <Menu.Item key="4" icon={<GiPaperWindmill style={{ color: '#42dbdc' }} />}> <Link to="/TurbineConfig" style={{ textDecoration: 'none', color: '#666873', fontSize: '15px' }}> Turbine Config </Link></Menu.Item>
                <Menu.Item key="5" icon={<FiSettings style={{ color: '#42dbdc' }} />}> <Link to="/DashboardConfig" style={{ textDecoration: 'none', color: '#666873', fontSize: '15px' }}> Dashboard Config </Link></Menu.Item>
                <Menu.Item key="6" icon={<FiSliders style={{ color: '#42dbdc' }} />}> <Link to="/ParamConfig" style={{ textDecoration: 'none', color: '#666873', fontSize: '15px' }}> Param Config </Link></Menu.Item>
                <Menu.Item key="7" icon={<DiYii style={{ color: '#42dbdc' }} />}> <Link to="/TestConfig" style={{ textDecoration: 'none', color: '#666873', fontSize: '15px' }}> Test Config </Link></Menu.Item>        
              </SubMenu>
              <SubMenu key="sub3" icon={<FolderOutlined />} title="Report" style={{ fontSize: '15px' }}  >
                <Menu.Item key="8" icon={<FiActivity style={{ color: '#42dbdc' }} />}> <Link to="/RunningReport" style={{ textDecoration: 'none', color: '#666873', fontSize: '15px' }}> Running </Link></Menu.Item>
                <Menu.Item key="9" icon={<AiFillDatabase style={{ color: '#42dbdc' }} />}> <Link to="/ExportData" style={{ textDecoration: 'none', color: '#666873', fontSize: '15px' }}>  Export Data </Link></Menu.Item>
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
                    <Link to="/LoginPage">Logout <LogoutOutlined /></Link>
                  </span>
                </a>
                <div className="welcome-message">
                  <text>Welcome Admin</text>
                </div>
              </div>
            </Header>



            
            {/* <FooterElement /> */}
          </Layout>
        </Layout>
     
    )
  }
}
const LogoValue = () => (
  <div className="testlogo" >
    <text style={{ color: '#42dad6', fontSize: "20px" }}>ENERTEK</text>
    <text style={{ color: '#8a8d93', fontSize: "20px" }}>COMBUSTER</text>
  </div>
)

export default SiderElement;
