import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import { List, ListItem } from 'material-ui/List'
import { Link } from 'react-router'
import theme from '../../../theme'
import { getStyles } from '../style/style.js'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import {
  authActions,
  LOGGED_IN_STATUS
} from '../../../Auth/store/auth'

const mapStateToProps = (state, ownProps) => ({
  auth: state.authentication
})

class NavPanelContent extends Component {
  static propTypes = {
    styles: PropTypes.object,
    label: PropTypes.string,
    id: PropTypes.number,
    activeId: PropTypes.number,
    childContent: PropTypes.array,
    route: PropTypes.string,
    onClick: PropTypes.func
  }
  static defaultProps = {
    primaryHeader: 'LOGIN',
    childContent: []
  }
  constructor (props) {
    super(props)
    this.handleCellSelection = this.handleCellSelection.bind(this)
  }
  /**
    * React lifecycle method
  */

  handleCellSelection (e) {
    this.props.onClick(this.props.id)
  }

  render () {
    const styles = getStyles(this.props, theme)
    return (<div>
      <br />
      <Paper
        style={(this.props.activeId === this.props.id) ? styles.activePaperStyle : styles.inActivePaperStyle}
        zDepth={2} >
        <List>
          <ListItem primaryText={this.props.label}
            onClick={this.handleCellSelection}
            initiallyOpen
            disabled={true}
            autoGenerateNestedIndicator={true}
            rightIconButton={null}
            style={(this.props.activeId === this.props.id) ? styles.activeLabelStyle : styles.inActiveLabelStyle}
            containerElement={<Link to={this.props.route} />}
            nestedItems={(this.props.activeId === this.props.id) ? this.props.childContent.map(child =>
              <ListItem key={child.label}
                primaryText={child.label} style={styles.subMenuItemStyle}
                initiallyOpen
                containerElement={<Link to={child.route} style={styles.link} activeStyle={styles.activeLink} />} />
              ) : []
          } />
        </List>

      </Paper>
    </div>)
  }
}
export default connect(mapStateToProps, { ...authActions })(NavPanelContent)
