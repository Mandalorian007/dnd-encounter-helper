import * as React from "react";

import { withStyles } from "@material-ui/core/styles/index";
import createStyles from "@material-ui/core/styles/createStyles";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TuneIcon from '@material-ui/icons/Tune';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Slider from 'rc-slider';
import * as math from 'mathjs';

const styles = createStyles({
  imageThumbnail: {
    display: 'flex',
    margin: 'auto',
    width: '93.5%',
  },
  popupImageThumbnail: {
    position: 'absolute',
    top: '0.1em',
    right: '0.1em',
    float: 'right',
    width: 'auto',
    maxWidth: '6em',
    height: 'auto',
    fontSize: '1.8em',
  },
  name: {
    color: '#922610',
    float: 'left',
    fontSize: '1.8em',
    fontVariant: 'small-caps',
  },
  divider: {
	background: '#922610',
	height: '2px',
	margin: '5px 0px',
  },
  table: {
    minWidth: 550,
  },
  row: {
    height: 'auto',
  },
  tableCell: {
    border: 'none',
    padding: '3px',
  },
  tableCell2: {
    border: 'none',
    padding: '3px',
    width: 'calc(100%/6)',
  },
  blue: {
    color:'#337ab7',
  },
  titles: {
      fontSize: '1.2em',
      fontVariant: 'small-caps',
      borderBottom: '2px solid #922610',
      color: '#922610',
      verticalAlign: 'bottom !important',
      paddingLeft: '0.2em',
  },
  InlineStats: {
     marginBottom: '1em',
  },
  InlineList: {
      margin: '0 0 10px',
      padding: '0 20px',
  },
  InlineListItem: {
    margin: '0 0 5px',
  },
  EntryTitle: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  VariantBlock: {
      boxShadow: '0 0 4px 0 #988e7c',
      border: '1px solid #656565',
      background: '#e9ecda',
      margin: '7px 15px',
      padding: '5px 10px',
  },
});

interface State {
    anchorEl?: any;
}

