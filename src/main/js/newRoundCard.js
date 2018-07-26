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
class NewRoundCardUnstyled extends React.Component {
  constructor(props) {
    super(props);
    this.state={open: false};

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen() {
    this.setState({open: true})
  }

  handleClose() {
    this.setState({open: false})
  }

  handleSubmit(event) {
    console.log('Received Submit');
    console.log(event.target);
    this.handleClose();
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Card className={this.props.classes.card}>
          <CardContent>
            <Typography className={this.props.classes.title} color="textSecondary">
              New Round Wizard
            </Typography>
            <Typography className={this.props.classes.pos} color="textSecondary">
              This wizard will help you collect all the player initatives and re-roll all npc initatives automatically
            </Typography>
            <NewRoundForm combatants={this.props.combatants} open={this.state.open} close={this.handleClose}/>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={this.handleOpen}>New Round</Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}
export const NewRoundCard = withStyles(cardStyle)(NewRoundCardUnstyled);


class NewRoundForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inititatives: new Map(),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let inititatives = this.state.inititatives;
    inititatives.set(event.target.id, event.target.value);
    this.setState({inititatives: inititatives});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.inititatives);

    //TODO figure out why this doesn't close the Dialog
    this.props.close;

    //TODO get the handle new round function passed down here.  Figure out how to do the above first.
  }

  render() {
    const players = this.props.combatants.filter(function(combatant){
      return combatant.npc != true;
    });

    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.close}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Enter new player initiative rolls</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please have the players roll new initiatives and enter them below.  On Submitting npcs will automatically re-roll initiative.
          </DialogContentText>
          <form id="newRoundForm" onSubmit={this.handleSubmit}>
            {
              players.map( player => {
                const stringId = player.id.toString();
                return <TextField
                  key={player.id}
                  autoFocus
                  margin="dense"
                  id={stringId}
                  label={player.name}
                  type="number"
                  fullWidth
                  onChange={this.handleChange}
                />
              })
            }
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.close} color="primary" form="newRoundForm" type="reset">
            Cancel
          </Button>
          <Button color="primary" form="newRoundForm" type="submit">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
