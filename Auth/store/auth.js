import { Record } from 'immutable'
import { post } from '../../utils/httpRequest'
import { getUserSettings } from '../../userSetting'
import { updateUserSettings } from '../../userSetting'

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_READY_STATUS = 'LOGIN_READY'
export const LOGGED_IN_STATUS = 'LOGGED_IN'
export const LOGGED_OUT_STATUS = 'LOGGED_OUT'
export const LOGGING_IN_STATUS = 'LOGGING_IN'
export const GENERIC_ERROR_STATUS = 'GENERIC_ERROR'
export const LOGIN_INITIAL_STATUS = 'LOGIN_INITIAL'
export const WRONG_CREDS_STATUS = 'WRONG_CREDS'

// -----------------------------
// actions
// ------------------------------

const LOGGING_IN = 'auth/LOGGING_IN'
const LOGGED_IN = 'auth/LOGGED_IN'
const LOGGED_OUT = 'auth/LOGGED_OUT'
const LOGIN_GENERIC_ERROR = 'auth/GENERIC_ERROR'
const LOGIN_INITIAL = 'auth/LOGIN_INITIAL'
const WRONG_CREDS = 'auth/WRONG_CREDS'

// ------------------------------------
// Action creators
// ------------------------------------

const loggingIn = () => ({
  type: LOGGING_IN
})

const loggedIn = (user_type,user_id,username,client_name) => ({
  type: LOGGED_IN,
  user_type,
  user_id,
  username,
  client_name
})

export const loggedOut = () => ({
  type: LOGGED_OUT
})

const error = () => ({
  type: LOGIN_GENERIC_ERROR
})

const wrongCreds = () => ({
  type: WRONG_CREDS
})

const initialStatus = () => ({
  type: LOGIN_INITIAL
})

const login = (username, password, baseUrl) => {
  var form = {
  "username": username,
  "password": password
}
  return (dispatch) => {
    dispatch(loggingIn())
    const url = 'http://ec2-18-219-4-0.us-east-2.compute.amazonaws.com:8888/login'
    post(url,form,{},true)
    .then(response => (response.json()))
      .then(payload => {
        dispatch(loggedIn(payload.result.user_type,payload.result.user_id,payload.result.username,payload.result.client_name))
      }, (payload, status) => {
       
        payload && payload.result.error === 'Invalid credentials'
        ? dispatch(wrongCreds())
        : dispatch(error())
      })
      .catch(err => {
        dispatch(error())
        console.log(err)
      })
  }
}

const logout = (baseUrl) => {
  return (dispatch) => {
    dispatch(loggedOut())
    /* const token = getState().authentication.token
    const url = baseUrl ? `${baseUrl}/api/v1/user/logout` : `/api/v1/user/logout`
    post(url, {}, { 'Authorization':`Bearer ${token}` })
      .then(response => (response.json()))
      .then(payload => {
        dispatch(removeLoader())
        dispatch(loggedOut(payload.access_token))
      }, (payload) => {
        payload && (payload.status === HTTP_STATUS_CODE_401) && dispatch(error()) && dispatch(removeLoader())
      })
      .catch(err => {
        dispatch(removeLoader())
        dispatch(error())
        console.log(err)
      }) */
  }
}

const clear = () => {
  //localStorage.clear();
  return initialStatus()
}

export const authActions = {
  login,
  clear
}

// ------------------------------------
// Reducer
// ------------------------------------
const settings = getUserSettings()

let Auth = new Record({
  loggedIn : false,
  status: null,
  user_type:null,
  user_id:null,
  username:null,
  client_name:null
})

Auth = Object.keys(settings.auth).length? new Record(settings.auth): Auth
const initialState = new Auth()

const actionHandlers = {
  [LOGGING_IN]: (state) => state.set('status', LOGGING_IN_STATUS),

  [LOGGED_IN]: (state, { user_type,user_id,username,client_name }) => {
    let nextState = state
    nextState = state.merge({
      loggedIn : true,
      status: LOGGED_IN_STATUS,
      user_type,
      user_id,
      username,
      client_name
    })
    return nextState
  },

  [LOGGED_OUT]: (state, { token }) => {
    return state.merge({
      loggedIn : false,
      status: LOGGED_OUT_STATUS,
      username:null
    })
  },

  [WRONG_CREDS]: (state) => state.set('status', WRONG_CREDS_STATUS),

  [LOGIN_GENERIC_ERROR]: (state) => state.set('status', GENERIC_ERROR_STATUS),

  [LOGIN_INITIAL]: (state) => initialState

}

/** @private */
export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
