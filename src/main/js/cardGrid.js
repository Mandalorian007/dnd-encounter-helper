const React = require('react');

import { withStyles } from "@material-ui/core/styles/index";
import Grid from '@material-ui/core/Grid';
import { NewRoundCard } from './newRoundCard';
import { NewFixedStatCombatantCard } from "./newFixedStatCombatantCard";
import { NewNpcsFromTemplateCard } from "./newNpcsFromTemplateCard";

const gridStyles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 4,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});
class CardGridUnstyled extends React.Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={4}>
            <NewRoundCard combatants={this.props.combatants} newRound={this.props.newRound}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <NewFixedStatCombatantCard combatants={this.props.combatants}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <NewNpcsFromTemplateCard combatants={this.props.combatants}/>
          </Grid>
        </Grid>
      </div>
    )
  }
}
export const CardGrid = withStyles(gridStyles)(CardGridUnstyled);