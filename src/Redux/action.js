export const updateUserParameter = userParams => ({
  type: 'UPDATE_USER_PARAMETER',
  payload: userParams
})

export const toggleLeftBar = bool => ({
  type: 'TOGGLE_LEFTBAR_VIEW',
  payload: bool
})
export const updateChartData = data => ({
  type: 'UPDATE_CHART_DATA',
  payload: data
})
export const updateTestConfig = data => ({
  type: 'UPDATE_TEST_CONFIG',
  payload: data
})
export const updateTurboConfig = data => ({
  type: 'UPDATE_TURBO_CONFIG',
  payload: data
})
export const updateParamConfig = data => ({
  type: 'UPDATE_PARAM_CONFIG',
  payload: data
})
export const updateTransferElement = data => ({
  type: 'UPDATE_TRANSFER_ELEMENT',
  payload: data
})
export const updateColorBar = data => ({
  type: 'UPDATE_COLOR_BAR',
  payload: data
})
export const updateTestingPage = data => ({
  type: 'UPDATE_TESTING_PAGE',
  payload: data
})
export const navigateMainPage = data => ({
  type: 'NAVIGATE_MAIN_PAGE',
  payload: data
})
export const updateTitleElements = data => ({
  type: 'UPDATE_TITLE_ELEMENTS',
  payload: data
})
// editRowIndex
export const updateEditRowIndex = data => ({
  type: 'UPDATE_EDIT_ROWINDEX',
  payload: data
})
// inputData
export const updateInputData = data => ({
  type: 'UPDATE_INPUT_DATA',
  payload: data
})
// EditMode
export const initiateEditMode = bool => ({
  type: 'EDITMODE_INITIATED',
  payload: bool
})
// testConfigTableEdit
export const testConfigTableEdit = data => ({
  type: 'UPDATE_TEST_CONFIG_TABLEEDIT',
  payload: data
})



// shutdownInitiated
export const initiateShutdown = bool => ({
  type: 'SHUTDOWN_INITIATED',
  payload: bool
})
// showReset
export const initiateShowReset = bool => ({
  type: 'SHOW_RESET_INITIATED',
  payload: bool
})
// communicationfailed
export const initiateCommunicationFailed = bool => ({
  type: 'COMMUNICATION_FAILED_INITIATED',
  payload: bool
})
// communication
export const initiateCommunication = bool => ({
  type: 'COMMUNICATION_INITIATED',
  payload: bool
})
// targetState
export const initiateTargetState = bool => ({
  type: 'TARGET_STATE_INITIATED',
  payload: bool
})
// showTarget
export const initiateShowTarget = bool => ({
  type: 'SHOW_TARGET_INITIATED',
  payload: bool
})
// turboStart
export const initiateTurboStart = bool => ({
  type: 'TURBO_START_INITIATED',
  payload: bool
})
// gasOpend
export const initiateGasOpened = bool => ({
  type: 'GAS_OPEN_INITIATED',
  payload: bool
})
// stageOne
export const initiateStageOne = bool => ({
  type: 'STAGE_ONE_INITIATED',
  payload: bool
})
// fuelOpened
export const initiateFuelOpened = bool => ({
  type: 'FUEL_OPENED_INITIATED',
  payload: bool
})
// stageTwo
export const initiateStageTwo = bool => ({
  type: 'STAGE_TWO_INITIATED',
  payload: bool
})
// gasClosed
export const initiateGasClosed = bool => ({
  type: 'GAS_CLOSED',
  payload: bool
})
// stageThree
export const initiateStageThree = bool => ({
  type: 'STAGE_THREE_INITIATED',
  payload: bool
})
// currentDateTime
export const getCurrentDateTime = data => ({
  type: 'CURRENT_DATE_TIME',
  payload: data
})
// targetRPM
export const getTargetRPM = data => ({
  type: 'TARGET_RPM',
  payload: data
})
//targetTemp
export const getTargetTemp = data => ({
  type: 'TARGET_TEMP',
  payload: data
})
// resetTemp
export const getResetTemp = data => ({
  type: 'RESET_TEMP',
  payload: data
})
// resetRPM
export const getResetRPM = data => ({
  type: 'RESET_RPM',
  payload: data
})