import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Login from '../component/Login.js'
import {
  authActions,
  LOGGED_IN_STATUS,
  LOGGED_OUT_STATUS
} from '../store/auth'
import { changePanelContent } from '../../Global/NavPanel/store/navPanelStore.js'
import { browserHistory } from 'react-router'
/*
* @Function Mapping component state to props.
* @param {Object} state
* @returns {Object} containing props
*/
const mapStateToProps = (state, ownProps) => ({
  auth: state.authentication
})
 /**
    * AuthContainer Component
    *
  */
export class AuthContainer extends Component {


  constructor (props, context) {
    super(props, context)
    this.onSuccessLogin=this.onSuccessLogin.bind(this)

  }

  onSuccessLogin(){
    this.props.changePanelContent(this.props.auth.user_type)
    if(this.props.auth.user_type === 'Administrator'){
    browserHistory.replace('/all-communities')
  }
  else{
      browserHistory.replace('/volunteer-community')
    }

  }
 /**
    * React lifecycle method :
    * Renders this component
    * @returns {ReactElement} - wrapped in div
  */

  render () {
    return (<Login onSuccess={this.onSuccessLogin} />)
  }
}

export default connect(mapStateToProps, {
  ...authActions, changePanelContent })(AuthContainer)
