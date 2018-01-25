import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getStyles } from '../style/style.js'
import theme from '../../theme'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import NavTabs from '../../Global/NavTabs'
import {
  authActions,
  LOGGED_IN_STATUS
} from '../../Auth/store/auth'
const mapStateToProps = (state, ownProps) => ({
  nav: state.navigate,
    auth: state.authentication
})

class CommunityView extends Component {

	static propTypes = {
    children: PropTypes.object
    }
  shouldComponentUpdate (nextProps) {
    if(!nextProps.auth.loggedIn){
      browserHistory.replace('/')

       return false
      }
      return true

  }
	render () {
  const styles = getStyles(this.props, theme)
    return (
      <div style={{width:'80%', float:'left'}}>
        <div style={styles.headerStyle}>
        <h2>{this.props.nav.panelContent[this.props.nav.activeId].label}</h2>
        </div>
        <NavTabs activeContent={this.props.nav.panelContent[this.props.nav.activeId]} />
        {this.props.children}
      </div>
    )
  }
}

export default connect(mapStateToProps, {...authActions})(CommunityView)
