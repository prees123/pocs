import './fonts.scss';
import blue from "@material-ui/core/colors/blue";
import purple from "@material-ui/core/colors/purple";
import red from "@material-ui/core/colors/red";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: purple,
    error: red
  }
});

export default responsiveFontSizes(theme);