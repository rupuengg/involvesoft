import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import Paper from 'material-ui/Paper'
import Header from '../../Global/Header/component/Header.js'
import Login from '../../Auth/component/Login.js'
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
 * Layout for the system dashboard. Contains Header and main display area.
 */
class CoreLayout extends Component {

  static propTypes = {
    navbarShown: PropTypes.bool.isRequired
  }
  /**
    * React lifecycle method
  */
  /*shouldComponentUpdate (nextProps) {
    console.log('CoreLayout')
    if(!nextProps.auth.loggedIn){
      browserHistory.replace('/')
  
       return false
      }
      return true
  
   }*/
  render () {
    const { navbarShown } = this.props
    return (
      <div id='il-spa' >
        <Paper zDepth={2}>
          <Header title='Involvesoft' />
        </Paper>
          {this.props.children}
      </div>
    )
  }

}

export default connect(
  mapStateToProps, {...authActions}
)(CoreLayout)
