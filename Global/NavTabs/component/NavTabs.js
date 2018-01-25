import React, { Component } from 'react'
import PropTypes from 'prop-types'
import theme from '../../../theme'
import { Link } from 'react-router'
import { getStyles } from '../style/style.js'

export default class NavTabs extends Component {
  static propTypes = {
    activeContent: PropTypes.object
  }
  static defaultProps = {
    activeContent: {}
  }

  render () {
    const styles = getStyles(this.props, theme)
    return (
      <div style={styles.navTabsStyle}>
        <div style={styles.navTabsContentStyle}>
          {this.props.activeContent.childContent && this.props.activeContent.childContent.map(child =>
            <div key={child.label}  style={{ float: 'left',width: '33%' }}>
              <Link to={child.route} style={styles.navTabsLink}
               activeStyle={styles.navTabsActiveLink} >
                {child.label}
              </Link>
            </div>
            )}
        </div>
    </div>
    )
  }
}
