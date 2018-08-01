const React = require('react');
const ReactDOM = require('react-dom');

import { CombatantList } from "./combatantList";
import { CardGrid } from "./cardGrid";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
      .then(data => this.setState({combatants: data}));
  }

  createCombatant(combatant) {
    let obj = Array.from(combatant).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

    fetch(`http://localhost:8080/combatants`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then(() => this.refreshCombatantsState());
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

  newRound(initiativeMap) {
    let obj = Array.from(initiativeMap).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

    fetch(`http://localhost:8080/combatants/newRound`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then(results => results.json())
      .then(data => this.setState({combatants: data}));
  }

  render() {
    return (
      <div>
        <h1>D&D Encounter Helper</h1>
        <CombatantList combatants={this.state.combatants}/>
        {/* TODO convert the cards into a side bar more like inbox does, then make the main page all the stuff*/}
        <CardGrid
          combatants={this.state.combatants}
          newRound={this.newRound}
          createCombatant={this.createCombatant}
          createNpcs={this.createNpcs}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <MuiThemeProvider>
    <App/>
  </MuiThemeProvider>,
  document.getElementById('react')
);