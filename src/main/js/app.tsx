import * as React from "react";
import * as ReactDOM from "react-dom";

import EncounterDrawer from "./encounterDrawer";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => <EncounterDrawer/>;

ReactDOM.render(
  <MuiThemeProvider>
    <App/>
  </MuiThemeProvider>,
  document.getElementById('react')
);