import React, { Component } from 'react';
import { Layout} from 'antd';

import TestConfig from './ConfigurationPage/TestConfig';
import FooterElement from '../Components/footer/FooterElement';
import HeaderComponent from '../Components/HeaderComponent';
import TitleComponent from '../Components/TitleComponent';
import LeftbarComponent from '../Components/LeftbarComponent';

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
            <TitleComponent />
            <TestConfig />
          </Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    )
  }
}


export default MainComponent;
