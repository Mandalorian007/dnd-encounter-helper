const React = require('react');
const ReactDOM = require('react-dom');

import { CombatantList } from "./combatantList";
import { CardGrid } from "./cardGrid";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={combatants: []};

    this.refreshCombatantsState = this.refreshCombatantsState.bind(this);
    this.createCombatant = this.createCombatant.bind(this);
    this.deleteCombatant = this.deleteCombatant.bind(this);
    this.updateCombatant = this.updateCombatant.bind(this);
    this.createNpcs = this.createNpcs.bind(this);
    this.newRound = this.newRound.bind(this);
  }

  componentDidMount() {
    this.refreshCombatantsState();
  }

  refreshCombatantsState() {
    fetch(`http://localhost:8080/combatants`)
      .then(results => results.json())
      .then(data => {
        this.setState({combatants: data});
      })
  }

  createCombatant(combatant) {
    //TDO post call
    this.refreshCombatantsState();
  }

  deleteCombatant(combatantId) {
    //TODO delete call
    this.refreshCombatantsState();
  }

  updateCombatant(combatant) {
    //TODO patch call
    this.refreshCombatantsState();
  }

  createNpcs(numberOfDice, sizeOfDie, baseHp, conMod, combatant) {
    //TODO createNpcsWithTemplate call
    this.refreshCombatantsState();
  }

  newRound(something) {
    //TODO method with new round
    this.refreshCombatantsState();
  }

  render() {
    return (
      <div>
        <h1>D&D Encounter Helper</h1>
        <CombatantList combatants={this.state.combatants}/>
        <CardGrid combatants={this.state.combatants}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('react')
);