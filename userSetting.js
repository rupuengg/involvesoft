// This file is same as that in widgets ducks , it will listen to the same action UPDATE
// created in repo/store/userSettings so that any changes to localStorage can be listened
// and kept in sync with this file's state . From here the preferences updated
// in localStorage will be posted to backend.

// ------------------------------------
// Constants
// ------------------------------------
const UPDATE = 'UPDATE'
// const PREFERENCE_UPDATING = 'PREFERENCE_UPDATING'

export const cacheKeys = {
  AUTH_KEY : 'auth'
  
}

// ------------------------------------
// Functions: Action creators / Helpers / etc.
// ------------------------------------

const update = (settings, key) => ({ type:UPDATE, settings, key })

function save (key, settings) {
  localStorage.setItem(key, JSON.stringify(settings))
}

/** @private */
export function updateUserSettings (settings) {
  const updatedSettings = Object.assign({}, JSON.parse(localStorage.getItem(cacheKeys.AUTH_KEY)), settings)
  return update(updatedSettings, cacheKeys.AUTH_KEY)
}



/** @private
  * returns object same as localStorage
 */
export function getUserSettings () {
  return Object.keys(cacheKeys).reduce((obj, key) => {
    obj[cacheKeys[key]] = JSON.parse(localStorage.getItem(cacheKeys[key]) || '{}')
    return obj
  }, {})
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = { ...getUserSettings(), status:'' }

const actionHandlers = {
  [UPDATE]: (state, { settings, key }) => {
    const nextState = Object.assign({}, state, { [key]:settings })
    save(key, settings)
    return nextState
  }
}

/** @private */
export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