class MonsterDetailsGrid extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = this.initialState();
    };

    initialState = () => {
        return {
            anchorEl: null,
        };
    };

    getModifier = (abilityScore) => {
        let value = Math.floor((abilityScore-10)/2);

        if (value < 0)
            return value;
        else
            return "+" + value;
    };

    compareValues = (key) => {
        return function(a, b) {
            if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0;
            }

            const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
            let comparison = 0;

            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }

            return (comparison);
        };
    }

    getActions = (actionList, subHeaderName) => {
        const rowId = "row-data-" + subHeaderName;
        if (Array.isArray(actionList) && actionList.length) {

            const itemRows = [
                <TableRow className={this.props.classes.row} key={rowId}>
                    <TableCell className={`this.props.classes.tableCell ${this.props.classes.titles}`} colSpan={6}>
                        <span>{subHeaderName}</span>
                    </TableCell>
                </TableRow>
            ];

            itemRows.push(
                <TableRow className={this.props.classes.row} key={rowId}>
                    <TableCell className={this.props.classes.tableCell} colSpan={6}>
                    {
                        actionList.map(action => {
                            return (
                                <div className={this.props.classes.InlineStats}>
                                    <span className={this.props.classes.EntryTitle}>{action.name}. </span><span>
                                    {action.entries.map((item, index) =>
                                        {
                                            return  <span>{item}<br/></span>
                                        }
                                    )}
                                    </span>
                                </div>
                            )
                        })
                    }
                    </TableCell>
                </TableRow>
            );

            return itemRows;
        }
    };

    getLairActions = (actionList, subHeaderName) => {
        const itemRows = [
            <TableRow className={this.props.classes.row}>
                <TableCell className={`this.props.classes.tableCell ${this.props.classes.titles}`} colSpan={6}>
                    <span>{subHeaderName}</span>
                </TableCell>
            </TableRow>
        ];
        itemRows.push(
            <TableRow className={this.props.classes.row}>
                <TableCell className={this.props.classes.tableCell} colSpan={6}>
                    <div className={this.props.classes.InlineStats}>
                    {
                        actionList.map(item => {
                            if (!item.actionList.length)
                                return (<span>{item.action}<br/></span>);
                            else
                                return (<ul className={this.props.classes.InlineList}>{
                                            item.actionList.map((items, index) => {
                                                return  <li className={this.props.classes.InlineListItem}>{items}</li>
                                            })
                                       }</ul>);
                        })
                    }
                    </div>
                </TableCell>
            </TableRow>
        );

        return itemRows;
    };

    getRegionalEffects = (actionList, subHeaderName) => {
        let regionalTable = null;

        const itemRows = [
            <TableRow className={this.props.classes.row}>
                <TableCell className={`this.props.classes.tableCell ${this.props.classes.titles}`} colSpan={6}>
                    <span>{subHeaderName}</span>
                </TableCell>
            </TableRow>
        ];
        itemRows.push(
            <TableRow className={this.props.classes.row}>
                <TableCell className={this.props.classes.tableCell} colSpan={6}>
                    <div className={this.props.classes.InlineStats}>
                    {
                        actionList.map(item => {
                            if (!item.effects.length && item.regionalTable.tableDescription === null)
                                return (<span>{item.effect}<br/></span>);
                            else if (item.regionalTable.tableDescription != null)
                                regionalTable = item;
                            else
                                return (
                                    <ul className={this.props.classes.InlineList}>
                                    {
                                        item.effects.map((items, index) => {
                                            return  <li className={this.props.classes.InlineListItem}>{items}</li>
                                        })
                                    }
                                    </ul>);
                        })
                    }
                    </div>
                </TableCell>
            </TableRow>
        );

        if (regionalTable != null) {
            itemRows.push(
                <TableRow className={this.props.classes.row}>
                    <TableCell className={`this.props.classes.tableCell ${this.props.classes.titles}`} colSpan={6}>
                        <span>{regionalTable.regionalTable.caption}</span>
                    </TableCell>
                </TableRow>);

            itemRows.push(
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell} colSpan={6}>
                        <div className={this.props.classes.InlineStats}>
                            <span>{regionalTable.regionalTable.tableDescription}<br/></span>
                        </div>
                    </TableCell>
                </TableRow>);
        }

        return itemRows;
    };

    getVariant  = (item) => {
        if (item.type != null)
        {
            if (item.entry != null)
            {
                return (<span><span className={this.props.classes.EntryTitle}>{item.type}: {item.name} </span><div className={this.props.classes.InlineStats}>{item.entry}</div></span>);
            }
            else if (item.entries != null)
            {
                return(<span><span className={this.props.classes.EntryTitle}>{item.type}: {item.name} </span>
                    {
                        item.entries.map((items, index) => {
                            return this.getVariant(items);
                        })
                    }
                    </span>
                );
            }
        }
        else
        {
            if (item.entry != null)
            {
                return (<div className={this.props.classes.InlineStats}>{item.entry}</div>);
            }
            else if (item.entries != null)
            {
                return item.entries.map((items, index) => {
                            return this.getVariant(items);
                       });
            }
        }
    };

    handleOpen = (event) => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    getRatio = (value) => {
        if (value % 1 != 0)
            return math.format(math.fraction(value), { fraction: 'ratio' });
        else
            return value;
    };

    onSliderChange = (monster, value) => {
        console.log(value);
        console.log(monster);
    };

    render() {
        const monster = this.props.monster;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const createSliderWithTooltip = Slider.createSliderWithTooltip;
        const RangeWithTooltip = createSliderWithTooltip(Slider.Range);
        let flatBonus = "";
        const saves = [];
        const skills = [];
        const speeds = [];

        if(monster.hp.flatBonus < 0) {
            flatBonus = " " + monster.hp.flatBonus;
        }
        else if (monster.hp.flatBonus > 0) {
            flatBonus = " +" + monster.hp.flatBonus;
        }

        //saving throws
        if (monster.strengthSave != null) {
            const obj = {id: 'Str', save: monster.strengthSave};
            saves.push(obj);
        }
        if (monster.dexteritySave != null) {
            const obj = {id: 'Dex', save: monster.dexteritySave};
            saves.push(obj);
        }
        if (monster.constitutionSave != null) {
            const obj = {id: 'Con', save: monster.constitutionSave};
            saves.push(obj);
        }
        if (monster.intelligenceSave != null) {
            const obj = {id: 'Int', save: monster.intelligenceSave};
            saves.push(obj);
        }
        if (monster.wisdomSave != null) {
            const obj = {id: 'Wis', save: monster.wisdomSave};
            saves.push(obj);
        }
        if (monster.charismaSave != null) {
            const obj = {id: 'Cha', save: monster.charismaSave};
            saves.push(obj);
        }

        //skills
        if (monster.athletics != null) {
            const obj = {id: 'Athletics', skill: monster.athletics};
            skills.push(obj);
        }

        if (monster.acrobatics != null) {
            const obj = {id: 'Acrobatics', skill: monster.acrobatics};
            skills.push(obj);
        }

        if (monster.slightOfHand != null) {
            const obj = {id: 'Slight of Hand', skill: monster.slightOfHand};
            skills.push(obj);
        }

        if (monster.arcana != null) {
            const obj = {id: 'Arcana', skill: monster.arcana};
            skills.push(obj);
        }

        if (monster.history != null) {
            const obj = {id: 'History', skill: monster.history};
            skills.push(obj);
        }

        if (monster.investigation != null) {
            const obj = {id: 'Investigation', skill: monster.investigation};
            skills.push(obj);
        }

        if (monster.nature != null) {
            const obj = {id: 'Nature', skill: monster.nature};
            skills.push(obj);
        }

        if (monster.religion != null) {
            const obj = {id: 'Religion', skill: monster.religion};
            skills.push(obj);
        }

        if (monster.animalHandling != null) {
            const obj = {id: 'Animal Handling', skill: monster.animalHandling};
            skills.push(obj);
        }

        if (monster.insight != null) {
            const obj = {id: 'Insight', skill: monster.insight};
            skills.push(obj);
        }

        if (monster.medicine != null) {
            const obj = {id: 'Medicine', skill: monster.medicine};
            skills.push(obj);
        }

        if (monster.perception != null) {
            const obj = {id: 'Perception', skill: monster.perception};
            skills.push(obj);
        }

        if (monster.survival != null) {
            const obj = {id: 'Survival', skill: monster.survival};
            skills.push(obj);
        }

        if (monster.deception != null) {
            const obj = {id: 'Deception', skill: monster.deception};
            skills.push(obj);
        }

        if (monster.intimidation != null) {
            const obj = {id: 'Intimidation', skill: monster.intimidation};
            skills.push(obj);
        }

        if (monster.performance != null) {
            const obj = {id: 'Performance', skill: monster.performance};
            skills.push(obj);
        }

        if (monster.persuasion != null) {
            const obj = {id: 'Persuasion', skill: monster.persuasion};
            skills.push(obj);
        }

        if (monster.stealth != null) {
            const obj = {id: 'Stealth', skill: monster.stealth};
            skills.push(obj);
        }

        //speed
        if (monster.speed.walk != null) {
            const obj = {id: 'walk', speed: monster.speed.walk, condition: monster.speed.walkCondition};
            speeds.push(obj);
        }
        if (monster.speed.burrow != null) {
            const obj = {id: 'burrow', speed: monster.speed.burrow, condition: monster.speed.burrowCondition};
            speeds.push(obj);
        }
        if (monster.speed.climb != null) {
            const obj = {id: 'climb', speed: monster.speed.climb, condition: monster.speed.climbCondition};
            speeds.push(obj);
        }
        if (monster.speed.fly != null) {
            const obj = {id: 'fly', speed: monster.speed.fly, condition: monster.speed.flyCondition};
            speeds.push(obj);
        }
        if (monster.speed.swim != null) {
            const obj = {id: 'swim', speed: monster.speed.swim, condition: monster.speed.swimCondition};
            speeds.push(obj);
        }

         monster.immunities.sort(this.compareValues('condition'));
         monster.resistances.sort(this.compareValues('note'));
         monster.vulnerabilities.sort(this.compareValues('condition'));
         monster.conditionImmunity.sort(this.compareValues('note'));

        return (
        <Table className={this.props.classes.table}>
            <TableHead>
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell} colSpan={6}>
                    <span className={this.props.classes.name}>{monster.name}</span>
                    <img src={this.props.imageSrc} alt={monster.name} className={this.props.classes.popupImageThumbnail}/>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell} colSpan={6}>
                            <span>
                                {monster.size.charAt(0).toUpperCase() + monster.size.slice(1).toLowerCase() + " "}
                                {monster.type.type}
                                {(monster.type.subTypes != null && monster.type.subTypes != "") ? " (" + monster.type.subTypes + ")" : ""}
                                {monster.alignment.map((item) =>
                                    {
                                       return item.alignment.toLowerCase().split('_').map((t, index) => {
                                            if (index === 0)
                                                return ", " + t;
                                            else
                                                return " " + t;
                                        });
                                    }
                                )}
                            </span>
                    </TableCell>
                </TableRow>
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell} colSpan={6}>
                        <div className={this.props.classes.divider}></div>
			        </TableCell>
                </TableRow>
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell} colSpan={6}>
                        <strong>Armor Class </strong>
                        <span>
                            {monster.armourClass.map((item, index) =>
                                {
                                    if (index + 1 === monster.armourClass.length) {
                                        if(item.armourSources != null && item.condition != null){
                                            return item.armourClass + " (" + item.armourSources + ") " + item.condition
                                        }
                                        else if(item.armourSources === null && item.condition != null){
                                            return item.armourClass + " " + item.condition
                                        }
                                        else if(item.armourSources != null && item.condition === null){
                                            return item.armourClass + " (" + item.armourSources + ")"
                                        }
                                        else
                                        {
                                            return item.armourClass
                                        }
                                    }
                                    else {
                                        if(item.armourSources != null && item.condition != null){
                                            return item.armourClass + " (" + item.armourSources + ") " + item.condition + ", "
                                        }
                                        else if(item.armourSources === null && item.condition != null){
                                            return item.armourClass + " " + item.condition + ", "
                                        }
                                        else if(item.armourSources != null && item.condition === null){
                                            return item.armourClass + " (" + item.armourSources + "), "
                                        }
                                        else
                                        {
                                            return item.armourClass + ", "
                                        }
                                    }
                                }
                            )}
                        </span>
                    </TableCell>
                </TableRow>
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell} colSpan={6}>
                        <strong>Hit Points </strong>
                        <span>{monster.hp.averageHp}</span><span className={this.props.classes.blue}>{" (" + monster.hp.numOfDice + "d" + monster.hp.sizeOfDie + flatBonus + ")"}</span>
                    </TableCell>
                </TableRow>
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell} colSpan={6}>
                        <strong>Speed </strong>
                        {speeds.map((item, index) =>
                            {
                                if(index + 1 === speeds.length){
                                    if (item.condition != null)
                                        return <span>{item.id} {item.speed}ft. {item.condition}</span>
                                    else
                                        return <span>{item.id} {item.speed}ft.</span>
                                } else {
                                    if (item.condition != null)
                                        return <span>{item.id} {item.speed}ft. {item.condition}, </span>
                                    else
                                        return <span>{item.id} {item.speed}ft., </span>
                                }
                            }
                        )}
                    </TableCell>
                </TableRow>
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell} colSpan={6}>
                        <div className={this.props.classes.divider}></div>
			        </TableCell>
                </TableRow>
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell2}>STR</TableCell>
                    <TableCell className={this.props.classes.tableCell2}>DEX</TableCell>
                    <TableCell className={this.props.classes.tableCell2}>CON</TableCell>
                    <TableCell className={this.props.classes.tableCell2}>INT</TableCell>
                    <TableCell className={this.props.classes.tableCell2}>WIS</TableCell>
                    <TableCell className={this.props.classes.tableCell2}>CHA</TableCell>
                </TableRow>
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell2}>
                        <span className={this.props.classes.blue}>
                            {monster.strength + " (" + this.getModifier(monster.strength) + ")"}
                        </span>
                    </TableCell>
                    <TableCell className={this.props.classes.tableCell2}>
                        <span className={this.props.classes.blue}>
                            {monster.dexterity + " (" + this.getModifier(monster.dexterity) + ")"}
                        </span>
                    </TableCell>
                    <TableCell className={this.props.classes.tableCell2}>
                        <span className={this.props.classes.blue}>
                            {monster.constitution + " (" + this.getModifier(monster.constitution) + ")"}
                        </span>
                    </TableCell>
                    <TableCell className={this.props.classes.tableCell2}>
                        <span className={this.props.classes.blue}>
                            {monster.intelligence + " (" + this.getModifier(monster.intelligence) + ")"}
                        </span>
                    </TableCell>
                    <TableCell className={this.props.classes.tableCell2}>
                        <span className={this.props.classes.blue}>
                            {monster.wisdom + " (" + this.getModifier(monster.wisdom) + ")"}
                        </span>
                    </TableCell>
                    <TableCell className={this.props.classes.tableCell2}>
                        <span className={this.props.classes.blue}>
                            {monster.charisma + " (" + this.getModifier(monster.charisma) + ")"}
                        </span>
                    </TableCell>
                </TableRow>
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell} colSpan={6}>
                        <div className={this.props.classes.divider}></div>
			        </TableCell>
                </TableRow>
                {((saves.length) ?
                    <TableRow className={this.props.classes.row}>
                        <TableCell className={this.props.classes.tableCell} colSpan={6}>
                            <strong>Saving Throws </strong>
                           {saves.map((item, index) =>
                              {
                                if(index + 1 === saves.length){
                                    return <span>{item.id} <span className={this.props.classes.blue}>+{item.save}</span></span>
                                } else {
                                    return <span>{item.id} <span className={this.props.classes.blue}>+{item.save}</span>, </span>
                                }
                              }
                            )}
                        </TableCell>
                    </TableRow>
                : "" )}
                {((skills.length) ?
                    <TableRow className={this.props.classes.row}>
                        <TableCell className={this.props.classes.tableCell} colSpan={6}>
                            <strong>Skills </strong>
                           {skills.map((item, index) =>
                              {
                                if(index + 1 === skills.length){
                                    return <span>{item.id} <span className={this.props.classes.blue}>+{item.skill}</span></span>
                                } else {
                                    return <span>{item.id} <span className={this.props.classes.blue}>+{item.skill}</span>, </span>
                                }
                              }
                            )}
                        </TableCell>
                    </TableRow> 
                : "" )}
                {((monster.vulnerabilities.length) ?
                    <TableRow className={this.props.classes.row}>
                        <TableCell className={this.props.classes.tableCell} colSpan={6}>
                            <strong>Damage Vulnerabilities </strong>
                            {monster.vulnerabilities.map((item, index) =>
                                {
                                    if(index + 1 === monster.vulnerabilities.length){
                                        return <span>{item.damageType.toLowerCase()} {item.condition}</span>
                                    } else {
                                        if(item.condition != monster.vulnerabilities[index +1].condition)
                                        {
                                            if(item.condition === null)
                                                return <span>{item.damageType.toLowerCase()}; </span>
                                            else
                                                return <span>{item.damageType.toLowerCase()} {item.condition}; </span>
                                        }
                                        else
                                            return <span>{item.damageType.toLowerCase()}, </span>
                                    }
                                }
                            )}
                        </TableCell>
                    </TableRow>
                : "" )}
                {((monster.resistances.length) ?
                    <TableRow className={this.props.classes.row}>
                        <TableCell className={this.props.classes.tableCell} colSpan={6}>
                            <strong>Damage Resistances </strong>
                            {monster.resistances.map((item, index) =>
                                {
                                    if(index + 1 === monster.resistances.length){
                                        return <span>{item.damageType.toLowerCase()} {item.note}</span>
                                    } else {
                                        if(item.note != monster.resistances[index +1].note)
                                        {
                                            if(item.note === null)
                                                return <span>{item.damageType.toLowerCase()}; </span>
                                            else
                                                return <span>{item.damageType.toLowerCase()} {item.note}; </span>
                                        }
                                        else
                                            return <span>{item.damageType.toLowerCase()}, </span>
                                    }
                                }
                            )}
                        </TableCell>
                    </TableRow>
                : "" )}
                {((monster.immunities.length) ?
                    <TableRow className={this.props.classes.row}>
                        <TableCell className={this.props.classes.tableCell} colSpan={6}>
                            <strong>Damage Immunities </strong>
                            {monster.immunities.map((item, index) =>
                                {
                                    if(index + 1 === monster.immunities.length){
                                        return <span>{item.damageType.toLowerCase()} {item.condition}</span>
                                    } else {
                                        if(item.condition != monster.immunities[index +1].condition)
                                        {
                                            if(item.condition === null)
                                                return <span>{item.damageType.toLowerCase()}; </span>
                                            else
                                                return <span>{item.damageType.toLowerCase()} {item.condition}; </span>
                                        }
                                        else
                                            return <span>{item.damageType.toLowerCase()}, </span>
                                    }
                                }
                            )}
                        </TableCell>
                    </TableRow>
                : "" )}
                {((monster.conditionImmunity.length) ?
                    <TableRow className={this.props.classes.row}>
                        <TableCell className={this.props.classes.tableCell} colSpan={6}>
                            <strong>Condition Immunities </strong>
                            {monster.conditionImmunity.map((item, index) =>
                                {
                                    if(index + 1 === monster.conditionImmunity.length){
                                        return <span>{item.condition.toLowerCase()} {item.note}</span>
                                    } else {
                                        if(item.note != monster.conditionImmunity[index +1].note)
                                        {
                                            if(item.note === null)
                                                return <span>{item.condition.toLowerCase()}; </span>
                                            else
                                                return <span>{item.condition.toLowerCase()} {item.note}; </span>
                                        }
                                        else
                                            return <span>{item.condition.toLowerCase()}, </span>
                                    }
                                }
                            )}
                        </TableCell>
                    </TableRow>
                : "" )}
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell} colSpan={6}>
                        <strong>Senses </strong>
                            {monster.senses.map((item, index) =>
                                {
                                    return <span>{item}, </span>
                                }
                            )}
                            <span>passive Perception {monster.passivePerception}</span>
                    </TableCell>
                </TableRow>
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell} colSpan={6}>
                        <strong>Languages </strong>
                        {((monster.languages.length) ?
                            <span>
                            {monster.languages.map((item, index) =>
                              {
                                if(index + 1 === monster.languages.length){
                                    return <span>{item}</span>
                                } else {
                                    return <span>{item},</span>
                                }
                              }
                            )}
                            </span>
                        : <span>—</span> )}
                    </TableCell>
                </TableRow>
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell} colSpan={6}>
                        <strong>Challenge </strong>
                        <span>
                            {this.getRatio(monster.challengeRating.challengeRating)}
                            {(monster.challengeRating.coven != null) ? " or " + monster.challengeRating.coven + " when part of a coven" : ""}
                            {(monster.challengeRating.lair != null) ? " or " + monster.challengeRating.lair + " when encountered in lair" : ""}
                        </span>

                        <Button size="small" onClick={this.handleOpen} disabled={this.props.disabled}>
                            <TuneIcon />
                        </Button>
                        <Popover
                            open={open}
                            anchorEl={anchorEl}
                            onClose={this.handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <div style={{width: 500, margin: 10}}>
                                <RangeWithTooltip
                                    min={1}
                                    max={33}
                                    defaultValue={[monster.challengeRating.challengeRating]}
                                    onAfterChange={(v) => this.onSliderChange(monster, v)}
                                />
                            </div>
                        </Popover>
                    </TableCell>
                </TableRow>
                {((monster.trait.length) ?
                     this.getActions(monster.trait, "Traits")
                : "" )}
                {((!monster.trait.length && monster.innateSpellCasting.headerEntries.length) ?
                    <TableRow className={this.props.classes.row}>
                        <TableCell className={`this.props.classes.tableCell ${this.props.classes.titles}`} colSpan={6}>
                            <span>Traits</span>
                        </TableCell>
                    </TableRow>
                : "" )}
                {((monster.innateSpellCasting.headerEntries.length) ?
                    <TableRow className={this.props.classes.row}>
                        <TableCell className={this.props.classes.tableCell} colSpan={6}>
                            <div className={this.props.classes.InlineStats}>
                                <span className={this.props.classes.EntryTitle}>Innate Spellcasting. </span>
                                {
                                    monster.innateSpellCasting.headerEntries.map((item, index) => {
                                        return <span>{item}<br/></span>
                                    })
                                }

                                {((monster.innateSpellCasting.atWill.length) ?
                                    <span><span>At will: </span>
                                    {
                                        monster.innateSpellCasting.atWill.map((item, index) => {
                                            if (index + 1 === monster.innateSpellCasting.atWill.length)
                                                return (<span>{item}<br /></span>);
                                            else
                                                return (<span>{item}, </span>);
                                        })
                                    }
                                    </span>
                                : "" )}
                                {((monster.innateSpellCasting.one.length) ?
                                    <span><span>1/day: </span>
                                    {
                                        monster.innateSpellCasting.one.map((item, index) => {
                                            if (index + 1 === monster.innateSpellCasting.one.length)
                                                return (<span>{item}<br /></span>);
                                            else
                                                return (<span>{item}, </span>);
                                        })
                                    }
                                    </span>
                                : "" )}
                                {((monster.innateSpellCasting.oneEach.length) ?
                                    <span><span>1/day each: </span>
                                    {
                                        monster.innateSpellCasting.oneEach.map((item, index) => {
                                            if (index + 1 === monster.innateSpellCasting.oneEach.length)
                                                return (<span>{item}<br /></span>);
                                            else
                                                return (<span>{item}, </span>);
                                        })
                                    }
                                    </span>
                                : "" )}
                                {((monster.innateSpellCasting.two.length) ?
                                    <span><span>2/day: </span>
                                    {
                                        monster.innateSpellCasting.two.map((item, index) => {
                                            if (index + 1 === monster.innateSpellCasting.two.length)
                                                return (<span>{item}<br /></span>);
                                            else
                                                return (<span>{item}, </span>);
                                        })
                                    }
                                    </span>
                                : "" )}
                                {((monster.innateSpellCasting.twoEach.length) ?
                                    <span><span>2/day each: </span>
                                    {
                                        monster.innateSpellCasting.twoEach.map((item, index) => {
                                            if (index + 1 === monster.innateSpellCasting.twoEach.length)
                                                return (<span>{item}<br /></span>);
                                            else
                                                return (<span>{item}, </span>);
                                        })
                                    }
                                    </span>
                                : "" )}
                                {((monster.innateSpellCasting.three.length) ?
                                    <span><span>3/day: </span>
                                    {
                                        monster.innateSpellCasting.three.map((item, index) => {
                                            if (index + 1 === monster.innateSpellCasting.three.length)
                                                return (<span>{item}<br /></span>);
                                            else
                                                return (<span>{item}, </span>);
                                        })
                                    }
                                    </span>
                                : "" )}
                                {((monster.innateSpellCasting.threeEach.length) ?
                                    <span><span>3/day each: </span>
                                    {
                                        monster.innateSpellCasting.threeEach.map((item, index) => {
                                            if (index + 1 === monster.innateSpellCasting.threeEach.length)
                                                return (<span>{item}<br /></span>);
                                            else
                                                return (<span>{item}, </span>);
                                        })
                                    }
                                    </span>
                                : "" )}
                                {((monster.innateSpellCasting.footerEntries.length) ?
                                    <span>
                                    {
                                        monster.innateSpellCasting.footerEntries.map((item, index) => {
                                            if (index + 1 === monster.innateSpellCasting.footerEntries.length)
                                                return (<span>{item}<br /></span>);
                                            else
                                                return (<span>{item}, </span>);
                                        })
                                    }
                                    </span>
                                : "" )}
                            </div>
                        </TableCell>
                    </TableRow>
                : "" )}
                {((Array.isArray(monster.action) && monster.action.length) ?
                    this.getActions(monster.action, "Actions")
                : "" )}
                {((Array.isArray(monster.reaction) && monster.reaction.length) ?
                    this.getActions(monster.reaction, "Reactions")
                : "" )}
                {((Array.isArray(monster.legendaryAction) && monster.legendaryAction.length) ?
                    this.getActions(monster.legendaryAction, "Legendary Actions")
                : "" )}
                {((Array.isArray(monster.lairActions) && monster.lairActions.length) ?
                    this.getLairActions(monster.lairActions, "Lair Actions")
                : "" )}
                {((Array.isArray(monster.regionalEffects) && monster.regionalEffects.length) ?
                    this.getRegionalEffects(monster.regionalEffects, "Regional Effects")
                : "" )}
                {((Array.isArray(monster.variants) && monster.variants.length) ?
                    <TableRow className={this.props.classes.row}>
                        <TableCell className={this.props.classes.VariantBlock} colSpan={6}>
                            {
                                monster.variants.map(action => {
                                    return this.getVariant(action);
                                })
                            }
                        </TableCell>
                    </TableRow>
                : "" )}
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell} colSpan={4}>
                        <strong>Source: </strong>
                        <span>
                            {monster.bookSource.bookCode}, page {monster.bookSource.page}
                        </span>
                    </TableCell>
                    {((monster.environments.length) ?
                        <TableCell className={this.props.classes.tableCell} colSpan={2}>
                            <strong>Environment: </strong>
                            <span>
                                {monster.environments.map((item, index) =>
                                  {
                                    if(index + 1 === monster.environments.length){
                                        return <span>{item}</span>
                                    } else {
                                        return <span>{item}, </span>
                                    }
                                  }
                                )}
                            </span>
                         </TableCell>
                    : "" )}
                </TableRow>
            </TableBody>
        </Table>
        )
    }
}
export default withStyles(styles)(MonsterDetailsGrid);