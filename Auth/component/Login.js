import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import ErrorIcon from 'material-ui/svg-icons/action/report-problem'
import theme from '../../theme'
import { getStyles } from '../style/style.js'
import { browserHistory } from 'react-router'
import { updateUserSettings } from '../../userSetting.js'
import { getAuthenticationURL } from '../../utils/httpRequest'
import { connect } from 'react-redux'
import { updateSnack } from '../../snackbar'
import { changePanelContent } from '../../Global/NavPanel/store/navPanelStore.js'
import {
  authActions,
  LOGGED_IN_STATUS,
  LOGGED_OUT_STATUS,
  WRONG_CREDS_STATUS,
  GENERIC_ERROR_STATUS
} from '../store/auth'

/*
* @Function Mapping component state to props.
* @param {Object} state
* @returns {Object} containing props
*/
const mapStateToProps = (state, ownProps) => ({
  auth: state.authentication
})
  /**
    * Login Component
    *
  */
class Login extends Component {
  /**
    *Validation for props (Static propTypes)
    * @static
    * @type {object} validators
      {
        PropTypes styles object,
        PropTypes primaryHeader string,
        PropTypes auth object,
        PropTypes clear func,
        PropTypes login func,
        PropTypes onSuccess func,
      }
  */

  static propTypes = {
    styles: PropTypes.object,
    primaryHeader: PropTypes.string,
    auth: PropTypes.object,
    clear: PropTypes.func,
    login: PropTypes.func,
    onSuccess: PropTypes.func
  }

  /**
    * default prop values.
  */
  static defaultProps = {
    primaryHeader: 'LOGIN',
    onSuccess: () => { }

  }
  /**
    * creates a instance of Login.
    * @param {object} props
  */
  constructor (props, context) {
    super(props, context)

    this.state = {
      userId: '',
      password: ''
    }
  }
  /**
    *On click of Enter key
  */
  _handleEnterKey = (e) => {
    if (e.key === 'Enter' && this._checkSignInEnabled()) {
      this._login()
    }
  }
  /**
    *Checking SignIn enabled
  */
  _checkSignInEnabled () {
    const { userId, password } = this.state
    // const { auth } = this.props
    return userId.length && password.length// && auth.status !== LOGGING_IN_STATUS
  }
   /**
    *Get Error Text for Password field
  */
  _getPasswordErrorText (styles) {
    return (
      <p style={styles.passwordErrorText}>
        Username or password is incorrect.
        <ErrorIcon
          style={styles.passwordErrorIcon}
          color={styles.passwordErrorText.color}
        />
      </p>
    )
  }
  /**
    *Setting Username value
  */
  _setUsername = (e) => {
    this.setState({
      userId: e.target.value.trim()
    })
  }

  /**
    *Setting Password value
  */
  _setPassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }
  /**
    *Authenticating user through API
  */
  _login = () => {
    const { userId, password } = this.state
    this.props.login(userId, password, getAuthenticationURL())
  }
    /**
    * React lifecycle method :
    * setting state for rememberMe, username, token, password.
  */
  componentWillUpdate (nextProps) {
    if (nextProps.auth.status === GENERIC_ERROR_STATUS && this.state.password) {
    //  this.props.clear()
      this.setState({ password:'' })
    }
  }

  /**
    * React lifecycle method :
    * setting boolean value for onSuccess
  */
  componentDidUpdate (prevProps) {
    if (this.props.auth.status === LOGGED_IN_STATUS && (this.props.auth.status !== prevProps.auth.status)) {
       this.props.updateUserSettings(this.props.auth.toJS())
       var snack = {
         message: 'Login Successful.'
       }
       this.props.updateSnack(snack)
      this.props.onSuccess &&  this.props.onSuccess()
    }
  }

  /**
    * React lifecycle method :
    * Renders this component
    * @returns {ReactElement} - wrapped in div
  */
  render () {
    const styles = getStyles(this.props, theme)
    const { primaryHeader, auth } = this.props
    const { userId, password } = this.state
    const containerStyle = {
      ...styles.container,
      ...this.props.styles
    }
    return (
      <div>
        <Paper style={styles.paperStyle} zDepth={3} rounded={false}>
          <div style={containerStyle}>
            <div style={styles.loginTopWrapper} onKeyPress={this._handleEnterKey}>
              <div style={styles.header}>
                <h2 style={styles.headerHeadline}>{primaryHeader}</h2>
              </div>
              <TextField
                style={styles.textField}
                floatingLabelText='Username'
                value={userId}
                onChange={this._setUsername}
                underlineStyle={auth.status === WRONG_CREDS_STATUS ? styles.usernameTextFieldError : null}
              />
              <br /><br />
              <TextField
                style={styles.textField}
                floatingLabelText='Password'
                value={password}
                onChange={this._setPassword}
                type='password'
                errorText={auth.status === WRONG_CREDS_STATUS ? this._getPasswordErrorText(styles) : null}
              />
              <br />< br /><br />
              <div style={{textAlign:'center'}}>
              <RaisedButton backgroundColor={styles.raisedButton.backgroundColor}
                label='Log In'
                disabled={!this._checkSignInEnabled()}
                onClick={this._login}
                disabledBackgroundColor={styles.raisedButton.disabledBackgroundColor}
              />
              </div>
            </div>
          </div>
        </Paper>
      </div>)
  }
}
export default connect(mapStateToProps, {
  ...authActions, updateUserSettings, updateSnack, changePanelContent })(Login)
