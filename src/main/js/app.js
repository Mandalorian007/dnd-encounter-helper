const React = require('react');
const ReactDOM = require('react-dom');

import { CombatantList } from "./combatantList";
import { CardGrid } from "./cardGrid";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>D&D Encounter Helper</h1>
        <CombatantList/>
        <CardGrid/>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('react')
);