import { Record } from 'immutable'
import { post } from '../../utils/httpRequest'
// ------------------------------------
// Constants
// ------------------------------------
export const CREATE_READY_STATUS = 'CREATE_READY'
export const FETCHED_IN_STATUS = 'FETCHED_IN'
export const FETCHING_IN_STATUS = 'FETCHING_IN'
export const GENERIC_ERROR_STATUS = 'GENERIC_ERROR'
export const FETCH_INITIAL_STATUS = 'FETCH_INITIAL'
export const WRONG_CREDS_STATUS = 'WRONG_CREDS'

// -----------------------------
// actions
// ------------------------------

const FETCHING_IN = 'fetch/FETCHING_IN'
const FETCHED_IN = 'fetch/FETCHED_IN'
const FETCH_GENERIC_ERROR = 'fetch/GENERIC_ERROR'
const FETCH_INITIAL = 'fetch/FETCH_INITIAL'
const WRONG_CREDS = 'fetch/WRONG_CREDS'

// ------------------------------------
// Action creators
// ------------------------------------

const fetchingIn = () => ({
  type: FETCHING_IN
})

const fetchedIn = ( payload ) => ({
  type: FETCHED_IN,
  payload
})

const error = () => ({
  type: FETCH_GENERIC_ERROR
})

const wrongCreds = () => ({
  type: WRONG_CREDS
})

const initialStatus = () => ({
  type: FETCH_INITIAL
})

const fetchAllCommunities = (user_id, baseUrl) => {
  var form = {

  "user_id": user_id
}

  return (dispatch) => {
    dispatch(fetchingIn())
    const url = 'http://ec2-18-219-4-0.us-east-2.compute.amazonaws.com:8888/myCommunities'
    post(url,form,{},true)
    .then(response => (response.json()))
      .then(payload => {
         dispatch(fetchedIn(payload))
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

export const fetchActions = {
  fetchAllCommunities,
  clear
}

// ------------------------------------
// Reducer
// ------------------------------------


const initialState = {
  fetchedIn : false,
  status: null,
  payload : null
}

const actionHandlers = {
  [FETCHING_IN]: (state) => Object.assign({},state,{'status':FETCHING_IN_STATUS}),

  [FETCHED_IN]: (state, { payload }) => {
    return Object.assign({},state,{
      fetchedIn : true,
      status: FETCHED_IN_STATUS,
      payload
    })
  }

  /*[WRONG_CREDS]: (state) => state.set('status', WRONG_CREDS_STATUS),

  [FETCH_GENERIC_ERROR]: (state) => state.set('status', GENERIC_ERROR_STATUS),

  [FETCH_INITIAL]: (state) => state.set('status', FETCH_INITIAL_STATUS)*/

}

/** @private */
export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
