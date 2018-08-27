import * as React from "react";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class NewCombatantForm extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = this.initialState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.initialState = this.initialState.bind(this);
    this.handleNpcToggle = this.handleNpcToggle.bind(this);
  }

  initialState() {
    let combatant = new Map();
    combatant.set('isNpc', false);
    return {
      combatant: combatant,
    };
  }

  handleChange(event) {
    let combatant = this.state.combatant;
    combatant.set(event.target.id, event.target.value);
    this.setState({combatant: combatant});
  }

  handleNpcToggle() {
    let combatant = this.state.combatant;
    combatant.set('isNpc', !combatant.get('isNpc'));
    this.setState({
      combatant: combatant,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let combatant = this.state.combatant;
    combatant.set('currentHp', combatant.get('maxHp'));
    this.props.createCombatant(combatant);

    // reset the state
    this.setState(this.initialState);
    this.props.navigateBack();
  }

  render() {
    return (
      <div>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="name"
          type="text"
          fullWidth
          onChange={this.handleChange}
        />
        <TextField
          margin="dense"
          id="armourClass"
          label="armourClass"
          type="number"
          fullWidth
          onChange={this.handleChange}
        />
        <TextField
          margin="dense"
          id="maxHp"
          label="maxHp"
          type="number"
          fullWidth
          onChange={this.handleChange}
        />
        <TextField
          margin="dense"
          id="initiativeBonus"
          label="initativeBonus"
          type="number"
          fullWidth
          onChange={this.handleChange}
        />
        <TextField
          margin="dense"
          id="passivePerception"
          label="passivePerception"
          type="number"
          fullWidth
          onChange={this.handleChange}
        />
        <FormControlLabel
          control={
            <Switch
              checked={!this.state.combatant.get('isNpc')}
              onChange={this.handleNpcToggle}
              color="primary" />
          }
          label="Player" />
        <FormControlLabel
          control={
            <Switch
              checked={this.state.combatant.get('isNpc')}
              onChange={this.handleNpcToggle} />
          }
          label="Npc" />
       {/* current initative*/}
        <TextField
          margin="dense"
          id="comment"
          label="comment"
          type="text"
          fullWidth
          onChange={this.handleChange}
        />
        <Button onClick={this.handleSubmit} color="primary">
          Submit
        </Button>
      </div>
    )
  }
}

export default NewCombatantForm;