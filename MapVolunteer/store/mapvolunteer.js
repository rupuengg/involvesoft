import { Record } from 'immutable'
import { post } from '../../utils/httpRequest'
import { getUserSettings } from '../../userSetting'
// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_READY_STATUS = 'LOGIN_READY'
export const VOLUNTEERS_LOADED_STATUS = 'VOLUNTEERS_LOADED'
export const ADDED_VOLUNTEERS_LOADED_STATUS = 'ADDED_VOLUNTEERS_LOADED'
export const VOLUNTEERS_ADDED_STATUS = 'VOLUNTEERS_ADDED'
export const LOGGED_OUT_STATUS = 'LOGGED_OUT'
export const VOLUNTEERS_LOADING_STATUS = 'VOLUNTEERS_LOADING'
export const GENERIC_ERROR_STATUS = 'GENERIC_ERROR'
export const LOGIN_INITIAL_STATUS = 'LOGIN_INITIAL'
export const WRONG_CREDS_STATUS = 'WRONG_CREDS'

// -----------------------------
// actions
// ------------------------------

const VOLUNTEERS_LOADING = 'map/VOLUNTEERS_LOADING'
const VOLUNTEERS_LOADED = 'map/VOLUNTEERS_LOADED'
const ADDED_VOLUNTEERS_LOADED = 'map/ADDED_VOLUNTEERS_LOADED'
const VOLUNTEERS_ADDED = 'map/VOLUNTEERS_ADDED'
const LOGGED_OUT = 'auth/LOGGED_OUT'
const LOGIN_GENERIC_ERROR = 'map/GENERIC_ERROR'
const LOGIN_INITIAL = 'map/LOGIN_INITIAL'
const WRONG_CREDS = 'map/WRONG_CREDS'

// ------------------------------------
// Action creators
// ------------------------------------

const volunteersLoading = () => ({
  type: VOLUNTEERS_LOADING
})

const volunteersLoaded = (payload,communityId) => ({
  type: VOLUNTEERS_LOADED,
  payload,
  communityId
})

const addedVolunteersLoaded = (addedVolunteersId,communityId) => ({
  type: ADDED_VOLUNTEERS_LOADED,
  addedVolunteersId,
  communityId
})

const volunteersAdded = () => ({
  type: VOLUNTEERS_ADDED
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

const fetchvolunteers = (user_id, communityId) => {
  var form = {
  "user_id": user_id
}

  return (dispatch) => {
    dispatch(volunteersLoading())
    const url = 'http://ec2-18-219-4-0.us-east-2.compute.amazonaws.com:8888/volunteers'
    post(url,form,{},true)
    .then(response => (response.json()))
      .then(payload => {
        dispatch(volunteersLoaded(payload.result,communityId))

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

const fetchAddedVolunteers = (community_id) => {
  var form = {community_id}

  return (dispatch) => {
    dispatch(volunteersLoading())
    const url = 'http://ec2-18-219-4-0.us-east-2.compute.amazonaws.com:8888/communityVolunteers'
    post(url,form,{},true)
    .then(response => (response.json()))
      .then(payload => {
        dispatch(addedVolunteersLoaded(payload.result))
      }, (payload, status) => {
      })
      .catch(err => {
        console.log(err)
      })
  }
}

const addVolunteers = ({community_id,user_id}) => {
  var form = {"community_id":community_id,"user_id": user_id}

  return (dispatch) => {
    const url = 'http://ec2-18-219-4-0.us-east-2.compute.amazonaws.com:8888/mapToCommunity'
    post(url,form,{},true)
    .then(response => (response.json()))
      .then(payload => {
        dispatch(volunteersAdded())
      }, (payload, status) => {
      })
      .catch(err => {
        console.log(err)
      })
  }
}


const clear = () => {
  return initialStatus()
}

export const fetchVolunteersActions = {
  fetchvolunteers,
  fetchAddedVolunteers,
  addVolunteers,
  clear
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetchedIn : false,
  status: null,
  payload : null,
  communityId : null
}

const transformResponseToState = (payload,addedVolunteersId) => {
  let transformedPayload = payload ? Object.assign({},payload):null
  Object.keys(payload).forEach((key) => {
    transformedPayload[key] = {
      id : key,
      name : payload[key],
      addedToCommunity : false
    }
  })

  addedVolunteersId && addedVolunteersId.forEach((id)=>{
    transformedPayload[id].addedToCommunity = true
  })

  return transformedPayload
}

const actionHandlers = {
  [VOLUNTEERS_LOADING]: (state) => Object.assign({},state,{'status':VOLUNTEERS_LOADING}),

  [VOLUNTEERS_LOADED]: (state, { payload,communityId }) => {
    //fetchAddedVolunteers(communityId)
    return Object.assign({},state,{
      volunteersLoaded : true,
      status: VOLUNTEERS_LOADED_STATUS,
      list : transformResponseToState(payload),
      communityId
    })
  },

  [ADDED_VOLUNTEERS_LOADED]: (state, { addedVolunteersId }) => {
    return Object.assign({},state,{
      volunteersLoaded : true,
      status: ADDED_VOLUNTEERS_LOADED_STATUS,
      list : transformResponseToState(state.payload,addedVolunteersId)
    })
  },

  [VOLUNTEERS_ADDED]: (state) => {
    return Object.assign({},state,{
      status: VOLUNTEERS_ADDED_STATUS
    })
  }

  /*[WRONG_CREDS]: (state) => state.set('status', WRONG_CREDS_STATUS),

  [FETCH_GENERIC_ERROR]: (state) => state.set('status', GENERIC_ERROR_STATUS),
http://ec2-18-219-4-0.us-east-2.compute.amazonaws.com:8888/volunteers
  [FETCH_INITIAL]: (state) => state.set('status', FETCH_INITIAL_STATUS)*/

}

/** @private */
export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
