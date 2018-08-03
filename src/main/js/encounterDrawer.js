const React = require('react');

import { withStyles } from "@material-ui/core/styles/index";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { CombatantList } from "./combatantList";
import { CardGrid } from "./cardGrid";

const encounterStyles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: 240,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});
class EncounterDrawerUnstyled extends React.Component {
  constructor(props) {
    super(props);
    this.state={combatants: []};

    this.refreshCombatantsState = this.refreshCombatantsState.bind(this);
    this.createCombatant = this.createCombatant.bind(this);
    this.deleteCombatant = this.deleteCombatant.bind(this);
    this.updateCombatant = this.updateCombatant.bind(this);
    this.createNpcs = this.createNpcs.bind(this);
    this.newRound = this.newRound.bind(this);
  }

  componentDidMount() {
    this.refreshCombatantsState();
  }

  refreshCombatantsState() {
    fetch(`http://localhost:8080/combatants`)
      .then(results => results.json())
      .then(data => this.setState({combatants: data}));
  }

  createCombatant(combatant) {
    let obj = Array.from(combatant).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

    fetch(`http://localhost:8080/combatants`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then(() => this.refreshCombatantsState());
  }

  deleteCombatant(combatantId) {
    //TODO delete call
    this.refreshCombatantsState();
  }

  updateCombatant(combatant) {
    //TODO patch call
    this.refreshCombatantsState();
  }

  createNpcs(numberOfDice, sizeOfDie, baseHp, conMod, combatant) {
    //TODO createNpcsWithTemplate call
    this.refreshCombatantsState();
  }

  newRound(initiativeMap) {
    let obj = Array.from(initiativeMap).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

    fetch(`http://localhost:8080/combatants/newRound`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then(results => results.json())
      .then(data => this.setState({combatants: data}));
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              D&D Encounter Helper
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>
            <ListItem button>
              <ListItemText primary="Combatants" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="New Round" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="New Combatant" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="NPC Template" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <CombatantList combatants={this.state.combatants}/>
          <CardGrid
            combatants={this.state.combatants}
            newRound={this.newRound}
            createCombatant={this.createCombatant}
            createNpcs={this.createNpcs}
          />
        </main>
      </div>
    )
  }
}
export const EncounterDrawer = withStyles(encounterStyles)(EncounterDrawerUnstyled);
export default EncounterDrawer;
