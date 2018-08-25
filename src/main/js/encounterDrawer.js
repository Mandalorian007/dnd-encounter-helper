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
import NewFixedStatCombatantForm from "./newFixedStatCombatantForm";
import NewNpcsFromTemplateForm from "./newNpcsFromTemplateForm";

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
    this.state={
      contentTarget: "combatant",
      combatants: []
    };

    this.refreshCombatantsState = this.refreshCombatantsState.bind(this);
    this.createCombatant = this.createCombatant.bind(this);
    this.deleteCombatant = this.deleteCombatant.bind(this);
    this.updateCombatant = this.updateCombatant.bind(this);
    this.createNpcs = this.createNpcs.bind(this);
    this.newRound = this.newRound.bind(this);
    this.selectContent = this.selectContent.bind(this);
    this.getContent = this.getContent.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  updateCombatant(index, data) {
      fetch('http://localhost:8080/combatants/' + this.state.combatants[index].id, {
          method: 'PATCH',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
      }).catch(err => err)
      .then(() => this.refreshCombatantsState());
  }

  handleChange(index, dataType, value) {
    let data;
    const newState = this.state.combatants.map((item, i) => {
        if (i == index) {
            data = {[dataType]: value};
            return {...item, [dataType]: value};
        }
        return item;
    });
    console.log(newState);

    this.setState({
       combatants: newState
    });

    if (!isNaN(value))
        this.updateCombatant(index, data);
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

  navigateBack() {
    this.selectContent("combatant");
  }

  selectContent(screen) {
    this.setState({contentTarget: screen});
  }

  // Display assistance
  getContent() {
    if(this.state.contentTarget == "combatant") {
      return <CombatantList combatants={this.state.combatants} newRound={this.newRound} handleChange={this.handleChange}/>;
    }
    if(this.state.contentTarget == "new-combatant") {
      return <NewFixedStatCombatantForm createCombatant={this.createCombatant} navigateBack={this.navigateBack}/>;
    }
    if(this.state.contentTarget == "npc-template") {
      return <NewNpcsFromTemplateForm createNpcs={this.createNpcs} navigateBack={this.navigateBack}/>;
    }
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
            <ListItem button onClick={() => this.selectContent("combatant")}>
              <ListItemText primary="Combatants" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => this.selectContent("new-combatant")}>
              <ListItemText primary="New Combatant" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => this.selectContent("npc-template")}>
              <ListItemText primary="Npc Templates" />
            </ListItem>
            <Divider />
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.getContent()}
        </main>
      </div>
    )
  }
}
export const EncounterDrawer = withStyles(encounterStyles)(EncounterDrawerUnstyled);
export default EncounterDrawer;
