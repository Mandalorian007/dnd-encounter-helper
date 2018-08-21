const React = require('react');

import { withStyles } from "@material-ui/core/styles/index";
import MonsterGridListTile from "./monsterGridListTile";
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Slider from 'rc-slider';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  }
});
class NewNpcsFromTemplateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.initialState();

    this.searchNameAdjustment = this.searchNameAdjustment.bind(this);
    this.searchSizeAdjustment = this.searchSizeAdjustment.bind(this);
    this.searchHitPointsSliderAdjustment = this.searchHitPointsSliderAdjustment.bind(this);
    this.searchArmourSliderAdjustment = this.searchArmourSliderAdjustment.bind(this);
    this.searchChallengeSliderAdjustment = this.searchChallengeSliderAdjustment.bind(this);
    this.onHitPointsSliderChange = this.onHitPointsSliderChange.bind(this);
    this.onArmourSliderChange = this.onArmourSliderChange.bind(this);
    this.onChallengeSliderChange = this.onChallengeSliderChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.initialState = this.initialState.bind(this);
    this.getChallengeRatingDisplay = this.getChallengeRatingDisplay.bind(this);
    this.getChallengeRatingAPI = this.getChallengeRatingAPI.bind(this);
  }

  componentDidMount() {
    this.refreshMonsterSearchState(this.state.monsterSearch);
  }

  refreshMonsterSearchState(monsterSearch) {
    console.log(JSON.stringify(monsterSearch));
    fetch(`http://localhost:8080/monsters/search`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(monsterSearch)
    })
      .then(results => results.json())
      .then(data => this.setState({ monsters: data }));
  }

  initialState() {
    return {
      monsterSearch: {
        partialName: null,
        sizes: [],
        hitPoints: {
            lowerBound: 1,
            upperBound: 700
            },
        armourClass: {
            lowerBound: 5,
            upperBound: 25
            },
        challengeRating: {
            lowerBound: 1,
            upperBound: 33
            },
        hitPointsDisabled : '',
        armourClassDisabled: '',
        challengeDisabled: ''
      },
      monsters: [],
    };
    this.refreshMonsterSearchState();
  }

  searchNameAdjustment(event) {
    let monsterSearch = this.state.monsterSearch;
    monsterSearch.partialName = event.target.value;
    this.setState({ monsterSearch: monsterSearch });
    this.refreshMonsterSearchState(monsterSearch);
  }

  searchSizeAdjustment(event) {
    let monsterSearch = this.state.monsterSearch;
    let sizes = monsterSearch.sizes;
    if (sizes.includes(event.target.id)) {
      sizes = sizes.filter(size => size != event.target.id);
    } else {
      sizes.push(event.target.id);
    }
    monsterSearch.sizes = sizes;
    this.setState({ monsterSearch: monsterSearch });
    this.refreshMonsterSearchState(monsterSearch);
  }

  searchHitPointsSliderAdjustment(event, checked) {

    let monsterSearch = this.state.monsterSearch;

    if (!checked)
    {
        monsterSearch.hitPoints = { lowerBound: 1, upperBound: 700};
        monsterSearch.hitPointsDisabled = '';
    }
    else
    {
        monsterSearch.hitPointsDisabled = 'enabled';
    }

    this.setState({ monsterSearch: monsterSearch });
    this.refreshMonsterSearchState(this.state.monsterSearch);
  }

  onHitPointsSliderChange (value) {
    let monsterSearch = this.state.monsterSearch;
    monsterSearch.hitPoints = { lowerBound: value[0], upperBound: value[1]};
    this.setState({ monsterSearch: monsterSearch });
    this.refreshMonsterSearchState(this.state.monsterSearch);
  }

  searchArmourSliderAdjustment(event, checked) {

    let monsterSearch = this.state.monsterSearch;

    if (!checked)
    {
        monsterSearch.armourClass =  { lowerBound: 5, upperBound: 25};
        monsterSearch.armourClassDisabled = '';
    }
    else
    {
        monsterSearch.armourClassDisabled = 'enabled';
    }

    this.setState({ monsterSearch: monsterSearch });
    this.refreshMonsterSearchState(this.state.monsterSearch);
  }

  onArmourSliderChange (value) {
    let monsterSearch = this.state.monsterSearch;
    monsterSearch.armourClass = { lowerBound: value[0], upperBound: value[1]};
    this.setState({ monsterSearch: monsterSearch });
    this.refreshMonsterSearchState(this.state.monsterSearch);
  }

  searchChallengeSliderAdjustment(event, checked) {

    let monsterSearch = this.state.monsterSearch;

    if (!checked)
    {
        monsterSearch.Challenge =  { lowerBound: 1, upperBound: 33};
        monsterSearch.ChallengeDisabled = '';
    }
    else
    {
        monsterSearch.ChallengeDisabled = 'enabled';
    }

    this.setState({ monsterSearch: monsterSearch });
    this.refreshMonsterSearchState(this.state.monsterSearch);
  }

  onChallengeSliderChange (value) {
    let monsterSearch = this.state.monsterSearch;
    monsterSearch.Challenge = { lowerBound: value[0], upperBound: value[1]};
    this.setState({ monsterSearch: monsterSearch });
    this.refreshMonsterSearchState(this.state.monsterSearch);
  }

  handleSubmit(event) {
    event.preventDefault();
    //TODO fun
    let npc = [];
    this.props.createNpcscreateNpcs(numberOfDice, sizeOfDie, baseHp, conMod, npc);

    // reset the state
    this.setState(this.initialState);
  }

  getChallengeRatingDisplay(pos) {
    const cr = ["0", "1/3", "1/4", "1/2", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"];
    return cr[pos - 1];
  }

  getChallengeRatingAPI(start, end) {
    const cr = [0.0, 0.125, 0.25, 0.5, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 19.0, 20.0, 21.0, 22.0, 23.0, 24.0, 25.0, 26.0, 27.0, 28.0, 29.0, 30.0];
    return cr.slice(start - 1, end - 1);
  }

  render() {
    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const RangeWithTooltip = createSliderWithTooltip(Slider.Range);

    const sizes = ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"];
    return (
      <div>
        <Grid container>
          <Grid item xs={ 9 }>
            <div className={this.props.classes.root}>
              <GridList >
                <GridListTile key="Subheader" cols={ 2 } style={ { height: 'auto' } }>
                  <ListSubheader component="div">Monsters</ListSubheader>
                </GridListTile>
                {
                  this.state.monsters.map(monster => {
                    return <MonsterGridListTile key={ monster.name } monster={ monster }/>
                  })
                }
              </GridList>
            </div>
          </Grid>
          <Grid item xs={ 3 }>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="monster name"
              type="text"
              fullWidth
              onChange={ this.searchNameAdjustment }
            />
            <List>
              <ListSubheader>Size</ListSubheader>
              {
                sizes.map(size => {
                  return (
                    <ListItem key={ size }>
                      <FormControlLabel
                        control={
                          <Checkbox id={ size } onChange={ this.searchSizeAdjustment }/>
                        }
                        label={ size }
                      />
                    </ListItem>
                  )
                })
              }
              <ListItem>
                <FormControlLabel
                  control={
                    <Checkbox id="hit-points" onChange={ this.searchHitPointsSliderAdjustment }/>
                  }
                  label="Hit Points"
                />
                <RangeWithTooltip min={ 1 } max={ 700 } defaultValue={ [this.state.monsterSearch.hitPoints.lowerBound, this.state.monsterSearch.hitPoints.upperBound] } allowCross={false} onAfterChange={this.onHitPointsSliderChange} disabled={!this.state.monsterSearch.hitPointsDisabled} />
              </ListItem>
              <ListItem>
                <FormControlLabel
                  control={
                    <Checkbox id="armour-class" onChange={ this.searchArmourSliderAdjustment }/>
                  }
                  label="Armour Class"
                />
                <RangeWithTooltip min={ 5 } max={ 25 } defaultValue={ [this.state.monsterSearch.armourClass.lowerBound, this.state.monsterSearch.armourClass.upperBound]} allowCross={false} onAfterChange={this.onArmourSliderChange} disabled={!this.state.monsterSearch.armourClassDisabled} />
              </ListItem>
              <ListItem>
                <FormControlLabel
                  control={
                    <Checkbox id="challenge-rating" onChange={ this.searchChallengeSliderAdjustment } />
                  }
                  label="Challenge Rating"
                />
                <RangeWithTooltip min={ 1 } max={ 33 } defaultValue={ [this.state.monsterSearch.challengeRating.lowerBound, this.state.monsterSearch.challengeRating.upperBound] } allowCross={false} onAfterChange={this.onChallengeSliderChange} disabled={!this.state.monsterSearch.ChallengeDisabled}
                       tipFormatter={ value => this.getChallengeRatingDisplay(value) }/>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(NewNpcsFromTemplateForm);