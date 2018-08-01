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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Checkbox from '@material-ui/core/Checkbox';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/lab/Slider';

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
class NewNpcsFromTemplateCardUnstyled extends React.Component {
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
              New NPCs from template Wizard
            </Typography>
            <Typography className={this.props.classes.pos} color="textSecondary">
              This wizard will help you create groups of NPCs based off of monster templates
            </Typography>
            <NewNpcsFromTemplateCardForm open={this.state.open} handleClose={this.handleClose} createNpcs={this.createNpcs}/>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={this.handleOpen}>NPCs from Template</Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}
export const NewNpcsFromTemplateCard = withStyles(cardStyle)(NewNpcsFromTemplateCardUnstyled);


class NewNpcsFromTemplateCardForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.initialState();

    this.searchAdjustment = this.searchAdjustment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.initialState = this.initialState.bind(this);
  }

  initialState() {
    return {
      monsterSearch: {
        partialName: null,
        sizes: [],
        hitPoints: null,
        armourClass: null,
        challengeRating: null
      },
      monsters: [],
    };
  }

  searchAdjustment(event) {
    event.target.id;
    event.target.value;
    //TODO update the search state.
  }

  handleSubmit(event) {
    event.preventDefault();
    //TODO fun
    let npc = [];
    this.props.createNpcscreateNpcs(numberOfDice, sizeOfDie, baseHp, conMod, npc);

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
        <DialogTitle id="form-dialog-title">Enter NPC Info</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="monster name"
            type="text"
            fullWidth
            onChange={this.searchAdjustment}
          />
          <List>
            <ListSubheader>Size</ListSubheader>
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox checked/>
                }
                label="Tiny"
              />
            </ListItem>
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox checked/>
                }
                label="Small"
              />
            </ListItem>
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox checked/>
                }
                label="Medium"
              />
            </ListItem>
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox checked/>
                }
                label="Large"
              />
            </ListItem>
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox checked/>
                }
                label="Huge"
              />
            </ListItem>
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox checked/>
                }
                label="Gargantuan"
              />
            </ListItem>
          </List>
          <List>
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox />
                }
                label="Hit Points"
              />
              <Slider value={10} />
            </ListItem>
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox />
                }
                label="Armour Class"
              />
              <Slider value={10} />
            </ListItem>
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox />
                }
                label="Challenge Rating"
              />
              <Slider value={10} />
            </ListItem>
          </List>
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

