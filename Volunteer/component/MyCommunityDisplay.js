import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {GridList, GridTile} from 'material-ui/GridList';
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import theme from '../../theme'
import { getStyles } from '../style/style.js'
import dummyImage from '../../Images/dummy1.png'
import IconButton from 'material-ui/IconButton'
import RemoveRedEyeIcon from 'material-ui/svg-icons/image/remove-red-eye'
import Visibility from 'material-ui/svg-icons/action/visibility'
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off'
import { browserHistory } from 'react-router'

const imageStyles = {
root: {
display: 'flex',
flexWrap: 'wrap',
justifyContent: 'left',
padding:'1%',
},
gridList: {
display: 'flex',
flexWrap: 'nowrap',
overflowX: 'auto',
},
titleStyle: {
color: 'rgb(0, 188, 212)',
},
}

const tilesData = [
{
img: dummyImage
}

];

export default class MyCommunityDisplay extends Component {

static propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
	creator: PropTypes.string,
	createdDate: PropTypes.string,
	participants: PropTypes.number,
	visibility: PropTypes.string,
	opportunities: PropTypes.string,
	data: PropTypes.string,
	userType: PropTypes.string
}

static defaultProps = {
createdDate: '',
creator: '',
participants: '',
visibility: false,
name: '',
opportunities: '',
data:'',
userType:''


}
 uploadVolunteer = () =>{
 	browserHistory.replace(`/map-volunteer/${this.props.id}/${this.props.name}`)
 }


render() {
	let flag, visibilityIcon, visibilitStatus
	const {name, creator, createdDate, participants, visibility, opportunities, data,userType} = this.props
	const styles = getStyles(this.props, theme)
	if(userType == 'Administrator') {

	visibilitStatus = visibility == 'pub' ? 'Public' : 'Private'
	flag = visibility == 'pub' ? 'none' : 'block'
	visibilityIcon = visibility == 'pub' ? <Visibility />: <VisibilityOff />
	} else{
	visibilitStatus = null
	flag  = 'none'
	 visibilityIcon = null
	}
return (
<Paper style={{margin: '5%',position: 'relative'}} zDepth={3} rounded={false}>
<div style={imageStyles.root}>
<div style={{ width: '25%'}}>
<GridList style={styles.gridList} cols={0}>
{tilesData.map((tile) => (
<GridTile
key={tile.img}
>
<img src={tile.img} />
</GridTile>

))}

</GridList>
</div>
<div style={{ width: '25%'}}>
<div style={{color: '#4C4C4C'}}><h2><b>{name}</b></h2></div>
<div style={{marginTop: '20px'}}>{'Created On'+ ' ' + createdDate}</div>
<div style={{marginTop: '10px'}}>{'Created By' + ' ' + creator}</div>
<div style={{position: 'absolute', bottom: '0', marginBottom: '10px'}}>{'Participants:' + ' ' + participants}</div>
</div>
<div style={{ width: '25%'}}>
<div style={{    position: 'absolute', bottom: '0', marginBottom: '10px'}}>Opportunities:</div>
</div>
<div style={{ width: '25%'}}>
<RaisedButton onClick ={this.uploadVolunteer} label="Manage" style={{margin: '12px', float:'right', display :flag}} />
<div style={{right: '20px',position: 'absolute', bottom: '0', marginBottom: '10px'}}><div style={{float: 'left', width:'30px'}}>{visibilityIcon}</div><span style={{position:'relative', top:'5px'}}>{visibilitStatus}</span></div>

</div>
</div>
</Paper>
)
}
}
