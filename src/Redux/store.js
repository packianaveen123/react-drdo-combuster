import { dashboardDataVal, targetKeysVal, titleElements } from '../Services/constants'

const InitialState = {
  mainPage: 'testPage',
  appState: "login",
  userName: '',
  userParams: null,
  leftBarView: false,
  collapsed: true,
  titleElements: titleElements,
  testerData: [],
  witnessData: [],
  turboMode: '',
  IsLogin: false,
  IsUserName: [],

  // -- config page -- //
  testConfig: [],
  testConfigPage: [],
  turboConfig: [],
  paramConfig: [],
  dashboardData: dashboardDataVal,
  targetKeys: targetKeysVal,
  tableViewData: [],

  // -- test details -- //
  testingPage: [],
  testerValue: false,
  testValue: '',
  testIdValue: '',
  turboIdTestCount: '',
  stopDbInsert: false,
  tableEdit: [],
  testDropdown: 'sub1',

  // -- test page -- //
  statusData: '',
  reset: false,
  chartData: [],
  shutdownInitiated: false,
  communicationFailed: false,
  communication: false,
  targetState: false,
  showReset: false,
  showTarget: false,
  turboStart: [],
  gasOpend: false,
  stageOne: false,
  fuelOpened: false,
  stageTwo: false,
  gasClosed: false,
  stageThree: false,
  currentDateTime: '',
  targetRPM: '',
  targetTemp: '',
  resetTemp: '',
  resetRPM: '',
}
export default InitialState