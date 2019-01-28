import * as React from "react";

import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, {TableCellProps} from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Clear';
import InfoIcon from '@material-ui/icons/Info';
import TextField from '@material-ui/core/TextField';
import NewRoundForm from "./newRoundForm";
import * as math from 'mathjs';
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import MonsterDetailsGrid from "./monsterDetailsGrid";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {API_ROOT} from "./api-config";

const combatantStyles = ({ palette, spacing }: Theme) => createStyles({
    root: {
        width: '95%',
        marginTop: spacing.unit,
        overflowX: 'auto',
        marginLeft: 'auto',
    },
    table: {
        minWidth: 700,
    },
    npcStyle: {
        margin: 10,
        color: '#fafafa',
        backgroundColor: palette.type === 'light' ? '#ffb93a' : 'rgb(169, 109, 0)',
    },
    playerStyle: {
        margin: 10,
        color: '#fafafa',
        backgroundColor: palette.type === 'light' ? '#6363ff' : 'rgb(0, 0, 145)',
    },
    button: {
        margin: '10px',
        width: '40px',
        height: '40px',
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: palette.background.default,
        },
    },
    selectedRow: {
      backgroundColor: palette.type === 'light' ? '#c2e4a3 !important' : 'rgb(52, 82, 24) !important',
    },
    newRound: {
        display: 'none',
    },
    nextCombatant: {
        position: 'absolute',
        left: '-5px',
    },
    relative: {
        position: 'relative',
    },
    textField: {
        backgroundColor: palette.background.paper,
        border: '.5px solid',
        width: '100px',
    },
});

const tableStyle = ({ palette }: Theme) => createStyles({
    head: {
        backgroundColor: palette.common.black,
        color: palette.common.white,
        padding: '5px',
        '&:first-child': {
            textAlign: 'center',
        },
    },
    body: {
        '&:last-child': {
            paddingRight: '5px',
        },
        "&> input[type='text']": {
            width: '100px',
        },
        "&> textarea": {
            width: '300px',
            verticalAlign: 'middle',
        },
        padding: '5px',
    },
});

const CustomTableCell = withStyles(tableStyle)(({ classes, children }: TableCellProps) => (
    <TableCell classes={classes}>{children}</TableCell>
));

interface State {
    open: boolean;
    monster?: Monster;
    combatants?: any; //TODO figure out type
}

