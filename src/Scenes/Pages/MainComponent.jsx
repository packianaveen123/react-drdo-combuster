import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import TurboConfig from './ConfigurationPage/TurboConfig';
import DashboardConfig from './ConfigurationPage/DashboardConfig';
import FooterElement from '../Components/footer/FooterElement';
import HeaderComponent from '../Components/Header/HeaderComponent';
import TitleElement from '../Components/TitleElement';
import LeftbarComponent from '../Components/LeftBar/LeftbarComponent';
import TestPage from './TestPage';
import GraphView from '../Pages/DashboardPage/GraphView';
import TableView from './DashboardPage/TableView';
import RunningReport from './Reports/RunningReport';

const { Content, Header, Footer } = Layout;

export class MainComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeComponent: TestPage
    };
    //   this.hideComponent = this.hideComponent.bind(this);
  }
  // componentDidMount() {
  //   this.props.updateCurrentpage(DashboardConfig)
  // }

  render() {
    console.log(this.props.app.currentPage)
    console.log(this.state.activeComponent)
    return (
      <Layout>
        <Header style={{ paddingLeft: '0', paddingRight: '0' }}><HeaderComponent /></Header>
        <Layout>
          <LeftbarComponent />
          <Content>
            <TitleElement />
            <this.state.activeComponent />
            {/* <this.props.app.currentPage /> */}
          </Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    )
  }
}
const mapStateToProps = state => ({
  app: state.app
})

// const mapDispatchToProps = {
//   updateTurboConfig
// }

const MainContainer = connect(
  mapStateToProps,
  // mapDispatchToProps
)(MainComponent)
export default MainContainer;

