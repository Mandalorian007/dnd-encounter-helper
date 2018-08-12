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
});
class CombatantListUnstyled extends React.Component {
  constructor(props) {
    super(props);
    this.state={open: false};
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({open: true})
  }

  handleClose() {
    this.setState({open: false})
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
              {this.props.combatants.map(combatant => {
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
                    <TableCell>{combatant.currentHp}</TableCell>
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
export const CombatantList = withStyles(combatantStyles)(CombatantListUnstyled);