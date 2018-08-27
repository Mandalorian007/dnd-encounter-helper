"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Button_1 = require("@material-ui/core/Button");
const TextField_1 = require("@material-ui/core/TextField");
const FormControlLabel_1 = require("@material-ui/core/FormControlLabel");
const Switch_1 = require("@material-ui/core/Switch");
class NewCombatantForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.initialState = this.initialState.bind(this);
        this.handleNpcToggle = this.handleNpcToggle.bind(this);
    }
    initialState() {
        let combatant = new Map();
        combatant.set('isNpc', false);
        return {
            combatant: combatant,
        };
    }
    handleChange(event) {
        let combatant = this.state.combatant;
        combatant.set(event.target.id, event.target.value);
        this.setState({ combatant: combatant });
    }
    handleNpcToggle() {
        let combatant = this.state.combatant;
        combatant.set('isNpc', !combatant.get('isNpc'));
        this.setState({
            combatant: combatant,
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        let combatant = this.state.combatant;
        combatant.set('currentHp', combatant.get('maxHp'));
        this.props.createCombatant(combatant);
        // reset the state
        this.setState(this.initialState);
        this.props.navigateBack();
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(TextField_1.default, { autoFocus: true, margin: "dense", id: "name", label: "name", type: "text", fullWidth: true, onChange: this.handleChange }),
            React.createElement(TextField_1.default, { margin: "dense", id: "armourClass", label: "armourClass", type: "number", fullWidth: true, onChange: this.handleChange }),
            React.createElement(TextField_1.default, { margin: "dense", id: "maxHp", label: "maxHp", type: "number", fullWidth: true, onChange: this.handleChange }),
            React.createElement(TextField_1.default, { margin: "dense", id: "initiativeBonus", label: "initativeBonus", type: "number", fullWidth: true, onChange: this.handleChange }),
            React.createElement(TextField_1.default, { margin: "dense", id: "passivePerception", label: "passivePerception", type: "number", fullWidth: true, onChange: this.handleChange }),
            React.createElement(FormControlLabel_1.default, { control: React.createElement(Switch_1.default, { checked: !this.state.combatant.get('isNpc'), onChange: this.handleNpcToggle, color: "primary" }), label: "Player" }),
            React.createElement(FormControlLabel_1.default, { control: React.createElement(Switch_1.default, { checked: this.state.combatant.get('isNpc'), onChange: this.handleNpcToggle }), label: "Npc" }),
            React.createElement(TextField_1.default, { margin: "dense", id: "comment", label: "comment", type: "text", fullWidth: true, onChange: this.handleChange }),
            React.createElement(Button_1.default, { onClick: this.handleSubmit, color: "primary" }, "Submit")));
    }
}
exports.default = NewCombatantForm;
//# sourceMappingURL=newFixedStatCombatantForm.js.map