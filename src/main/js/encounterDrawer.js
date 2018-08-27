"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styles_1 = require("@material-ui/core/styles");
const Drawer_1 = require("@material-ui/core/Drawer");
const AppBar_1 = require("@material-ui/core/AppBar");
const Toolbar_1 = require("@material-ui/core/Toolbar");
const Typography_1 = require("@material-ui/core/Typography");
const Divider_1 = require("@material-ui/core/Divider");
const List_1 = require("@material-ui/core/List");
const ListItem_1 = require("@material-ui/core/ListItem");
const ListItemText_1 = require("@material-ui/core/ListItemText");
const combatantList_1 = require("./combatantList");
const newFixedStatCombatantForm_1 = require("./newFixedStatCombatantForm");
const newNpcsFromTemplateForm_1 = require("./newNpcsFromTemplateForm");
const encounterStyles = ({ zIndex, palette, spacing, mixins }) => styles_1.createStyles({
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
        minWidth: 0,
    },
    toolbar: mixins.toolbar,
});
class EncounterDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            .then(data => this.setState({ combatants: data }));
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
                data = { [dataType]: value };
                return Object.assign({}, item, { [dataType]: value });
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
            .then(data => this.setState({ combatants: data }));
    }
    navigateBack() {
        this.selectContent("combatant");
    }
    selectContent(screen) {
        this.setState({ contentTarget: screen });
    }
    // Display assistance
    getContent() {
        if (this.state.contentTarget == "combatant") {
            return React.createElement(combatantList_1.default, { combatants: this.state.combatants, newRound: this.newRound, handleChange: this.handleChange });
        }
        if (this.state.contentTarget == "new-combatant") {
            return React.createElement(newFixedStatCombatantForm_1.default, { createCombatant: this.createCombatant, navigateBack: this.navigateBack });
        }
        if (this.state.contentTarget == "npc-template") {
            return React.createElement(newNpcsFromTemplateForm_1.default, { createNpcs: this.createNpcs, navigateBack: this.navigateBack });
        }
    }
    render() {
        const { classes } = this.props;
        return (React.createElement("div", { className: classes.root },
            React.createElement(AppBar_1.default, { position: "absolute", className: classes.appBar },
                React.createElement(Toolbar_1.default, null,
                    React.createElement(Typography_1.default, { variant: "title", color: "inherit", noWrap: true }, "D&D Encounter Helper"))),
            React.createElement(Drawer_1.default, { variant: "permanent", classes: {
                    paper: classes.drawerPaper,
                } },
                React.createElement("div", { className: classes.toolbar }),
                React.createElement(List_1.default, null,
                    React.createElement(ListItem_1.default, { button: true, onClick: () => this.selectContent("combatant") },
                        React.createElement(ListItemText_1.default, { primary: "Combatants" })),
                    React.createElement(Divider_1.default, null),
                    React.createElement(ListItem_1.default, { button: true, onClick: () => this.selectContent("new-combatant") },
                        React.createElement(ListItemText_1.default, { primary: "New Combatant" })),
                    React.createElement(Divider_1.default, null),
                    React.createElement(ListItem_1.default, { button: true, onClick: () => this.selectContent("npc-template") },
                        React.createElement(ListItemText_1.default, { primary: "Npc Templates" })),
                    React.createElement(Divider_1.default, null))),
            React.createElement("main", { className: classes.content },
                React.createElement("div", { className: classes.toolbar }),
                this.getContent())));
    }
}
exports.default = styles_1.withStyles(encounterStyles)(EncounterDrawer);
//# sourceMappingURL=encounterDrawer.js.map