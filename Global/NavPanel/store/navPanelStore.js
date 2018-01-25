import { Record } from 'immutable'

export const PanelContent = [
  // { label:'Volunteer',
  //   route:'/volunteer',
  //   childContent:[{ label:'a', route:'' }, { label:'b', route:'' }, { label:'c', route:'' }]
  // },
  { label:'Communities',
    route:'/communities',
    childContent:[{ label:'All Communities', route:'/all-communities' }, { label:'My Communities', route:'/my-communities' }, { label:'Create a Community', route:'/create-a-community' }]
  }]

// -----------------------------
// actions
// ------------------------------

const CHANGE_ACTIVE_CONTENT = 'nav/CHANGE_ACTIVE_CONTENT'

// ------------------------------------
// Action creators
// ------------------------------------

export const changeActiveContent = (activeId) => ({
  type: CHANGE_ACTIVE_CONTENT,
  activeId
})

export const changeActiveId =(activeId) => {
	return (dispatch, getState) => {
		dispatch(changeActiveContent(activeId))}
}

// ------------------------------------
// Reducer
// ------------------------------------

const Nav = new Record({
  activeId:0,
  panelContent: PanelContent
})

const initialState = new Nav()

const actionHandlers = {
  [CHANGE_ACTIVE_CONTENT]: (state, {activeId}) => state.set('activeId', activeId)
}

/** @private */
export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
