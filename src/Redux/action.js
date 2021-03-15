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
  export const updateCurrentpage = data => ({
    type: 'UPDATE_CURRENT_PAGE',
    payload: data
  })
  export const updateColorBar = data => ({
    type: 'UPDATE_COLOR_BAR',
    payload: data
  })
  export const navigateMainPage = data => ({
    type: 'NAVIGATE_MAIN_PAGE',
    payload: data
  })
  