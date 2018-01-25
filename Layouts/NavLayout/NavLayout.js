import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import NavPanelContainer from '../../Global/NavPanel'
import {
  authActions,
  LOGGED_IN_STATUS
} from '../../Auth/store/auth'

const mapStateToProps = (state) => {
  return {
    navbarExpanded: state.uistate.navbarExpanded,
    navbarShown: state.uistate.navbarShown,
    auth: state.authentication
  }
}
/**
 * Layout for the system dashboard. Contains Left navigation and main display area.
 */
class NavLayout extends Component {

  /**
    * React lifecycle method
  */
 shouldComponentUpdate (nextProps) {
     if(!nextProps.auth.loggedIn){
      browserHistory.replace('/')
       return false
      }
      return true
  }

  static propTypes = {
    children: PropTypes.object
  }
  render () {

    return (
      <div >
        <NavPanelContainer />
        {this.props.children}
      </div>
    )
  }

}

export default connect(
  mapStateToProps, {...authActions}
)(NavLayout)
