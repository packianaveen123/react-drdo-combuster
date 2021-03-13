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
      newState.paramConfiguration =  action.payload ? action.payload : []
      return newState

    case 'UPDATE_TRANSFER_ELEMENT':
      newState.transferElement = action.payload
      return newState
    case 'UPDATE_COLOR_BAR':
      newState.colorBar = action.payload
      return newState
    case 'UPDATE_CURRENT_PAGE':
      newState.currentPage = action.payload ? action.payload : []
      return newState
    default:
      return newState
  }
}


export default appReducer