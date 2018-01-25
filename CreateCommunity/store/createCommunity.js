import { Record } from 'immutable'
import { post } from '../../utils/httpRequest'
// ------------------------------------
// Constants
// ------------------------------------
export const CREATE_READY_STATUS = 'CREATE_READY'
export const CREATED_IN_STATUS = 'CREATED_IN'
export const CREATING_IN_STATUS = 'CREATING_IN'
export const GENERIC_ERROR_STATUS = 'GENERIC_ERROR'
export const CREATE_INITIAL_STATUS = 'CREATE_INITIAL'
export const WRONG_CREDS_STATUS = 'WRONG_CREDS'

// -----------------------------
// actions
// ------------------------------

const CREATING_IN = 'create/CREATING_IN'
const CREATED_IN = 'create/CREATED_IN'
const CREATE_GENERIC_ERROR = 'create/GENERIC_ERROR'
const CREATE_INITIAL = 'create/CREATE_INITIAL'
const WRONG_CREDS = 'create/WRONG_CREDS'

// ------------------------------------
// Action creators
// ------------------------------------

const creatingIn = () => ({
  type: CREATING_IN
})

const createdIn = () => ({
  type: CREATED_IN
})

const error = () => ({
  type: CREATE_GENERIC_ERROR
})

const wrongCreds = () => ({
  type: WRONG_CREDS
})

const initialStatus = () => ({
  type: CREATE_INITIAL
})

const createcommunity = (name, visibility, user_id, baseUrl) => {
  var form = {
  "name": name,
  "visibility": visibility,
  "user_id": user_id
}

  console.log(form)
  return (dispatch) => {
    dispatch(creatingIn())
    const url = 'http://ec2-18-219-4-0.us-east-2.compute.amazonaws.com:8888/addCommunity'
    post(url,form,{},true)
    .then(response => (response.json()))
      .then(payload => {
        dispatch(createdIn())
      }, (payload, status) => {
        payload && payload.result.error === 'false'
        ? dispatch(wrongCreds())
        : dispatch(error())
      })
      .catch(err => {
        dispatch(error())
        console.log(err)
      })
  }
}

const clear = () => {
  return initialStatus()
}

export const createActions = {
  createcommunity,
  clear
}

// ------------------------------------
// Reducer
// ------------------------------------

const create = new Record({
  createdIn : false,
  status: null,
  name : null
})

const initialState = new create()

const actionHandlers = {
  [CREATING_IN]: (state) => state.set('status', CREATING_IN_STATUS),

  [CREATED_IN]: (state, { name }) => {
    let nextState = state
    nextState = state.merge({
      createdIn : true,
      status: CREATED_IN_STATUS,
      name
    })
    return nextState
  },

  [WRONG_CREDS]: (state) => state.set('status', WRONG_CREDS_STATUS),

  [CREATE_GENERIC_ERROR]: (state) => state.set('status', GENERIC_ERROR_STATUS),

  [CREATE_INITIAL]: (state) => state.set('status', CREATE_INITIAL_STATUS)

}

/** @private */
export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
