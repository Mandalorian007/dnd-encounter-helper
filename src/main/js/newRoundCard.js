const React = require('react');

import { withStyles } from "@material-ui/core/styles/index";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


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
});
class NewRoundCardUnstyled extends React.Component {
  constructor(props) {
    super(props);
    this.state={modalOpen: false};

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({modalOpen: true})
  }

  handleClose() {
    this.setState({modalOpen: false})
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
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.modalOpen}
          onClose={this.handleClose}
        >
          <Paper style={getModalStyle()} className={this.props.classes.modalPaper}>
            <Typography variant="title" id="modal-title">
              Enter new player initiative rolls
            </Typography>
            {
              players.map(player => {
                return (
                  <div key={player.id}>
                    <FormControl>
                      <InputLabel htmlFor="name-simple">{player.name}</InputLabel>
                      {/* TODO figure out how to force this to be a number input */}
                        <Input label={player.name}/>
                    </FormControl>
                  </div>
                )
              })
            }
            {/* TODO figure out how to get a manage form reset / input  */}
          </Paper>
        </Modal>
      </div>
    )
  }
}
export const NewRoundCard = withStyles(cardStyle)(NewRoundCardUnstyled);
