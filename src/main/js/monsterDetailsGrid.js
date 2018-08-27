"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const index_1 = require("@material-ui/core/styles/index");
const DialogTitle_1 = require("@material-ui/core/DialogTitle");
const Grid_1 = require("@material-ui/core/Grid");
const Divider_1 = require("@material-ui/core/Divider");
const Paper_1 = require("@material-ui/core/Paper");
const List_1 = require("@material-ui/core/List");
const ListItem_1 = require("@material-ui/core/ListItem");
const ListItemText_1 = require("@material-ui/core/ListItemText");
const ListSubheader_1 = require("@material-ui/core/ListSubheader");
const ListItemSecondaryAction_1 = require("@material-ui/core/ListItemSecondaryAction");
const IconButton_1 = require("@material-ui/core/IconButton");
const Info_1 = require("@material-ui/icons/Info");
const styles = theme => ({
    imageThumbnail: {
        display: 'flex',
        margin: 'auto',
        width: '93.5%',
    },
});
class MonsterDetailsGrid extends React.Component {
    constructor(props) {
        super(props);
        this.getActions = this.getActions.bind(this);
        this.getModifier = this.getModifier.bind(this);
    }
    getModifier(abilityScore) {
        return Math.floor((abilityScore - 10) / 2);
    }
    getActions(actionList, subHeaderName) {
        if (Array.isArray(actionList) && actionList.length) {
            return (React.createElement("div", null,
                React.createElement(Divider_1.default, null),
                React.createElement(ListSubheader_1.default, null, subHeaderName),
                actionList.map(action => {
                    return (React.createElement(ListItem_1.default, { key: action.name },
                        React.createElement(ListItemText_1.default, { primary: action.name
                                + "\u{00a0}\u{00a0}\u{00a0}\u{00a0}\u{00a0}"
                                + ((action.attackBonus != null && action.attackBonus != 0)
                                    ? "Attack Bonus: " + action.attackBonus + " "
                                    : "")
                                + '\u{00a0}\u{00a0}\u{00a0}\u{00a0}\u{00a0}' +
                                ((action.damageDice != null && action.damageDice != "")
                                    ? " Damage:\u{00a0}" + action.damageDice +
                                        (action.damageBonus != null
                                            ? "+" + action.damageBonus
                                            : "")
                                    : "") }),
                        React.createElement(ListItemSecondaryAction_1.default, null,
                            React.createElement(IconButton_1.default, null,
                                React.createElement(Info_1.default, null)))));
                })));
        }
    }
    render() {
        const monster = this.props.monster;
        return (React.createElement(Grid_1.default, { container: true, spacing: 24 },
            React.createElement(Grid_1.default, { item: true, xs: 4 },
                React.createElement(Paper_1.default, null,
                    React.createElement("img", { src: this.props.imageSrc, alt: monster.name, className: this.props.classes.imageThumbnail }),
                    React.createElement(Divider_1.default, null),
                    React.createElement(List_1.default, { dense: true },
                        React.createElement(ListSubheader_1.default, null, "Basic"),
                        React.createElement(ListItemText_1.default, { primary: "Hit\u{00a0}Points:\u{00a0}" + monster.hitPoints + "(" + monster.hitDice + "+" + this.getModifier(monster.constitution) * monster.challengeRating + ")" }),
                        React.createElement(ListItemText_1.default, { primary: "Armour\u{00a0}Class:\u{00a0}" + monster.armourClass }),
                        React.createElement(ListItemText_1.default, { primary: "Challenge\u{00a0}Rating:\u{00a0}" + monster.challengeRating }),
                        React.createElement(Divider_1.default, null),
                        React.createElement(ListSubheader_1.default, null, "Ability Scores"),
                        React.createElement(ListItemText_1.default, { primary: "Strength:\u{00a0}" + monster.strength }),
                        React.createElement(ListItemText_1.default, { primary: "Dexterity:\u{00a0}" + monster.dexterity }),
                        React.createElement(ListItemText_1.default, { primary: "Constitution:\u{00a0}" + monster.constitution }),
                        React.createElement(ListItemText_1.default, { primary: "Intelligence:\u{00a0}" + monster.intelligence }),
                        React.createElement(ListItemText_1.default, { primary: "Wisdom:\u{00a0}" + monster.wisdom }),
                        React.createElement(ListItemText_1.default, { primary: "Charisma:\u{00a0}" + monster.charisma }),
                        React.createElement(Divider_1.default, null),
                        React.createElement(ListSubheader_1.default, null, "Saving Throws"),
                        React.createElement(ListItemText_1.default, { primary: "Strength\u{00a0}Save:\u{00a0}" + ((monster.strengthSave != null) ? monster.strengthSave : this.getModifier(monster.strength)) }),
                        React.createElement(ListItemText_1.default, { primary: "Dexterity\u{00a0}Save:\u{00a0}" + ((monster.dexteritySave != null) ? monster.dexteritySave : this.getModifier(monster.dexterity)) }),
                        React.createElement(ListItemText_1.default, { primary: "Constitution\u{00a0}Save:\u{00a0}" + ((monster.constitutionSave != null) ? monster.constitutionSave : this.getModifier(monster.constitution)) }),
                        React.createElement(ListItemText_1.default, { primary: "Intelligence\u{00a0}Save:\u{00a0}" + ((monster.intelligenceSave != null) ? monster.intelligenceSave : this.getModifier(monster.intelligence)) }),
                        React.createElement(ListItemText_1.default, { primary: "Wisdom\u{00a0}Save:\u{00a0}" + ((monster.wisdomSave != null) ? monster.wisdomSave : this.getModifier(monster.wisdom)) }),
                        React.createElement(ListItemText_1.default, { primary: "Charisma\u{00a0}Save:\u{00a0}" + ((monster.charismaSave != null) ? monster.charismaSave : this.getModifier(monster.charisma)) }),
                        React.createElement(Divider_1.default, null),
                        React.createElement(ListSubheader_1.default, null, "Senses"),
                        monster.senses.split(',').map((sense, index) => {
                            return React.createElement(ListItemText_1.default, { key: index, primary: sense });
                        }),
                        React.createElement(Divider_1.default, null),
                        React.createElement(ListSubheader_1.default, null, "Speed"),
                        monster.speed.split(',').map((speed, index) => {
                            return React.createElement(ListItemText_1.default, { key: index, primary: speed });
                        }),
                        React.createElement(Divider_1.default, null),
                        React.createElement(ListSubheader_1.default, null, "Damage\u00A0Invulerabilities"),
                        (monster.damageInvulerabilities != null)
                            ? monster.damageInvulerabilities.split(',').map((speed, index) => {
                                return React.createElement(ListItemText_1.default, { key: index, primary: speed });
                            })
                            : React.createElement("div", null),
                        React.createElement(Divider_1.default, null),
                        React.createElement(ListSubheader_1.default, null, "Damage\u00A0Immunities"),
                        (monster.damageImmunities != null)
                            ? monster.damageImmunities.split(',').map((speed, index) => {
                                return React.createElement(ListItemText_1.default, { key: index, primary: speed });
                            })
                            : React.createElement("div", null),
                        React.createElement(Divider_1.default, null),
                        React.createElement(ListSubheader_1.default, null, "Condition\u00A0Immunities"),
                        (monster.conditionImmunities != null)
                            ? monster.conditionImmunities.split(',').map((speed, index) => {
                                return React.createElement(ListItemText_1.default, { key: index, primary: speed });
                            })
                            : React.createElement("div", null)))),
            React.createElement(Grid_1.default, { item: true, xs: 8 },
                React.createElement(Paper_1.default, null,
                    React.createElement(DialogTitle_1.default, { id: "form-dialog-title" }, monster.name),
                    React.createElement("span", { id: "form-dialog-description" },
                        monster.size.charAt(0).toUpperCase() + monster.size.slice(1).toLowerCase() + " ",
                        monster.type + " ",
                        (monster.subType != null && monster.subType != "") ? "(" + monster.subType + ")" : ""),
                    React.createElement(List_1.default, { dense: true },
                        this.getActions(monster.actions, "Actions"),
                        this.getActions(monster.specialAbilities, "Special Abilities"),
                        this.getActions(monster.legendaryActions, "Legendary Actions"),
                        this.getActions(monster.reactions, "Reactions"))))));
    }
}
exports.default = index_1.withStyles(styles)(MonsterDetailsGrid);
//# sourceMappingURL=monsterDetailsGrid.js.map