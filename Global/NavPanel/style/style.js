export function getStyles (props, muiTheme) {
  return {
    navPanelStyle: {
      height: 900,
      width: '20%',
      float: 'left'
    },
    primaryStyle: {
      backgroundColor: muiTheme.palette.primaryColor
    },
    link:{
      color : 'black',
      textDecoration : 'none'
    },
    activeLink : {
      color : 'white',
      textDecoration : 'underline'
    },
    activePaperStyle: {
      backgroundColor:muiTheme.palette.primary1Color
    },
    inActivePaperStyle: {
    },
    activeLabelStyle: {
      color : 'white',
      textDecoration : 'none'
    },
    inActiveLabelStyle: {
      color : 'black'
    },
    subMenuItemStyle: {
      fontSize : 15,
      color : 'white',
      marginLeft : 20
    }
  }
}

