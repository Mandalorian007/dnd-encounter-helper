const React = require('react');

import { withStyles } from "@material-ui/core/styles/index";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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
    console.log(event.target);
    this.handleClose();
  }

  render() {
    const players = this.props.combatants.filter(function(combatant){
      return combatant.npc != true;
    });

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
          </CardContent>
          <CardActions>
            <Button size="small" onClick={this.handleOpen}>New Round</Button>
          </CardActions>
        </Card>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Enter new player initiative rolls</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please have the players roll new initiatives and enter them below.  On Submitting npcs will automatically re-roll initiative.
            </DialogContentText>
            {
              players.map( player => {
                return <TextField
                  key={player.id}
                  autoFocus
                  margin="dense"
                  id="name"
                  label={player.name}
                  type="email"
                  fullWidth
                />
              })
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
export const NewRoundCard = withStyles(cardStyle)(NewRoundCardUnstyled);
