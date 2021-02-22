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

        case 'UPDATE_TEST_CONFIG':
            newState.testConfig = action.data
            return newState

        case 'UPDATE_TURBINE_CONFIG':
            newState.turbineConfig = action.data
            return newState

        case 'UPDATE_PARAM_CONFIG':
            newState.paramConfig = action.data
            return newState


        default:
            return newState
    }
}

export default appReducer