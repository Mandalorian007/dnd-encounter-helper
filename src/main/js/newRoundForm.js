const React = require('react');

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class NewRoundForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.initialState(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.initialState = this.initialState.bind(this);
  }

  initialState() {
    return {
      inititatives: new Map(),
    };
  }

  handleChange(event) {
    let inititatives = this.state.inititatives;
    inititatives.set(event.target.id, event.target.value);
    this.setState({inititatives: inititatives});
  }

  handleSubmit(event) {
    event.preventDefault();

    // trigger a new round
    this.props.newRound(this.state.inititatives);

    // reset the state
    this.setState(this.initialState);
    this.props.navigateBack();
  }

  render() {
    const players = this.props.combatants.filter(function(combatant){
      return combatant.npc != true;
    });

    return (
      <div>
        {
          players.map( player => {
            const stringId = player.id.toString();
            return <TextField
              key={player.id}
              margin="dense"
              id={stringId}
              label={player.name}
              type="number"
              fullWidth
              onChange={this.handleChange}
            />
          })
        }
        <Button onClick={this.handleSubmit} color="primary">
          Submit
        </Button>
      </div>
    )
  }
}
export default NewRoundForm;