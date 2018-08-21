const React = require('react');

import { withStyles } from "@material-ui/core/styles/index";
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
   titleBar: {
      height: 'auto',
      padding: '5px 5px',
    },
   tile: {
      width: '25%',
   },
   subTitle: {
       lineHeight: 'normal',
   },
   imageThumbnail: {
       display: 'flex',
       margin: 'auto',
       width: '93.5%',
   },
});

class MonsterGridListTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monsterDetails: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getActions = this.getActions.bind(this);
    this.getModifier = this.getModifier.bind(this);
  }

  handleClick(event) {
    this.setState({
      monsterDetails: event.currentTarget,
    });
  };

  handleClose() {
    this.setState({
      monsterDetails: null,
    });
  };

  getModifier(abilityScore) {
    return Math.floor((abilityScore-10)/2);
  }

  getActions(actionList, subHeaderName) {
    if (Array.isArray(actionList) && actionList.length) {
      return (
        <div>
          <Divider/>
          <ListSubheader>{subHeaderName}</ListSubheader>
          {
            actionList.map(action => {
              return (
                <ListItem key={action.name}>
                  <ListItemText
                    primary={
                      action.name
                      + "\u{00a0}\u{00a0}\u{00a0}\u{00a0}\u{00a0}"
                      + ((action.attackBonus != null && action.attackBonus != 0)
                          ? "Attack Bonus: " + action.attackBonus + " "
                          : ""
                      )
                      + '\u{00a0}\u{00a0}\u{00a0}\u{00a0}\u{00a0}' +
                      (
                        (action.damageDice != null && action.damageDice != "")
                          ? " Damage:\u{00a0}" + action.damageDice +
                          (
                            action.damageBonus != null
                              ? "+" + action.damageBonus
                              : ""
                          )
                          : ""
                      )
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })
          }
        </div>
      )
    }
  }

  render() {
    const monster = this.props.monster;
    // This is a "hack and pray" might be nice to actually download all the images from their repo
    //https://github.com/TheGiddyLimit/TheGiddyLimit.github.io/tree/master/img/MM
    //https://5etools.com/5etools.html
    const imageSrc = `https://5etools.com/img/MM/${monster.name}.png`;
    return (
      <GridListTile classes={{ root: this.props.classes.tile }}>
        <img src={imageSrc} alt={monster.name} className={this.props.classes.imageThumbnail} onClick={this.handleClick}/>
        <GridListTileBar
          title={ monster.name }
          classes={{
            root: this.props.classes.titleBar,
          }}
          subtitle={
            <div className={this.props.classes.subTitle} >
              <span>Size: {monster.size.toLowerCase()}</span>
              <br/>
              <span>Hp: {monster.hitPoints}</span>
              <br/>
              <span>AC: {monster.armourClass}</span>
              <br/>
              <span>CR: {monster.challengeRating}</span>
            </div>
          }
        />
        <Dialog
          open={ Boolean(this.state.monsterDetails) }
          onClose={ this.handleClose }
          aria-labelledby="form-dialog-title"
          aria-describedby="form-dialog-description">
          <DialogContent>
            <Grid container spacing={24}>
              <Grid item xs={4}>
                <Paper>
                  <img src={imageSrc} alt={monster.name} className={this.props.classes.imageThumbnail}/>
                  <Divider/>
                  <List dense={true}>
                    <ListSubheader>Basic</ListSubheader>
                    <ListItemText primary={"Hit\u{00a0}Points:\u{00a0}" + monster.hitPoints + "(" + monster.hitDice + "+" + this.getModifier(monster.constitution) * monster.challengeRating + ")"}/>
                    <ListItemText primary={"Armour\u{00a0}Class:\u{00a0}" + monster.armourClass}/>
                    <ListItemText primary={"Challenge\u{00a0}Rating:\u{00a0}" + monster.challengeRating}/>
                    <Divider/>
                    <ListSubheader>Ability Scores</ListSubheader>
                    <ListItemText primary={"Strength:\u{00a0}" + monster.strength} />
                    <ListItemText primary={"Dexterity:\u{00a0}" + monster.dexterity} />
                    <ListItemText primary={"Constitution:\u{00a0}" + monster.constitution} />
                    <ListItemText primary={"Intelligence:\u{00a0}" + monster.intelligence} />
                    <ListItemText primary={"Wisdom:\u{00a0}" + monster.wisdom} />
                    <ListItemText primary={"Charisma:\u{00a0}" + monster.charisma} />
                    <Divider/>
                    <ListSubheader>Saving Throws</ListSubheader>
                    <ListItemText primary={"Strength\u{00a0}Save:\u{00a0}" + ((monster.strengthSave != null) ? monster.strengthSave: this.getModifier(monster.strength))} />
                    <ListItemText primary={"Dexterity\u{00a0}Save:\u{00a0}" + ((monster.dexteritySave != null) ? monster.dexteritySave: this.getModifier(monster.dexterity))} />
                    <ListItemText primary={"Constitution\u{00a0}Save:\u{00a0}" + ((monster.constitutionSave != null) ? monster.constitutionSave: this.getModifier(monster.constitution))} />
                    <ListItemText primary={"Intelligence\u{00a0}Save:\u{00a0}" + ((monster.intelligenceSave != null) ? monster.intelligenceSave: this.getModifier(monster.intelligence))} />
                    <ListItemText primary={"Wisdom\u{00a0}Save:\u{00a0}" + ((monster.wisdomSave != null) ? monster.wisdomSave: this.getModifier(monster.wisdom))} />
                    <ListItemText primary={"Charisma\u{00a0}Save:\u{00a0}" + ((monster.charismaSave != null) ? monster.charismaSave: this.getModifier(monster.charisma))} />
                    <Divider/>
                    <ListSubheader>Senses</ListSubheader>
                    {
                      monster.senses.split(',').map((sense, index)=> {
                        return <ListItemText key={index} primary={sense}/>;
                      })
                    }
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={8}>
                <Paper>
                  <DialogTitle id="form-dialog-title">{ monster.name }</DialogTitle>
                  <span id="form-dialog-description">
                    {
                      monster.size.charAt(0).toUpperCase() + monster.size.slice(1).toLowerCase() + " "}
                      {monster.type + " "}
                      {(monster.subType != null && monster.subType != "") ? "(" + monster.subType + ")" : ""
                    }
                  </span>
                  <List dense={true}>
                    {this.getActions(monster.actions, "Actions")}
                    {this.getActions(monster.specialAbilities, "Special Abilities")}
                    {this.getActions(monster.legendaryActions, "Legendary Actions")}
                    {this.getActions(monster.reactions, "Reactions")}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={ this.handleClose } color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </GridListTile>
    )
  }
}

export default withStyles(styles)(MonsterGridListTile);