import InitialState from "./store"

const appReducer = (state = InitialState, action) => {
  const newState = {}
  Object.assign(newState, state)
  switch (action.type) {
    case 'UPDATE_USER_PARAMETER':
      newState.userParams = action.payload
      return newState
    case 'TOGGLE_LEFTBAR_VIEW':
      newState.leftBarView = !newState.leftBarView
      return newState
    case 'UPDATE_CHART_DATA':
      newState.chartData = action.payload ? action.payload : []
      return newState
    case 'UPDATE_TEST_CONFIG':
      newState.testConfig = action.payload ? action.payload : []
      return newState
    case 'UPDATE_TURBO_CONFIG':
      newState.turboConfig = action.payload ? action.payload : []
      return newState
    case 'UPDATE_PARAM_CONFIG':
      newState.paramConfig = action.payload ? action.payload : []
      return newState
    case 'UPDATE_PARAM_CONFIGURATION':
      newState.paramConfiguration = action.payload ? action.payload : []
      return newState
    case 'UPDATE_TRANSFER_ELEMENT':
      newState.transferElement = action.payload
      return newState
    case 'UPDATE_COLOR_BAR':
      newState.colorBar = action.payload
      return newState
    case 'UPDATE_TESTING_PAGE':
      newState.testingPage = action.payload ? action.payload : []
      return newState
    case 'NAVIGATE_MAIN_PAGE':
      newState.mainPage = action.payload ? action.payload : "dashboardConfig"
      return newState
    case 'UPDATE_TITLE_ELEMENTS':
      newState.titleElements = action.payload ? action.payload : []
      return newState
    case 'UPDATE_APP_STATE':
      newState.appState = action.payload ? action.payload : 'login'
      return newState

    case 'UPDATE_TABLE_DATA':
      newState.tableData = action.payload ? action.payload : []     //tableView
      return newState

    case 'UPDATE_LOGIN_EVENT':
      newState.IsLogin = action.payload ? action.payload : []            //loginEvent
      return newState

    case 'UPDATE_FORGOT_EVENT':
      newState.IsUserName = action.payload ? action.payload : []            //IsUserName forgot
      return newState





    case 'SHUTDOWN_INITIATED':
      newState.shutdownInitiated = true                             //shutdownInitiated
      return newState
    case 'SHOW_RESET_INITIATED':
      newState.showReset = true                                     //showReset
      return newState
    case 'COMMUNICATION_FAILED_INITIATED':
      newState.communicationFailed = true                            //communicationFailed
      return newState
    case 'COMMUNICATION_INITIATED':
      newState.communication = true                                   //communication
      return newState
    case 'TARGET_STATE_INITIATED':
      newState.targetState = true                                   //targetState
      return newState
    case 'SHOW_TARGET_INITIATED':
      newState.showTarget = true                                   //showTarget
      return newState
    case 'TURBO_START_INITIATED':
      newState.turboStart = action.payload ? action.payload : []
      return newState
    case 'GAS_OPEN_INITIATED':
      newState.gasOpend = true                                   //gasOpend
      return newState
    case 'STAGE_ONE_INITIATED':
      newState.stageOne = true                                   //stageOne
      return newState
    case 'FUEL_OPENED_INITIATED':
      newState.fuelOpened = true                                   //fuelOpened
      return newState
    case 'STAGE_TWO_INITIATED':
      newState.stageTwo = true                                   //stageTwo
      return newState
    case 'GAS_CLOSED':
      newState.gasClosed = true                                   //gasClosed
      return newState
    case 'STAGE_THREE_INITIATED':
      newState.stageThree = true
      newState.showReset = true                                  //stageThree
      return newState
    case 'CURRENT_DATE_TIME':
      newState.currentDateTime = action.payload                    //currentDateTime
      return newState
    case 'TARGET_RPM':
      newState.targetRPM = action.payload                           //targetRPM
      return newState
    case 'TARGET_TEMP':
      newState.targetTemp = action.payload                            //targetTemp
      return newState
    case 'RESET_TEMP':
      newState.resetTemp = action.payload                            //resetTemp
      return newState
    case 'RESET_RPM':
      newState.resetRPM = action.payload                             //resetRPM
      return newState

    case 'STOP_DB_INSERT':
      newState.stageThree = false                                       //fuelOpened
      newState.communication = false
      newState.showTarget = false
      newState.showReset = false
      newState.targetRPM = ''
      newState.targetTemp = ''
      newState.shutdownInitiated = false

      return newState

    case 'START_DB_INSERT':
      newState.stopDbInsert = false                                   //fuelOpened
      return newState


    default:
      return newState
  }
}


export default appReducer