class CombatantList extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = this.initialState();
    };

    initialState = () => {
        return {
            open: false,
            monster: null,
            combatants: [],
        };
    };

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.combatants !== this.props.combatants){
            this.setState({combatants: nextProps.combatants});
        }
    };

    componentWillMount = () => {
        this.setState({combatants: this.props.combatants});
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    getMonsterDetails = (monsterId: string) => {
        fetch(`${API_ROOT}/monsters/` + monsterId)
            .then(results => results.json())
            .then(data => this.setState({monster: data}));
    };

    handleMonsterDetailsClose = () => {
        this.setState({monster: null});
    };

    handleKeyPress = (combatantId, combatantMaxHP, dataType, e) => {
        if (e.keyCode === 13) {
            let value = math.eval(e.target.value);

            if (value > combatantMaxHP)
                value = combatantMaxHP;

            this.handleChange(combatantId, dataType, value);
        }
    };

    handleChange = (combatantId, dataType, value) => {
        let data = {[dataType]: value};

        //If a number or comment field updateCombatant
        if (!isNaN(value) || dataType == "comment") {
            this.props.updateCombatant(combatantId, data);
        }
        else {
            //if string adding - + , update state manually
            const newState = this.state.combatants.map(item => {
                if (item.id == combatantId) {
                    return {...item, [dataType]: value};
                }
                return item;
            });

            this.setState({combatants: newState});
        }
    };

    getHighlight = (currentHp, maxHp) => {
        let val = math.eval(currentHp / maxHp);
        let color = this.computeClass(val);
        return color;
    };

    computeClass = (val) => {
        if (val <= 0.25)
            return '#FF0000';
        else if (val <= 0.50)
            return '#FFB93A';
        else
            return '';
    };

    getPosition = () => {
        let x = 0;

        if (this.props.selected.length > 1)
            x = this.props.selected.length - 1;

        let y = x * 71;
        let value = y + 74;

        return value + 'px';
    };

    getDetailContent = () => {
        if(this.state.monster != null) {
            return <MonsterDetailsGrid
                disabled={true}
                monster={this.state.monster}
                imageSrc={`https://5etools.com/img/${this.state.monster.bookSource.bookCode}/${this.state.monster.name}.png`}
            />;
        }
    };

    nextSelectedRow = () => {
        if (this.props.selected.length) {
            const oldRow = this.props.selected[this.props.selected.length - 1];
            const newRow = this.combatantRows.findIndex(k => k == oldRow);

            let array = this.props.selected;
            array.push(this.combatantRows[newRow + 1]);

            if (newRow + 2 === this.combatantRows.length)
                this.props.updateSelectedRow(array, true);
            else
                this.props.updateSelectedRow(array, this.props.endOfRound);
        }
        else {
            this.props.updateSelectedRow([this.combatantRows[0]], this.props.endOfRound);
        }
    };

    combatantRows = [];

    render() {
        this.combatantRows = [];
        return (
            <div className={this.props.classes.relative}>
                <Paper className={this.props.classes.root}>
                    <Table className={this.props.classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Type</CustomTableCell>
                                <CustomTableCell>Name</CustomTableCell>
                                <CustomTableCell>Current Initiative</CustomTableCell>
                                <CustomTableCell>Armour Class</CustomTableCell>
                                <CustomTableCell>Current HP / Max HP</CustomTableCell>
                                <CustomTableCell>Perception</CustomTableCell>
                                <CustomTableCell>Comments</CustomTableCell>
                                <CustomTableCell></CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.combatants.map(combatant => {
                                this.combatantRows.push(combatant.id);
                                const isSelected = this.props.selected[this.props.selected.length - 1] === combatant.id;
                                return (
                                    <TableRow
                                        classes={{
                                            root: this.props.classes.row,
                                            selected: this.props.classes.selectedRow,
                                        }}
                                        key={combatant.id}
                                        aria-checked={isSelected}
                                        selected={isSelected}
                                    >
                                        <CustomTableCell>
                                            <Avatar className={combatant.npc ? this.props.classes.npcStyle : this.props.classes.playerStyle}>
                                                {combatant.npc ? 'N' : 'P'}</Avatar>
                                        </CustomTableCell>
                                        <CustomTableCell component="th" scope="row">
                                            {combatant.name}
                                        </CustomTableCell>
                                        <CustomTableCell>{combatant.currentInitiative}</CustomTableCell>
                                        <CustomTableCell>
                                            <TextField onChange={(e) => this.handleChange(combatant.id, "armourClass", e.target.value)}
                                                value={combatant.armourClass} className={this.props.classes.textField} />
                                        </CustomTableCell>
                                        <CustomTableCell>
                                            <TextField id={"row" + combatant.id} className={this.props.classes.textField} style={{backgroundColor: this.getHighlight(combatant.currentHp, combatant.maxHp)}} onChange={(e) => this.handleChange(combatant.id, "currentHp", e.target.value)}
                                                value={combatant.currentHp} onKeyDown={(e) => this.handleKeyPress(combatant.id, combatant.maxHp, "currentHp", e)} />
                                            <span style={{paddingLeft: "10px"}}>/{combatant.maxHp}</span>
                                        </CustomTableCell>
                                        <CustomTableCell>
                                            <TextField onChange={(e) => this.handleChange(combatant.id, "passivePerception", e.target.value)}
                                                value={combatant.passivePerception} className={this.props.classes.textField} />
                                        </CustomTableCell>
                                        <CustomTableCell>
                                            <TextField multiline rowsMax="3" onChange={(e) => this.handleChange(combatant.id, "comment", e.target.value)}
                                                value={combatant.comment} className={this.props.classes.textField} style={{width: "300px"}} />
                                        </CustomTableCell>
                                        <CustomTableCell>
                                            <Button variant="fab" color="secondary" className={this.props.classes.button} onClick={() => this.props.deleteCombatant(combatant.id)}>
                                                <DeleteIcon />
                                            </Button>
                                            <Button variant="fab" className={this.props.classes.button} onClick={() => this.getMonsterDetails(combatant.monsterId)} disabled={!Boolean(combatant.monsterId)}>
                                                <InfoIcon />
                                            </Button>
                                        </CustomTableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                <Button onClick={this.handleOpen} color="primary" style={{marginTop: 10}}>New Round</Button>
                <Button onClick={this.nextSelectedRow} color="secondary" className={this.props.endOfRound ? this.props.classes.newRound : this.props.classes.nextCombatant} style={{top: this.getPosition()}}>Next</Button>
                <NewRoundForm
                    combatants={this.props.combatants}
                    newRound={this.props.newRound}
                    open={this.state.open}
                    handleClose={this.handleClose}/>

                <Dialog
                    open={ Boolean(this.state.monster) }
                    onClose={ this.handleMonsterDetailsClose }
                    aria-labelledby="form-dialog-title"
                    aria-describedby="form-dialog-description">
                    <DialogContent>
                        {this.getDetailContent()}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ this.handleMonsterDetailsClose } color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default withStyles(combatantStyles)(CombatantList);
