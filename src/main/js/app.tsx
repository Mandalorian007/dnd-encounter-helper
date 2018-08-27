import * as React from "react";
import * as ReactDOM from "react-dom";

import EncounterDrawer from "./encounterDrawer";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component<any, any> {
  render() {
    return (
      <EncounterDrawer/>
    )
  }
}

ReactDOM.render(
  <MuiThemeProvider>
    <App/>
  </MuiThemeProvider>,
  document.getElementById('react')
);