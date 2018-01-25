import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { getStyles } from '../style/style.js'
import theme from '../../theme'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { updateSnack } from '../../snackbar'

import {
  fetchVolunteersActions,
  FETCHED_IN_STATUS,
  VOLUNTEERS_LOADED_STATUS,
  ADDED_VOLUNTEERS_LOADED_STATUS,
  VOLUNTEERS_ADDED_STATUS
} from '../store/mapvolunteer'
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
  volunteers: state.volunteers
})

class MapVolunteer extends Component {
  state = {
    selected: [],
    selectedVolunteers: []
  };

  isSelected = (index) => {
    return this.state.selectedVolunteers.indexOf(index) !== -1;
  }

  handleRowSelection = (selectedRows) => {
    const ids = Object.keys(this.props.volunteers.list)
    const selectedIds = selectedRows!=='all'? ((selectedRows !=='none')?selectedRows.map((row)=>ids[row]):[]) : ids
    this.setState({
      selectedVolunteers: selectedIds,
    selected: selectedRows})

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
  componentWillMount () {
     if (this.props.auth.loggedIn) {
      this.props.fetchvolunteers(this.props.auth.user_id,this.props.params.communityId)
    }
  }

   componentWillUpdate (nextProps) {
    if (nextProps.volunteers.status === VOLUNTEERS_LOADED_STATUS) {
      //this.props.fetchAddedVolunteers(this.props.params.communityId)
    }
    if (nextProps.volunteers.status === VOLUNTEERS_ADDED_STATUS) {
      var snack = {
         message: 'Volunteers added successfully.'
       }
       this.props.updateSnack(snack)
       this.props.fetchvolunteers(this.props.auth.user_id,this.props.params.communityId)
        browserHistory.replace('/my-communities')
    }
   }

   _add = () => {
     const user_id = this.state.selectedVolunteers
     const community_id = this.props.params.communityId
     this.props.addVolunteers({community_id,user_id})
     
   }

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  }

  render() {
     const styles = getStyles(this.props, theme)
    //this.props.volunteers.list ?  console.log('this.props.volunteers.payload.result',this.props.volunteers.list) : console.log('Data not fetched')
    return (
      <Paper  style={{margin: '5%',position: 'relative'}} zDepth={3} rounded={false}>
        {this.props.volunteers.list &&<div>
        <h4 style = {{textAlign:'center',borderBottom: '2px solid #cac8c8',padding:'18px'}}>{'Add participants to'+ ' ' + this.props.params.communityName}</h4>
      
        <Table multiSelectable onRowSelection={this.handleRowSelection}>
        <TableHeader enableSelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={true}
            deselectOnClickaway={false}>
          {
            Object.keys(this.props.volunteers.list).map((volunteer,index) => {
              return (
                <TableRow key={index} selected={this.isSelected(index)}>
                  <TableRowColumn>{this.props.volunteers.list[volunteer].name}</TableRowColumn>
                </TableRow>
              )
            })
          }
        </TableBody>
        </Table>
       </div> 
      }

      <div style={{textAlign:'center',padding: '10px'}}>
              <RaisedButton backgroundColor={styles.raisedButton.backgroundColor}
               label='Add'
                disabled={!Boolean(this.state.selected.length)}
                onClick={this._add}
                disabledBackgroundColor={styles.raisedButton.disabledBackgroundColor}
              />
              </div>
      </Paper>
    )
  }
}

export default connect(mapStateToProps, {
  ...fetchVolunteersActions, ...authActions, updateSnack })(MapVolunteer)


