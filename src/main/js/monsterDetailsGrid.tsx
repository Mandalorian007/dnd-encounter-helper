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

    render() {
        const monster = this.props.monster;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const createSliderWithTooltip = Slider.createSliderWithTooltip;
        const RangeWithTooltip = createSliderWithTooltip(Slider.Range);

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
                                {monster.type + " "}
                                {(monster.subType != null && monster.subType != "") ? "(" + monster.subType + ")" : ""}
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
                        <span>{monster.armourClass}</span>
                    </TableCell>
                </TableRow>
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell} colSpan={6}>
                        <strong>Hit Points </strong>
                        <span>{monster.hitPoints}</span><span className={this.props.classes.blue}>{" (" + monster.hitDice + "+" + this.getModifier(monster.constitution) * monster.challengeRating + ")"}</span>
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
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell} colSpan={6}>
                        <strong>Saving Throws </strong>
                        {((monster.strengthSave != null) ? <span>Str <span className={this.props.classes.blue}>+{monster.strengthSave}</span>, </span> : "")}
                        {((monster.dexteritySave != null) ? <span>Dex <span className={this.props.classes.blue}>+{monster.dexteritySave}</span>, </span> : "")}
                        {((monster.constitutionSave != null) ? <span>Con <span className={this.props.classes.blue}>+{monster.constitutionSave}</span>, </span> : "")}
                        {((monster.intelligenceSave != null) ? <span>Int <span className={this.props.classes.blue}>+{monster.intelligenceSave}</span>, </span> : "")}
                        {((monster.wisdomSave != null) ? <span>Wis <span className={this.props.classes.blue}>+{monster.wisdomSave}</span>, </span> : "")}
                        {((monster.charismaSave != null) ? <span>Cha <span className={this.props.classes.blue}>+{monster.charismaSave}</span></span> : "")}
                    </TableCell>
                </TableRow>
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell} colSpan={6}>
                        <strong>Skills</strong><span>Perception +0</span>
                    </TableCell>
                </TableRow>
                {((monster.damageVulnerabilities != "") ?
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell} colSpan={6}>
                        <strong>Damage Vulnerabilities </strong><span>{monster.damageVulnerabilities}</span>
                    </TableCell>
                </TableRow>
                : "" )}
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell} colSpan={6}>
                        <strong>Damage Resistances</strong><span>cold</span>
                    </TableCell>
                </TableRow>
                {((monster.damageImmunities != "") ?
                    <TableRow className={this.props.classes.row}>
                        <TableCell className={this.props.classes.tableCell} colSpan={6}>
                            <strong>Damage Immunities </strong><span>{monster.damageImmunities}</span>
                        </TableCell>
                    </TableRow>
                : "" )}
                {((monster.condititonImmunities != "") ?
                    <TableRow className={this.props.classes.row}>
                        <TableCell className={this.props.classes.tableCell} colSpan={6}>
                            <strong>Condition Immunities </strong><span>{monster.condititonImmunities}</span>
                        </TableCell>
                    </TableRow>
                : "" )}
                {((monster.senses != "") ?
                    <TableRow className={this.props.classes.row}>
                        <TableCell className={this.props.classes.tableCell} colSpan={6}>
                            <strong>Senses </strong><span>{monster.senses}</span>
                        </TableCell>
                    </TableRow>
                : "" )}
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell} colSpan={6}>
                        <strong>Languages </strong><span>Common</span>
                    </TableCell>
                </TableRow>
                <TableRow className={this.props.classes.row}>
                    <TableCell className={this.props.classes.tableCell} colSpan={6}>
                        <strong>Challenge </strong><span>{monster.challengeRating}</span>
                        <Button size="small" onClick={this.handleOpen}>
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
                                    defaultValue={[monster.challengeRating]}
                                />
                            </div>
                        </Popover>
                    </TableCell>
                </TableRow>
                {((Array.isArray(monster.specialAbilities) && monster.specialAbilities.length) ?
                    this.getActions(monster.specialAbilities, "Special Abilities")
                : "" )}
                {((Array.isArray(monster.actions) && monster.actions.length) ?
                    this.getActions(monster.actions, "Actions")
                : "" )}
                {((Array.isArray(monster.legendaryActions) && monster.legendaryActions.length) ?
                    this.getActions(monster.legendaryActions, "Legendary Actions")
                : "" )}
            </TableBody>
        </Table>
        )
    }
}
export default withStyles(styles)(MonsterDetailsGrid);