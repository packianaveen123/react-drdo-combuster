import { dashboardData, titleElements } from '../Services/constants'
const InitialState = {
  mainPage: 'testPage',
  userParams: null,
  leftBarView: false,
  collapsed: true,
  chartData: [],
  testConfig: [],
  turboConfig: [],
  paramConfig: [],
  transferElement: [],
  testingPage: [],
  dashboardData: dashboardData,
  titleElements: titleElements,

  testDetails: false,
  testerValue: false,
  testValue: '',
  reset: false,

  appState: "login",

  showReset: false,
  shutdownInitiated: false,
  communicationFailed: false,
  communication: false,
  targetState: false,
  showTarget: false,
  turboStart: false,
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