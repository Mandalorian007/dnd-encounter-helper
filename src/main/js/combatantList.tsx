import * as React from "react";

import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import * as math from 'mathjs';
import NewRoundForm from "./newRoundForm";

const combatantStyles = ({  spacing }: Theme) => createStyles({
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
class CombatantList extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state={
        open: false,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleOpen() {
    this.setState({open: true})
  }

  handleClose() {
    this.setState({open: false})
  }

  handleKeyPress(index, dataType, e) {
      if (e.keyCode === 13) {
        let x = math.eval(e.target.value);
        this.props.handleChange(index, dataType, x)
      }
   }

  render() {
    return (
      <div>
        <Paper className={this.props.classes.root}>
          <Table className={this.props.classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Current Initiative</TableCell>
                <TableCell>Armour Class</TableCell>
                <TableCell>Current HP</TableCell>
                <TableCell>Max HP</TableCell>
                <TableCell>Comments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.combatants.map((combatant, index) => {
                return (
                  <TableRow key={combatant.id}>
                    <TableCell>
                      <Avatar className={combatant.npc ? this.props.classes.npcStyle : this.props.classes.playerStyle}>
                        {combatant.npc ? 'N' : 'P'}</Avatar>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {combatant.name}
                    </TableCell>
                    <TableCell>{combatant.currentInitiative}</TableCell>
                    <TableCell>{combatant.armourClass}</TableCell>
                    <TableCell><input type='text' onChange={(e) => this.props.handleChange(index, "currentHp", e.target.value)}
                                     value={this.props.combatants[index].currentHp}  onKeyDown={(e) => this.handleKeyPress(index, "currentHp", e)} /></TableCell>
                    <TableCell>{combatant.maxHp}</TableCell>
                    <TableCell>{combatant.comment}</TableCell>
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
export default withStyles(combatantStyles)(CombatantList);