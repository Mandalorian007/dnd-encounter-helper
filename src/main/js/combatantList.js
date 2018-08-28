import NewRoundForm from "./newRoundForm";

const React = require('react');

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Clear';
import InfoIcon from '@material-ui/icons/Info';
import * as math from 'mathjs';

const combatantStyles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
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
      backgroundColor: theme.palette.background.default,
    },
  },
});
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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
}))(TableCell);

class CombatantListUnstyled extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        open: false,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.computeClass = this.computeClass.bind(this);
  }

  handleOpen() {
    this.setState({open: true})
  }

  handleClose() {
    this.setState({open: false})
  }

  handleKeyPress(combatantId, dataType, e) {

       let newItem = 1;
       if (!isNaN(e.target.value)){
          this.props.combatants.map(item => {
              if (combatantId == item.id) {
                  newItem = item.maxHp;
              }
          });

          let val = math.eval(e.target.value / newItem);
          let textClass = this.computeClass(val);
          let newStyle = "0px 0px 40px 12px " + textClass;
          document.getElementById('row' + combatantId).style.boxShadow = newStyle;
       }

      if (e.keyCode === 13) {
        let value = math.eval(e.target.value);
        this.handleChange(combatantId, dataType, value)
      }
  }

  handleChange(combatantId, dataType, value) {
    let data = {[dataType]: value};
    if (!isNaN(value) || dataType == "comment")
        this.props.updateCombatant(combatantId, data);
  }

  computeClass(val) {
    if (val < 0.33)
        return 'red';
    else if (val < 0.66)
        return 'orange';
    else
        return 'green';
  }

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
              {this.props.combatants.map(combatant => {
                return (
                  <TableRow className={this.props.classes.row} key={combatant.id}>
                    <CustomTableCell>
                      <Avatar className={combatant.npc ? this.props.classes.npcStyle : this.props.classes.playerStyle}>
                        {combatant.npc ? 'N' : 'P'}</Avatar>
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {combatant.name}
                    </CustomTableCell>
                    <CustomTableCell><input type='text' onChange={(e) => this.handleChange(combatant.id, "currentInitiative", e.target.value)}
                                     value={combatant.currentInitiative} /></CustomTableCell>
                    <CustomTableCell><input type='text' onChange={(e) => this.handleChange(combatant.id, "armourClass", e.target.value)}
                                     value={combatant.armourClass} /></CustomTableCell>
                    <CustomTableCell>
                    <input type='text' id={"row" + combatant.id} onChange={(e) => this.handleChange(combatant.id, "currentHp", e.target.value)}
                                     value={combatant.currentHp} onKeyDown={(e) => this.handleKeyPress(combatant.id, "currentHp", e)} />
                    <span style={{paddingLeft: "10px"}}>/{combatant.maxHp}</span>
                    </CustomTableCell>
                    <CustomTableCell><input type='text' onChange={(e) => this.handleChange(combatant.id, "passivePerception", e.target.value)}
                                     value={combatant.passivePerception} /></CustomTableCell>
                    <CustomTableCell><textarea rows={3} onChange={(e) => this.handleChange(combatant.id, "comment", e.target.value)}
                                     value={combatant.comment} /></CustomTableCell>
                    <CustomTableCell>
                        <Button variant="fab" color="secondary" className={this.props.classes.button} onClick={(e) => this.props.deleteCombatant(combatant.id)}>
                            <DeleteIcon />
                        </Button>
                        <Button variant="fab" className={this.props.classes.button}>
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
      </div>
    )
  }
}
export const CombatantList = withStyles(combatantStyles)(CombatantListUnstyled);