import * as React from "react";
import * as ReactDOM from "react-dom";

import EncounterDrawer from "./encounterDrawer";
import {MuiThemeProvider, createMuiTheme, withStyles} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: "light"
  }
});

const App = () => <EncounterDrawer/>;

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App/>
  </MuiThemeProvider>,
  document.getElementById('react')
);