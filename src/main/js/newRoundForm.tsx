import * as React from "react";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface State {
    inititatives: Map<string, number>;
}

class NewRoundForm extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = this.initialState();
  };

  initialState = () => {
    return {
      inititatives: new Map(),
    };
  };

  handleChange = (event) => {
    let inititatives = this.state.inititatives;
    inititatives.set(event.target.id, event.target.value);
    this.setState({inititatives: inititatives});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // trigger a new round
    this.props.newRound(this.state.inititatives);
    // reset the state
    this.setState(this.initialState);
    // close the dialog
    this.props.handleClose(event);
  };

  render() {
    const players = this.props.combatants.filter(function(combatant){
      return combatant.npc != true;
    });
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Enter new player initiative rolls</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please have the players roll new initiatives and enter them below.  On Submitting npcs will automatically re-roll initiative.
          </DialogContentText>
          {
            players.map( player => {
              const stringId = player.id.toString();
              return <TextField
                key={player.id}
                margin="dense"
                id={stringId}
                InputProps={{ inputProps: { min: 1 } }}
                label={player.name}
                type="number"
                fullWidth
                onChange={this.handleChange}
              />
            })
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default NewRoundForm;