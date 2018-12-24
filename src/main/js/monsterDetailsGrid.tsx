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
  EntryTitle: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});

interface State {
    expandedRows?: any; //TODO figure out type
    anchorEl?: any;
}

class MonsterDetailsGrid extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = this.initialState();
    };

    initialState = () => {
        return {
            expandedRows: [],
            anchorEl: null,
        };
    };

    getModifier = (abilityScore) => {
        return Math.floor((abilityScore-10)/2);
    };

    getActions = (actionList, subHeaderName) => {
        const rowId = "row-data-" + subHeaderName;
        if (Array.isArray(actionList) && actionList.length) {

            const itemRows = [
                <TableRow className={this.props.classes.row} key={rowId} onClick={() => this.handleRowClick(rowId)}>
                    <TableCell className={`this.props.classes.tableCell ${this.props.classes.titles}`} colSpan={6}>
                        <span>{subHeaderName}</span>
                    </TableCell>
                </TableRow>
            ];

            if(this.state.expandedRows.includes(rowId)) {
                itemRows.push(
                    <TableRow className={this.props.classes.row} key={rowId}>
                        <TableCell className={this.props.classes.tableCell} colSpan={6}>
                        {
                            actionList.map(action => {
                                return (
                                    <div className={this.props.classes.InlineStats}>
                                        <span className={this.props.classes.EntryTitle}>{action.name}. </span><span>{action.description}</span>
                                    </div>
                                )
                            })
                        }
                        </TableCell>
                    </TableRow>
                );
            }

            return itemRows;
        }
    };

    handleRowClick = (rowId) => {
        const currentExpandedRows = this.state.expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

        const newExpandedRows = isRowCurrentlyExpanded ?
			currentExpandedRows.filter(id => id !== rowId) :
			currentExpandedRows.concat(rowId);

        this.setState({expandedRows: newExpandedRows});
    };

    handleOpen = (event) => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
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

        const saves = [];
        const skills = [];

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
                                        return ", " + item.alignment
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
                            {monster.armourClass.map((item) =>
                              {
                                if(item.armourSources != null && item.armourSources != ""){
                                    return item.armourClass + " (" + item.armourSources + ")"
                                } else {
                                    return  item.armourClass
                                }
                              }
                            )}
                        </span>
                    </TableCell>
                </TableRow>
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell} colSpan={6}>
                        <strong>Hit Points </strong>
                        <span>{monster.hp.averageHp}</span><span className={this.props.classes.blue}>{" (" + monster.hp.numOfDice + "d" + monster.hp.sizeOfDie + " + " + monster.hp.flatBonus + ")"}</span>
                    </TableCell>
                </TableRow>
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell} colSpan={6}>
                        <strong>Speed </strong>
                        <span>{monster.speed}</span>
                    </TableCell>
                </TableRow>
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell} colSpan={6}>
                        <div className={this.props.classes.divider}></div>
			        </TableCell>
                </TableRow>
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell}>STR</TableCell>
                    <TableCell className={this.props.classes.tableCell}>DEX</TableCell>
                    <TableCell className={this.props.classes.tableCell}>CON</TableCell>
                    <TableCell className={this.props.classes.tableCell}>INT</TableCell>
                    <TableCell className={this.props.classes.tableCell}>WIS</TableCell>
                    <TableCell className={this.props.classes.tableCell}>CHA</TableCell>
                </TableRow>
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell}>
                        <span className={this.props.classes.blue}>
                            {monster.strength + " (+" + this.getModifier(monster.strength) + ")"}
                        </span>
                    </TableCell>
                    <TableCell className={this.props.classes.tableCell}>
                        <span className={this.props.classes.blue}>
                            {monster.dexterity + " (+" + this.getModifier(monster.dexterity) + ")"}
                        </span>
                    </TableCell>
                    <TableCell className={this.props.classes.tableCell}>
                        <span className={this.props.classes.blue}>
                            {monster.constitution + " (+" + this.getModifier(monster.constitution) + ")"}
                        </span>
                    </TableCell>
                    <TableCell className={this.props.classes.tableCell}>
                        <span className={this.props.classes.blue}>
                            {monster.intelligence + " (+" + this.getModifier(monster.intelligence) + ")"}
                        </span>
                    </TableCell>
                    <TableCell className={this.props.classes.tableCell}>
                        <span className={this.props.classes.blue}>
                            {monster.wisdom + " (+" + this.getModifier(monster.wisdom) + ")"}
                        </span>
                    </TableCell>
                    <TableCell className={this.props.classes.tableCell}>
                        <span className={this.props.classes.blue}>
                            {monster.charisma + " (+" + this.getModifier(monster.charisma) + ")"}
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
            </TableBody>
        </Table>
        )
    }
}
export default withStyles(styles)(MonsterDetailsGrid);