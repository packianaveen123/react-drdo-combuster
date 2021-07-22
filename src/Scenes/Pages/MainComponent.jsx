import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import TurboConfig from './ConfigurationPage/TurboConfig';
import DashboardConfig from './ConfigurationPage/DashboardConfig';
import FooterElement from '../Components/footer/FooterElement';
import HeaderComponent from '../Components/Header/HeaderComponent';
import TitleElement from '../Components/subComponents/TitleElement';
import LeftbarComponent from '../Components/LeftBar/LeftbarComponent';
import TestPage from './TestPage';
import GraphView from '../Pages/DashboardPage/GraphView';
import TableView from './DashboardPage/TableView';
import RunningReport from './Reports/RunningReport';
import TestConfig from './ConfigurationPage/TestConfig';
import ParamConfig from './ConfigurationPage/ParamConfig';
import ExportData from './Reports/ExportData';
import PerformanceReport from './Reports/PerformanceReport'
import EndurenceReport from './Reports/EndurenceReport'
import PerformanceAfterEndurence from './Reports/PerformanceAfterEndurence'
import {
  updateTurboConfig, updateTestConfigPage,
  updateParamConfig, updateChartData,
  updateUserParameter, updateTableStatusData,
  updateTestIdCount, updateTableViewData
} from '../../Redux/action';
import {
  getTurboConfigData, getTestConfigData,
  getParamConfigData, turbineConfigSubmit,
  requestStatusData, getHandleChangetestID,
  getTableView
} from '../../Services/requests';

const { Content, Header, Footer } = Layout;

export class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.stste = {
    }
  }

  componentDidMount() {
    // fetch turbo config data on application load
    getTurboConfigData((data) => {
      this.props.updateTurboConfig(data)
      console.log(data)
    })
    getTestConfigData((data) => {
      this.props.updateTestConfigPage(data)
    })
    getParamConfigData((data) => {
      this.props.updateParamConfig(data)
    })
    turbineConfigSubmit((data) => {
      this.props.updateTurboConfig(data)
      console.log(data)
    })
    requestStatusData((data) => {
      this.props.updateTableStatusData(data)
      console.log(data)
    })
    getHandleChangetestID((data) => {
      this.props.updateTestIdCount(data)
      console.log(data)
    })
    getTableView((data) => {
      this.props.updateTableViewData(data)
      console.log(data)
    })
  }

  render() {
    const appData = this.props.app;
    const { mainPage } = appData;
    console.log(this.props.app);
    return (
      <Layout>
        <Header style={{ paddingLeft: '10px', paddingRight: '0' }}><HeaderComponent /></Header>
        <Layout>
          <LeftbarComponent />
          <Content>
            <TitleElement />
            {mainPage === 'graphView' ? <GraphView /> : []}
            {mainPage === 'tableView' ? <TableView /> : []}
            {mainPage === 'turboConfig' ? <TurboConfig /> : []}
            {mainPage === 'dashboardConfig' ? <DashboardConfig /> : []}
            {mainPage === 'testConfig' ? <TestConfig /> : []}
            {mainPage === 'paramConfig' ? <ParamConfig /> : []}
            {mainPage === 'testPage' ? <TestPage /> : []}
            {mainPage === 'runningReport' ? <RunningReport /> : []}
            {mainPage === 'exportData' ? <ExportData /> : []}
            {mainPage === 'performanceReport' ? <PerformanceReport /> : []}
            {mainPage === 'endurenceReport' ? <EndurenceReport /> : []}
            {mainPage === 'performanceafterEndurence' ? <PerformanceAfterEndurence /> : []}
          </Content>
        </Layout>
        <Footer><FooterElement /></Footer>
      </Layout>
    )
  }
}
const mapStateToProps = state => ({
  app: state.app
})

const mapDispatchToProps = {
  updateTurboConfig,
  updateTestConfigPage,
  updateTableStatusData,
  updateParamConfig,
  updateChartData,
  updateUserParameter,
  updateTestIdCount, updateTableViewData
}

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent)
export default MainContainer;

