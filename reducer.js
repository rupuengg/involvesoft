import { combineReducers } from 'redux'
import authentication from './Auth/store/auth'
import navigate from './Global/NavPanel/store/navPanelStore'
import uistate from './Layouts/store/uistate'
import create from './CreateCommunity/store/createCommunity'
import community from './MyCommunity/store/MyCommunity'
import settings from './userSetting'
import volunteers from './MapVolunteer/store/mapvolunteer'
import snackbar from './snackbar'
export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    authentication,
    uistate,
    navigate,
    create,
    community,
    settings,
    volunteers,
    snackbar,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
