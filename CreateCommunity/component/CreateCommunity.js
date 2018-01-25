import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import theme from '../../theme'
import { getStyles } from '../style/style.js'

import { getAuthenticationURL } from '../../utils/httpRequest'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { updateSnack } from '../../snackbar'
import {
  createActions,
  CREATED_IN_STATUS,
  WRONG_CREDS_STATUS,
  GENERIC_ERROR_STATUS
} from '../store/createCommunity'
import {
  authActions,
  LOGGED_IN_STATUS
} from '../../Auth/store/auth'
  /*
  * @Function Mapping component state to props.
  * @param {Object} state
  * @returns {Object} containing props
  */
const mapStateToProps = (state, ownProps) => ({
  comm: state.create,
  auth: state.authentication
})

  /**
    * Login Component
    *
  */
class CreateCommunity extends Component {
  /**
    *Validation for props (Static propTypes)
    * @static
    * @type {object} validators
      {
        PropTypes styles object,
        PropTypes primaryHeader string,
      }
  */
  static propTypes = {
    styles: PropTypes.object,
    primaryHeader: PropTypes.string
  }

  /**
    * default prop values.
  */
  static defaultProps = {
    primaryHeader: 'Create Community'

  }
  /**
    * creates a instance of Login.
    * @param {object} props
  */
  constructor (props, context) {
    super(props, context)

    this.state = {
      name: '',
      community: 'pub',
      user_id: ''
    }
    
  }
  /**
    *On click of Enter key
  */
  _handleEnterKey = (e) => {
    if (e.key === 'Enter' && this._checkSignInEnabled()) {
      this._create()
    }
  }
  /**
    *Checking SignIn enabled
  */
  _checkSignInEnabled () {
    const { name } = this.state
    // const { auth } = this.props
    return name.length // && auth.status !== LOGGING_IN_STATUS
  }

  /**
    *Setting Username value
  */
  _setName = (e) => {
    this.setState({
      name: e.target.value.trim()
    })
  }

  /**
    *Authenticating user through API
  */
  _create = () => {
     const { name, community } = this.state
     this.props.createcommunity(name, community,this.props.auth.user_id, getAuthenticationURL())
  }
  _onChange = (e, selected) => {
      this.setState({
        community: selected
      })

  }
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
  /**
    * React lifecycle method
  */
  componentWillUpdate (nextProps) {
    if (nextProps.comm.status === CREATED_IN_STATUS) {
      var snack = {
        message: 'Community Created Successfully.'
      }
      this.props.updateSnack(snack)
       browserHistory.replace('/my-communities')

    }
  }
  /**
    * React lifecycle method :
    * Renders this component
    * @returns {ReactElement} - wrapped in div
  */
  render () {
    const styles = getStyles(this.props, theme)
    const { primaryHeader } = this.props
    const { name, community } = this.state
    const containerStyle = {
      ...styles.container,
      ...this.props.styles
    }
    return (
        <Paper style={styles.paperStyle} zDepth={3} rounded={false}>
          <div style={containerStyle}>
            <div style={styles.accountCreateTopWrapper} onKeyPress={this._handleEnterKey}>
              <div style={styles.header}>
                <h2 style={styles.headerHeadline}>{primaryHeader}</h2>
              </div>
              <TextField
                style={styles.textField}
                floatingLabelText='Name'
                value={name}
                onChange={this._setName}
              />
              <br /><br />
              <h4 style={{ textAlign:'left' }}>{'This community is'}</h4>
              <RadioButtonGroup ref='community' name='community'
                defaultSelected='pub' onChange={this._onChange} labelPostion='left'>
                <RadioButton
                  name='choice_1'
                  value='pub'
                  label='Public - Everyone is included and view this community'
                    />
                <RadioButton
                  name='choice_2'
                  value='priv'
                  label='Private - Only you and those included in this community can view this community'
                   />
              </RadioButtonGroup>
              <br />< br /><br />
              <div style={{textAlign:'center'}}>
              <RaisedButton backgroundColor={styles.raisedButton.backgroundColor}
                label='Create'
                disabled={!this._checkSignInEnabled()}
                onClick={this._create}
                disabledBackgroundColor={styles.raisedButton.disabledBackgroundColor}
              />
              </div>
            </div>
          </div>
        </Paper>)
  }
}
export default connect(mapStateToProps, {
  ...createActions, ...authActions,updateSnack })(CreateCommunity)
