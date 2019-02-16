import * as React from "react";

import {Theme, MuiThemeProvider, createMuiTheme, withStyles, createStyles} from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CssBaseline from '@material-ui/core/CssBaseline';
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
    grow: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        width: 240,
    },
    spacing: {
        margin: spacing.unit,
        padding: '0 10px',
    },
    content: {
        flexGrow: 1,
        padding: spacing.unit * 3,
        minWidth: 0, // So the Typography noWrap works
    },
    toolbar: mixins.toolbar,
});

interface State {
    contentTarget: string;
    combatants: Combatant[];
    selected: number[];
    endOfRound: boolean;
    ThemeType: any;
    PrimaryColor: any;
    SecondaryColor: any;
}

class EncounterDrawer extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = this.initialState();
    };

    initialState = () => {
        return {
            contentTarget: "combatant",
            combatants: [],
            selected: [],
            endOfRound: false,
            ThemeType: 'light',
            PrimaryColor: "#3f51b5",
            SecondaryColor: "#f50057",
        };
    };

    componentDidMount = () => {
        this.refreshCombatantsState();
    };

    refreshCombatantsState = () => {
        fetch(`${API_ROOT}/combatants`)
            .then(results => results.json())
            .then(data => {
                let endOfRound = this.state.endOfRound;
                let select = this.state.selected;

                select.forEach((value, index)=>{
                    let x = 0;
                    data.map(combatant => {
                        if (value === combatant.id)
                            x++;
                    });
                    if (x === 0)
                        select.splice(index, 1);
                });

                data.map((combatant, index) => {
                    //select first combatant when initalize app
                    if (index === 0 && !select.length)
                        select = [combatant.id];

                    //if combatants added when last combatant was selected
                    if (!this.state.selected.indexOf(combatant.id))
                        endOfRound = false;

                    //if player becomes last
                    if ((index + 1 === data.length) && (combatant.id === this.state.selected[this.state.selected.length - 1]))
                        endOfRound = true;
                })

                this.setState({combatants: data, selected: select, endOfRound: endOfRound})
            });
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).catch(err => err)
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
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).catch(err => err)
            .then(() => this.refreshCombatantsState());
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
            body: JSON.stringify(combatant)
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
            body: JSON.stringify(obj)
        }).catch(err => err)
            .then(results => results.json())
            .then(data => {
                let combatants = null;
                data.map((combatant, index) => {
                    if (index === 0)
                        combatants = combatant.id;
                    })
                this.setState({combatants: data, selected: [combatants], endOfRound: false})
            });
    };

    navigateBack = () => {
        this.selectContent("combatant");
    };

    selectContent = (screen) => {
        this.setState({contentTarget: screen});
    };

    updateSelectedRow = (row, round) => {
        this.setState({selected: row, endOfRound: round});
    };

    // Display assistance
    getContent = () => {
        if(this.state.contentTarget == "combatant") {
            return <CombatantList combatants={this.state.combatants} selected={this.state.selected} endOfRound={this.state.endOfRound} newRound={this.newRound} updateSelectedRow={this.updateSelectedRow} updateCombatant={this.updateCombatant} deleteCombatant={this.deleteCombatant}/>;
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

    handleChange = (event) => {
        if (event.target.name == 'PrimaryColor')
            this.setState({PrimaryColor : event.target.value });
        if (event.target.name == 'SecondaryColor')
            this.setState({ SecondaryColor: event.target.value });
        if (event.target.name == 'ThemeType')
            this.setState({ThemeType : event.target.value });
    };

    render() {
        const { classes } = this.props;
        const theme = createMuiTheme({
            palette: {
                type: this.state.ThemeType,
                primary: {
                    main: this.state.PrimaryColor,
                },
                secondary: {
                    main: this.state.SecondaryColor,
                },
            },
        });

        return (
    <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" className={classes.appBar}>
                    <Toolbar>
                        <Typography color="inherit" className={classes.grow}>
                            D&D Encounter Helper
                        </Typography>
                        <Typography color="inherit">
                            Switch Theme
                        </Typography>
                        <Select
                            className={classes.spacing}
                            value={this.state.PrimaryColor}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'PrimaryColor',
                            }}
                        >
                            <MenuItem value='#3f51b5'>Blue</MenuItem>
                            <MenuItem value='#ff9800'>Orange</MenuItem>
                            <MenuItem value='#e91e63'>Red</MenuItem>
                        </Select>
                        <Select
                            className={classes.spacing}
                            value={this.state.SecondaryColor}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'SecondaryColor',
                            }}
                        >
                            <MenuItem value='#76ff03'>Green</MenuItem>
                            <MenuItem value='#d500f9'>Purple</MenuItem>
                            <MenuItem value='#f50057'>Red</MenuItem>
                        </Select>
                        <Select
                            className={classes.spacing}
                            value={this.state.ThemeType}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'ThemeType',
                            }}
                        >
                            <MenuItem value='light'>Light</MenuItem>
                            <MenuItem value='dark'>Dark</MenuItem>
                        </Select>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{ paper: classes.drawerPaper }}
                >
                    <div className={classes.toolbar} />
                    <List>
                        <ListItem button onClick={() => this.selectContent("combatant")}>
                            <ListItemText primary="Encounter" />
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
    </MuiThemeProvider>
        )
    }
}
export default withStyles(encounterStyles)(EncounterDrawer);
