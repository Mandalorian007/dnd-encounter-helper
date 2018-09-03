import * as React from "react";

import {Theme, withStyles, createStyles} from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CombatantList from "./combatantList";
import NewFixedStatCombatantForm from "./newFixedStatCombatantForm";
import NewNpcsFromTemplateForm from "./newNpcsFromTemplateForm";
import {API_ROOT} from "./api-config";

const encounterStyles = ({ zIndex, palette, spacing, mixins }: Theme) => createStyles({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: 240,
  },
  content: {
    flexGrow: 1,
    backgroundColor: palette.background.default,
    padding: spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: mixins.toolbar,
});

interface State {
    contentTarget: string;
    combatants: Combatant[];
}

class EncounterDrawer extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            contentTarget: "combatant",
            combatants: []
        };
    };

    componentDidMount() {
        this.refreshCombatantsState();
    };

    refreshCombatantsState = () => {
        fetch(`${API_ROOT}/combatants`)
            .then(results => results.json())
            .then(data => this.setState({combatants: data}));
    };

    createCombatant = (combatant) => {
        let obj = Array.from(combatant).reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});

        fetch(`${API_ROOT}/combatants`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        })
            .then(() => this.refreshCombatantsState());
    };

    deleteCombatant = (combatantId) => {
        fetch(`${API_ROOT}/combatants/` + combatantId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).catch(err => err)
            .then(() => this.refreshCombatantsState());
    };

    updateCombatant = (combatantId, data) => {
        fetch(`${API_ROOT}/combatants/` + combatantId, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).catch(err => err)
            .then(() => this.refreshCombatantsState());
    };

    updateState = (data) => {
        this.setState({combatants: data});
    };

    createNpcs = (numberOfDice, sizeOfDie, baseHp, conMod, enemyCount, combatant) => {
        const url = `${API_ROOT}/combatants/npcs/hitdie/`
            + this.getOrZero(numberOfDice)
            + '/' + this.getOrZero(sizeOfDie)
            + '/' + this.getOrZero(baseHp)
            + '/' + this.getOrZero(conMod)
            + '?count=' + this.getOrZero(enemyCount);

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(combatant),
        }).catch(err => err)
            .then(() => this.refreshCombatantsState());
    };

    newRound = (initiativeMap) => {
        let obj = Array.from(initiativeMap).reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});

        fetch(`${API_ROOT}/combatants/newRound`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        })
            .then(results => results.json())
            .then(data => this.setState({combatants: data}));
    };

    navigateBack = () => {
        this.selectContent("combatant");
    };

    selectContent = (screen) => {
        this.setState({contentTarget: screen});
    };

    // Display assistance
    getContent = () => {
        if(this.state.contentTarget == "combatant") {
            return <CombatantList combatants={this.state.combatants} newRound={this.newRound} updateCombatant={this.updateCombatant} updateState={this.updateState} deleteCombatant={this.deleteCombatant}/>;
        }
        if(this.state.contentTarget == "new-combatant") {
            return <NewFixedStatCombatantForm createCombatant={this.createCombatant} navigateBack={this.navigateBack}/>;
        }
        if(this.state.contentTarget == "npc-template") {
            return <NewNpcsFromTemplateForm createNpcs={this.createNpcs} navigateBack={this.navigateBack}/>;
        }
    };

    getOrZero = (number) => {
        if(number == null) {
            return 0;
        } else {
            return number;
        }
    };

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
                    classes={{ paper: classes.drawerPaper }}
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
export default withStyles(encounterStyles)(EncounterDrawer);
