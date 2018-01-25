  /**
 * function for styles of Login
*/
export function getStyles (props, muiTheme) {
  return {
    container: {
      padding: 30,
      paddingBottom: 10,
      paddingTop: 10,
      width: 400,
      backgroundColor: muiTheme.palette.canvasColor
    },
    loginTopWrapper: {
      margin: 'auto',
      marginBottom: 0
    },
    loginMiddleWrapper: {
      marginTop: 10
    },
    header: {
      textAlign: 'center'
    },
    headerHeadline: {
      margin: 0,
      fontWeight: 'normal'
    },
    headerText: {
      display: 'block',
      marginTop: 5,
      marginBottom: 10,
      fontSize: 15,
      color: (muiTheme.palette.textColor, 0.54)
    },
    textField: {
      width: '100%',
      paddingLeft:10,
      paddingRight:10
    },
    forgotPassword: {
      textAlign: 'right',
      fontSize: 14,
      lineHeight: '21px'
    },
    rememberMeStyle: {
      fontSize: 14
    },
    actionWrapper: {
      textAlign: 'center',
      fontSize: 14
    },
    usernameTextFieldError: {
      borderColor: muiTheme.textField.errorColor
    },
    passwordErrorText: {
      marginTop: 5,
      marginBottom: 20,
      color:muiTheme.textField.errorColor,
      textAlign:'left'
    },
    passwordErrorIcon: {
      float: 'right',
      height: 16,
      width: 16
    },
    raisedButton: {
      backgroundColor: muiTheme.raisedButton.backgroundColor
    },
    paperStyle: {
      height: 350,
      width: 500,
      margin:'5% auto 0px auto'
    },
    primaryStyle: {
      backgroundColor: muiTheme.palette.primaryColor
    }
  }
}

