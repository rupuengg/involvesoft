export function getStyles (props, muiTheme) {
  return {
    navTabsStyle: {
      float: 'left',
      width:'100%',
      magrin: 'auto',
      textAlign:'center'
    },
    navTabsHeaderStyle: {
      height:80,
      width:'100%',
      marginTop: 40,
      textAlign : 'center',
      align : 'center'
    },
    navTabsContentStyle: {
      height:'100%',
      width:'100%',
      textAlign : 'center',
      float: 'left',
      align : 'center',
      margin: 'auto'
    },
    navTabsLink: {
      color : 'black',
      textDecoration : 'none',
      padding: '10px 20px',
      marginLeft: 40,
      display: 'inline-block'
    },
    navTabsActiveLink: {
      color : 'black',
      textDecoration : 'none',
      padding: '10px 20px',
      display: 'inline-block',
      borderBottom: '3px solid',
      borderColor:muiTheme.palette.primary1Color
      
    }
  }
}

