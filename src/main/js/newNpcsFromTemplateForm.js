const React = require('react');

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/lab/Slider';

class NewNpcsFromTemplateForm extends React.Component {
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
  }

  render() {
    return (
      <div>
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
        <Button onClick={this.handleSubmit} color="primary">
          Submit
        </Button>
      </div>
    )
  }
}
export default NewNpcsFromTemplateForm;