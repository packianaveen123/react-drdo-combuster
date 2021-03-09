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

  