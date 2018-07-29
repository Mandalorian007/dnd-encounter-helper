const React = require('react');

import { withStyles } from "@material-ui/core/styles/index";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const cardStyle = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  modalPaper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  button: {
    margin: theme.spacing.unit,
  },
});
class NewFixedStatCombatantCardUnstyled extends React.Component {
  constructor(props) {
    super(props);
    this.state={open: false};

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({open: true})
  }

  handleClose() {
    this.setState({open: false})
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Card className={this.props.classes.card}>
          <CardContent>
            <Typography className={this.props.classes.title} color="textSecondary">
              New Fixed Stat Combatant Wizard
            </Typography>
            <Typography className={this.props.classes.pos} color="textSecondary">
              This wizard will help you create either a new character or npc and add it to combat
            </Typography>
            <NewCombatantForm open={this.state.open} handleClose={this.handleClose}/>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={this.handleOpen}>New Round</Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}
export const NewFixedStatCombatantCard = withStyles(cardStyle)(NewFixedStatCombatantCardUnstyled);


class NewCombatantForm extends React.Component {
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

    //TODO create a new combatant
    console.log(this.state.combatant);

    // reset the state
    this.setState(this.initialState);
    // close the dialog
    this.props.handleClose(event);
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Enter new Combatant Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out all fields
          </DialogContentText>
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
            autoFocus
            margin="dense"
            id="armourClass"
            label="armourClass"
            type="number"
            fullWidth
            onChange={this.handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="maxHp"
            label="maxHp"
            type="number"
            fullWidth
            onChange={this.handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="initiativeBonus"
            label="initativeBonus"
            type="number"
            fullWidth
            onChange={this.handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="passivePerception"
            label="passivePerception"
            type="number"
            fullWidth
            onChange={this.handleChange}
          />
          {/* NPC Toggle */}
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
          {/* current initative */}
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="comment"
            type="text"
            fullWidth
            onChange={this.handleChange}
          />
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
    )
  }
}