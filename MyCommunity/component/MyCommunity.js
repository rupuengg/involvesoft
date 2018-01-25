import React, {Component} from 'react';
import PropTypes from 'prop-types'
import theme from '../../theme'
import { getStyles } from '../style/style.js'
import MyCommunityDisplay from './MyCommunityDisplay.js'

import { getAuthenticationURL } from '../../utils/httpRequest'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'


import {
  fetchActions,
  FETCHED_IN_STATUS
} from '../../MyCommunity/store/MyCommunity'
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
  auth: state.authentication,
  community: state.community
})


class MyCommunity extends Component {

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
  componentWillMount () {
     if (this.props.auth.loggedIn) {
      this.props.fetchAllCommunities(this.props.auth.user_id,getAuthenticationURL())
    }
  }
   componentWillUpdate (nextProps) {
    if (this.props.auth.loggedIn) {

    }
   }

render() {
return (
  <div>

   {this.props.community.payload && this.props.community.payload.status
    && this.props.community.payload.result.map((community,index) => {
      const childrenProps = {
        id: community.community_id,
        name: community.community_name,
        creator: community.community_creator,
        createdDate: community.community_created_date,
        visibility: community.community_visibility,
        participants: community.community_volunteers

      }

   return <MyCommunityDisplay key={index} {...childrenProps} />

    })
  }
   </div>

)
}
}
export default connect(mapStateToProps, {
  ...fetchActions, ...authActions })(MyCommunity)
