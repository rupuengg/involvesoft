import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import InvolvesoftTheme from '../theme.js'
import Header from '../Global/Header/component/Header.js'
import { grey300 } from 'material-ui/styles/colors'
import CreateCommunity from '../CreateCommunity/component/CreateCommunity.js'
import MyCommunity from '../MyCommunity/component/MyCommunity.js'
import SnackbarContainer from '../SnackbarContainer'

const muiTheme = getMuiTheme(InvolvesoftTheme)

export default class App extends Component {
  /**
    *Validation for props (Static propTypes)
    * @static
    * @type {object} validators
      {
        PropTypes routes object,
        PropTypes store object,
      }
  */
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }
  /**
    * default prop values.
  */
  static defaultProps = {
    store: {}
  }
  /**
    * React lifecycle method :
    * Renders this component
    * @returns {ReactElement} - wrapped in Provider
  */
  render () {
    const { routes, store } = this.props
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <Router history={browserHistory} children={routes} />
            <SnackbarContainer />
          </div>
        </MuiThemeProvider>
      </Provider>)
  }
}
