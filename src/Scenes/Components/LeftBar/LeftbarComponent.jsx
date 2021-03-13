import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch as SW } from 'react-router-dom';
import {
  DashboardOutlined, FolderOutlined,
  LineChartOutlined, ToolOutlined,
} from '@ant-design/icons';
import { GiPaperWindmill } from "react-icons/gi";
import { DiYii } from "react-icons/di";
import { FiSettings, FiSliders, FiActivity } from "react-icons/fi";
import { AiOutlineTable, AiFillDatabase } from "react-icons/ai";

const { SubMenu } = Menu;
const { Sider } = Layout;
class LeftbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed_view: false,
      showMainViewSideBarText: true,
      showReportsSideBarText: true
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      showMainViewSideBarText: this.state.showMainViewSideBarText ? false : true,
      showReportsSideBarText: this.state.showReportsSideBarText ? false : true
    });
  };
  render() {
    // const {collapsed_view} = this.props.app;
    console.log(this.props.leftBarView.leftBarView)
    return (
      <Sider trigger={null} collapsible collapsed={this.props.leftBarView.leftBarView}>
        <Menu theme="dark" defaultSelectedKeys={['3']} mode="inline" >
          <SubMenu key="sub1" icon={<DashboardOutlined />} title="Dashboard" style={{ fontSize: '15px' }} >
            <Menu.Item key="1" icon={<LineChartOutlined style={{ color: '#42dbdc' }} />}> <Link to="/GraphView" style={{ textDecoration: 'none', color: '#666873', fontSize: '15px' }}> Graph View </Link></Menu.Item>
            <Menu.Item key="2" icon={<AiOutlineTable style={{ color: '#42dbdc' }} />}> <Link to="/TableView" style={{ textDecoration: 'none', color: '#666873', fontSize: '15px' }}> Table View </Link></Menu.Item>
          </SubMenu>
          <Menu.Item key="3" icon={<DashboardOutlined />} >
            <text style={{ marginBottom: '10px' }}>
              <Link to="/TestPage" class="test-input" style={{ textDecoration: 'none', color: '#adaeb8', fontSize: '18px' }}> Test </Link>
            </text>
          </Menu.Item>
          <SubMenu key="sub2" icon={<ToolOutlined />} title="Configuration" style={{ fontSize: '15px' }}  >
            <Menu.Item key="4" icon={<GiPaperWindmill style={{ color: '#42dbdc' }} />}> <Link to="/TurboConfig" style={{ textDecoration: 'none', color: '#666873', fontSize: '15px' }}> Turbo Config </Link></Menu.Item>
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
    )
  }
}

const mapStateToProps = state => ({
  leftBarView: state.app
  // user: state.app
})

const mapDispatchToProps = {}

const leftBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftbarComponent)

export default leftBar;
