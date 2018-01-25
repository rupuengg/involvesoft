// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_MESSAGE = 'SICKPlatform/UPDATE_MESSAGE'

// ------------------------------------
// Actions
// ------------------------------------
const snackUpdated = (payload) => ({ payload, type: UPDATE_MESSAGE })
let snackId = 0

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const updateSnack = (snackData) => {
  snackData.id = ++snackId
  return (dispatch) => {
    dispatch(snackUpdated(snackData))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
let initialState = {
  id: snackId,
  action: '',
  message: '',
  onActionTouchTap: null
}

export default function snackbarReducer (state = initialState, action) {
  if (action.type !== UPDATE_MESSAGE) return state

  return action.payload
}

