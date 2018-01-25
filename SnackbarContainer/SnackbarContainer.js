import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'

/*
* @Function Mapping component state to props.
* @param {Object} state
* @returns {Object} containing props
*/
const mapStateToProps = (state) => ({
  snack: state.snackbar || {}
})
 /**
  * SnackbarContainer Component
  *
*/

class SnackbarContainer extends React.Component {

  /**
    *Validation for props (Static propTypes)
    * @static
    * @type {object} validators
      {
        PropTypes snack object
      }
  */
  static propTypes = {
    snack: PropTypes.object.isRequired
  }

  /**
    * default prop values.
  */
  static defaultProps = {
    snack: {}
  }

  /**
    * creates a instance of InactivityContainer.
    * @param {object} props
  */
  constructor (props) {
    super(props)

    this.state = {
      open: false,
      snack: props.snack
    }
  }
  /**
    * React lifecycle method
  */
  componentWillReceiveProps (nextProps) {
    const { snack } = nextProps
    if (snack.id > this.state.snack.id) {
      this.setState({
        snack,
        open: true
      })
    }
  }
  /**
    * React lifecycle method :
    * Renders this component
    * @returns {ReactElement} - wrapped in div
  */
  render () {
    const { open, snack } = this.state

    const snackProps = {
      open,
      autoHideDuration: 1000,
      message: snack.message,
      bodyStyle: { height: 'auto', textAlign: 'center', lineHeight: '30px', padding: 10, whiteSpace: 'pre-line' }
    }

    if (snack.onActionTouchTap) {
      snackProps.action = snack.action
      snackProps.onActionTouchTap = snack.onActionTouchTap
    }

    return (
      <div>
        <Snackbar {...snackProps} />
      </div>
    )
  }

}

export default connect(mapStateToProps)(SnackbarContainer)
