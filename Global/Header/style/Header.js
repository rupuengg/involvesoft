import { lightBlue700, white, darkWhite, darkBlack, grey100 } from 'material-ui/styles/colors'
export const styles = {
  toolbar: {
    width: '100%',
    height: 55,
    backgroundColor: white,
    color: white,
    zDepth: 5

  },
  logo: {
    display: 'block',
    marginRight: 15
  },
  logoContainer: {
    marginRight: 40,
    overflow: 'hidden'
  },
  title: {
    color: darkBlack,
    fontSize: 24,
    overflow: 'hidden',
    textDecoration: 'none',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  linksContainer: {
    alignItems: 'initial',
    flexGrow: 1,
    justifyContent: 'flex-end',
    marginRight: -12
  },
  linkItem: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontSize: 14,
    height: '100%',
    padding: '0 12px'
  },
  linkItemIcon: {
    marginRight: 8
  }
}
