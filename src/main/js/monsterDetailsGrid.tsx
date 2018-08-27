import * as React from "react";

import { withStyles } from "@material-ui/core/styles/index";
import DialogTitle from '@material-ui/core/DialogTitle';
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
  imageThumbnail: {
    display: 'flex',
    margin: 'auto',
    width: '93.5%',
  },
});
class MonsterDetailsGrid extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.getActions = this.getActions.bind(this);
    this.getModifier = this.getModifier.bind(this);
  }

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
    return (
      <Grid container spacing={24}>
        <Grid item xs={4}>
          <Paper>
            <img src={this.props.imageSrc} alt={monster.name} className={this.props.classes.imageThumbnail}/>
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
              <Divider/>
              <ListSubheader>Speed</ListSubheader>
              {
                monster.speed.split(',').map((speed, index)=> {
                  return <ListItemText key={index} primary={speed}/>;
                })
              }
              <Divider/>
              <ListSubheader>Damage&nbsp;Invulerabilities</ListSubheader>
              {
                (monster.damageInvulerabilities != null)
                  ? monster.damageInvulerabilities.split(',').map((speed, index)=> {
                      return <ListItemText key={index} primary={speed}/>;
                    })
                  : <div/>
              }
              <Divider/>
              <ListSubheader>Damage&nbsp;Immunities</ListSubheader>
              {
                (monster.damageImmunities != null)
                  ? monster.damageImmunities.split(',').map((speed, index)=> {
                      return <ListItemText key={index} primary={speed}/>;
                    })
                  : <div/>
              }
              <Divider/>
              <ListSubheader>Condition&nbsp;Immunities</ListSubheader>
              {
                (monster.conditionImmunities != null)
                  ?  monster.conditionImmunities.split(',').map((speed, index)=> {
                      return <ListItemText key={index} primary={speed}/>;
                    })
                  : <div/>
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
    )
  }
}

export default withStyles(styles)(MonsterDetailsGrid);