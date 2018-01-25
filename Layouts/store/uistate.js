// ------------------------------------
// Constants
// ------------------------------------
export const NAVBAR_EXPAND_TOGGLED = 'INVOLVESOFTPlatform/NAVBAR_EXPAND_TOGGLED'
export const NAVBAR_SHOWN_TOGGLED = 'INVOLVESOFTPlatform/NAVBAR_SHOWN_TOGGLED'

const navbarExpandToggled = () => ({ type: NAVBAR_EXPAND_TOGGLED })
const navbarShownToggled = (payload) => ({ payload, type: NAVBAR_SHOWN_TOGGLED })

export const toggleNavbarExpand = () => {
  return (dispatch) => { dispatch(navbarExpandToggled()) }
}

export const toggleNavbarShown = (show) => {
  return (dispatch) => { dispatch(navbarShownToggled(show)) }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [NAVBAR_EXPAND_TOGGLED]: (state) => {
    let nextState = {
      ...state,
      navbarExpanded: !state.navbarExpanded
    }
    return nextState
  },
  [NAVBAR_SHOWN_TOGGLED]: (state, { payload }) => {
    let nextState = {
      ...state,
      navbarShown: payload
    }
    return nextState
  }
}

let initialState = {
  navbarExpanded: true,
  navbarShown: false
}
export default function uistateReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
