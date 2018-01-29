import { Record } from 'immutable'

const AdminPanelContent = [
  { label:'Communities',
    route:'/communities',
    childContent:[{ label:'All Communities', route:'/all-communities' }, { label:'My Communities', route:'/my-communities' }, { label:'Create a Community', route:'/create-a-community' }]
  }]

const VolunteerPanelContent = [
  { label:'Communities',
    route:'/volunteer',
    childContent:[{ label:'All Communities', route:'/all-communities' }]
  }]



// -----------------------------
// actions
// ------------------------------

const CHANGE_ACTIVE_CONTENT = 'nav/CHANGE_ACTIVE_CONTENT'
const SET_PANEL_CONTENT = 'nav/SET_PANEL_CONTENT'

// ------------------------------------
// Action creators
// ------------------------------------

export const changeActiveContent = (activeId) => ({
  type: CHANGE_ACTIVE_CONTENT,
  activeId
})
export const setPanelContent = (userType) => ({
  type: SET_PANEL_CONTENT,
  userType
})


export const changeActiveId =(activeId) => {
	return (dispatch, getState) => {
		dispatch(changeActiveContent(activeId))}
}
export const changePanelContent = (userType) => {
  console.log('store', userType)
  return (dispatch, getState) => {
    dispatch(setPanelContent(userType))}
}
// ------------------------------------
// Reducer
// ------------------------------------

const Nav = new Record({
  activeId:0,
  panelContent: VolunteerPanelContent
})

const initialState = new Nav()

const actionHandlers = {
  [CHANGE_ACTIVE_CONTENT]: (state, {activeId}) => state.set('activeId', activeId),
  [SET_PANEL_CONTENT]: (state, {userType}) => {
    if (userType === 'Administrator') {
    return state.set(
        'panelContent', AdminPanelContent
      )
    } else {
    return state.set(
        'panelContent', VolunteerPanelContent
      )
    }

  }
}

/** @private */
export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
