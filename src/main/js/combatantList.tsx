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
import NewRoundForm from "./newRoundForm";
import * as math from 'mathjs';
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import MonsterDetailsGrid from "./monsterDetailsGrid";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {API_ROOT} from "./api-config";

const combatantStyles = ({ palette, spacing }: Theme) => createStyles({
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
    combatants?: any;
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
        }
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.combatants !== this.props.combatants){
             this.setState({ combatants: nextProps.combatants })
        }
    }

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    getMonsterDetails = (monsterId: string) => {
        fetch(`${API_ROOT}/monsters/` + monsterId)
            .then(results => results.json())
            .then(data => this.setState({monster: data}));
    };

    handleMonsterDetailsClose = () => {
      this.setState({monster: null});
    };

    handleKeyPress = (combatantId, dataType, e) =>{
        if (e.keyCode === 13) {
            let value = math.eval(e.target.value);
            this.handleChange(combatantId, dataType, value)
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
        let newStyle = "0px 0px 40px 12px " + color;
        return newStyle;
    };

    computeClass= (val) => {
        if (val < 0.33)
            return 'red';
        else if (val < 0.66)
            return 'orange';
        else
            return 'green';
    };

    getDetailContent = () => {
        if(this.state.monster != null) {
            return <MonsterDetailsGrid
                monster={this.state.monster}
                imageSrc={`https://5etools.com/img/MM/${this.state.monster.name}.png`}
            />;
        }
    };

    render() {
        return (
            <div>
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
                                return (
                                    <TableRow className={this.props.classes.row} key={combatant.id}>
                                        <CustomTableCell>
                                            <Avatar className={combatant.npc ? this.props.classes.npcStyle : this.props.classes.playerStyle}>
                                                {combatant.npc ? 'N' : 'P'}</Avatar>
                                        </CustomTableCell>
                                        <CustomTableCell component="th" scope="row">
                                            {combatant.name}
                                        </CustomTableCell>
                                        <CustomTableCell>{combatant.currentInitiative}</CustomTableCell>
                                        <CustomTableCell><input type='text' onChange={(e) => this.handleChange(combatant.id, "armourClass", e.target.value)}
                                                                value={combatant.armourClass} /></CustomTableCell>
                                        <CustomTableCell>
                                            <input type='text' id={"row" + combatant.id} style={{boxShadow: this.getHighlight(combatant.currentHp, combatant.maxHp)}} onChange={(e) => this.handleChange(combatant.id, "currentHp", e.target.value)}
                                                   value={combatant.currentHp} onKeyDown={(e) => this.handleKeyPress(combatant.id, "currentHp", e)} />
                                            <span style={{paddingLeft: "10px"}}>/{combatant.maxHp}</span>
                                        </CustomTableCell>
                                        <CustomTableCell><input type='text' onChange={(e) => this.handleChange(combatant.id, "passivePerception", e.target.value)}
                                                                value={combatant.passivePerception} /></CustomTableCell>
                                        <CustomTableCell><textarea rows={3} onChange={(e) => this.handleChange(combatant.id, "comment", e.target.value)}
                                                                   value={combatant.comment} /></CustomTableCell>
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
                <Button size="small" onClick={this.handleOpen} color="primary">New Round</Button>
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
