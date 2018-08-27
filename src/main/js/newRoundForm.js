"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Button_1 = require("@material-ui/core/Button");
const TextField_1 = require("@material-ui/core/TextField");
const Dialog_1 = require("@material-ui/core/Dialog");
const DialogActions_1 = require("@material-ui/core/DialogActions");
const DialogContent_1 = require("@material-ui/core/DialogContent");
const DialogContentText_1 = require("@material-ui/core/DialogContentText");
const DialogTitle_1 = require("@material-ui/core/DialogTitle");
class NewRoundForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.initialState = this.initialState.bind(this);
    }
    initialState() {
        return {
            inititatives: new Map(),
        };
    }
    handleChange(event) {
        let inititatives = this.state.inititatives;
        inititatives.set(event.target.id, event.target.value);
        this.setState({ inititatives: inititatives });
    }
    handleSubmit(event) {
        event.preventDefault();
        // trigger a new round
        this.props.newRound(this.state.inititatives);
        // reset the state
        this.setState(this.initialState);
        // close the dialog
        this.props.handleClose(event);
    }
    render() {
        const players = this.props.combatants.filter(function (combatant) {
            return combatant.npc != true;
        });
        return (React.createElement(Dialog_1.default, { open: this.props.open, onClose: this.props.handleClose, "aria-labelledby": "form-dialog-title" },
            React.createElement(DialogTitle_1.default, { id: "form-dialog-title" }, "Enter new player initiative rolls"),
            React.createElement(DialogContent_1.default, null,
                React.createElement(DialogContentText_1.default, null, "Please have the players roll new initiatives and enter them below.  On Submitting npcs will automatically re-roll initiative."),
                players.map(player => {
                    const stringId = player.id.toString();
                    return React.createElement(TextField_1.default, { key: player.id, margin: "dense", id: stringId, label: player.name, type: "number", fullWidth: true, onChange: this.handleChange });
                })),
            React.createElement(DialogActions_1.default, null,
                React.createElement(Button_1.default, { onClick: this.props.handleClose, color: "primary" }, "Cancel"),
                React.createElement(Button_1.default, { onClick: this.handleSubmit, color: "primary" }, "Submit"))));
    }
}
exports.default = NewRoundForm;
//# sourceMappingURL=newRoundForm.js.map