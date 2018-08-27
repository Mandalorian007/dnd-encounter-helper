"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styles_1 = require("@material-ui/core/styles");
const Table_1 = require("@material-ui/core/Table");
const TableBody_1 = require("@material-ui/core/TableBody");
const TableCell_1 = require("@material-ui/core/TableCell");
const TableHead_1 = require("@material-ui/core/TableHead");
const TableRow_1 = require("@material-ui/core/TableRow");
const Paper_1 = require("@material-ui/core/Paper");
const Avatar_1 = require("@material-ui/core/Avatar");
const Button_1 = require("@material-ui/core/Button");
const math = require("mathjs");
const newRoundForm_1 = require("./newRoundForm");
const combatantStyles = ({ spacing }) => styles_1.createStyles({
    root: {
        width: '100%',
        marginTop: spacing.unit,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    npcStyle: {
        margin: 10,
        backgroundColor: 'orange',
    },
    playerStyle: {
        margin: 10,
        backgroundColor: 'blue',
    },
});
class CombatantList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    handleOpen() {
        this.setState({ open: true });
    }
    handleClose() {
        this.setState({ open: false });
    }
    handleKeyPress(index, dataType, e) {
        if (e.keyCode === 13) {
            let x = math.eval(e.target.value);
            this.props.handleChange(index, dataType, x);
        }
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(Paper_1.default, { className: this.props.classes.root },
                React.createElement(Table_1.default, { className: this.props.classes.table },
                    React.createElement(TableHead_1.default, null,
                        React.createElement(TableRow_1.default, null,
                            React.createElement(TableCell_1.default, null, "Type"),
                            React.createElement(TableCell_1.default, null, "Name"),
                            React.createElement(TableCell_1.default, null, "Current Initiative"),
                            React.createElement(TableCell_1.default, null, "Armour Class"),
                            React.createElement(TableCell_1.default, null, "Current HP"),
                            React.createElement(TableCell_1.default, null, "Max HP"),
                            React.createElement(TableCell_1.default, null, "Comments"))),
                    React.createElement(TableBody_1.default, null, this.props.combatants.map((combatant, index) => {
                        return (React.createElement(TableRow_1.default, { key: combatant.id },
                            React.createElement(TableCell_1.default, null,
                                React.createElement(Avatar_1.default, { className: combatant.npc ? this.props.classes.npcStyle : this.props.classes.playerStyle }, combatant.npc ? 'N' : 'P')),
                            React.createElement(TableCell_1.default, { component: "th", scope: "row" }, combatant.name),
                            React.createElement(TableCell_1.default, null, combatant.currentInitiative),
                            React.createElement(TableCell_1.default, null, combatant.armourClass),
                            React.createElement(TableCell_1.default, null,
                                React.createElement("input", { type: 'text', onChange: (e) => this.props.handleChange(index, "currentHp", e.target.value), value: this.props.combatants[index].currentHp, onKeyDown: (e) => this.handleKeyPress(index, "currentHp", e) })),
                            React.createElement(TableCell_1.default, null, combatant.maxHp),
                            React.createElement(TableCell_1.default, null, combatant.comment)));
                    })))),
            React.createElement(Button_1.default, { size: "small", onClick: this.handleOpen, color: "primary" }, "New Round"),
            React.createElement(newRoundForm_1.default, { combatants: this.props.combatants, newRound: this.props.newRound, open: this.state.open, handleClose: this.handleClose })));
    }
}
exports.default = styles_1.withStyles(combatantStyles)(CombatantList);
//# sourceMappingURL=combatantList.js.map