import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './createStore'
import { browserHistory } from 'react-router'
import { updateLocation } from './location'

// main app
import App from './containers/App'

const store = createStore()

store.asyncReducers = {}

// To unsubscribe, invoke `store.unsubscribeHistory()` anytime
//store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('app')
let render = () => {
  const routes = require('./routes').default(store)

  ReactDOM.render(
    <App routes={routes} store={store} />,
    MOUNT_NODE
  )
}

render()
