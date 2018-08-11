const React = require('react');
const ReactDOM = require('react-dom');

import EncounterDrawer from "./encounterDrawer";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
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