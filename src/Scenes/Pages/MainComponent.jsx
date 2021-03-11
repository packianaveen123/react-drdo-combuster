import React, { Component } from 'react';
import { Layout} from 'antd';

import TurboConfig from './ConfigurationPage/TurboConfig';
import DashboardConfig from './ConfigurationPage/DashboardConfig';
import FooterElement from '../Components/footer/FooterElement';
import HeaderComponent from '../Components/Header/HeaderComponent';
import TitleElement from '../Components/TitleElement';
import LeftbarComponent from '../Components/LeftbarComponent';
import TestPage from './TestPage';
import GraphView from '../Pages/DashboardPage/GraphView';
import TableView from './DashboardPage/TableView';
import RunningReport from './Reports/RunningReport';

const { Content,Header, Footer } = Layout;

class MainComponent extends Component {
 constructor(props){ super(props)}
  render() {
    return (
      <Layout>
        <Header style={{ paddingLeft: '0', paddingRight: '0' }}><HeaderComponent /></Header>
        <Layout>
          <LeftbarComponent />
          <Content>
            <TitleElement />
            <DashboardConfig />
          </Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    )
  }
}
export default MainComponent;
