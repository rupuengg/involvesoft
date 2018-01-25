import { cyan500, blue500, lightBlue700, lightBlue800, lightBlue900, grey300, yellowA700, red900,
white, darkBlack, fullBlack, green400, grey100, orange900, lightGreen500, deepOrange300 } from 'material-ui/styles/colors'

import { fade } from 'material-ui/utils/colorManipulator'
// palette has to be updated with more colors
const secondaryColor = '#808080'

const palette = {
  primaryColor:  grey100,
  primary1Color: lightGreen500,
  primary2Color: lightBlue800,
  primary3Color: lightBlue900,
  primary4Color: orange900,
  primary5Color: orange900,
  accent1Color: blue500,
  accent2Color: blue500,
  accentYellow: yellowA700,
  textColor: darkBlack,
  iconColor: secondaryColor,
  alternateTextColor: white,
  canvasColor: white,
  borderColor: grey300,
  disabledColor: fade(darkBlack, 0.3),
  pickerHeaderColor: cyan500,
  clockCircleColor: fade(darkBlack, 0.07),
  shadowColor: fullBlack
}

const spacing = {
  iconSize: 24,
  desktopGutter: 24,
  desktopGutterMore: 32,
  desktopGutterLess: 16,
  desktopGutterMini: 8,
  desktopKeylineIncrement: 64,
  desktopDropDownMenuItemHeight: 32,
  desktopDropDownMenuFontSize: 15,
  desktopDrawerMenuItemHeight: 48,
  desktopSubheaderHeight: 48,
  desktopToolbarHeight: 56
}

const theme = {
  palette,
  spacing,
  fontFamily: 'Source Sans Pro, sans-serif',
  textField: {
    focusColor: palette.primary4Color,
    errorColor: red900,
    disabledTextColor: fade(darkBlack, 0.6),
    hintColor: fade(darkBlack, 0.6),
    floatingLabelColor: fade(darkBlack, 0.6)
  },
  checkbox: {
    checkedColor: palette.primary4Color,
    requiredColor: palette.primary4Color
  },
  raisedButton: {
    primaryColor: palette.primary4Color,
    primaryTextColor: white,
    disabledTextColor: fade(darkBlack, 0.8),
    backgroundColor: palette.primary5Color
  },
  toolbar: {
    iconColor: darkBlack,
    backgroundColor: 'transparent'
  }
}

/** @private */
export default theme
