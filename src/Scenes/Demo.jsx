import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

class Demo extends Component {
  state = {
    collapsed: false,
    showCompanyName: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      showCompanyName: this.state.showCompanyName ? false : true,
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          {/* <div className="logo">
            <h3 style={{color:'#42dad6'}}>ENERTEKCOMBUSTER</h3>
          </div> */}
          <div className="logo" >
              {this.state.showCompanyName ? <LogoValue  style={{color:'#42dad6'}}/> : null}
            </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
             Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              Test
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              Configuration
            </Menu.Item>
            <Menu.Item key="4" icon={<UploadOutlined />}>
             Reports
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 ,backgroundColor:'#131633' }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, 
            {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              backgroundColor:'#212840',
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}
  
const LogoValue = () => (
  <div className="testlogo" style={{color:'#42dad6',fontSize:"15px"}}>ENERTEKCOMBUSTER</div>
)


export default Demo
