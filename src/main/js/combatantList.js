const React = require('react');

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

const combatantStyles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
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
    this.state={combatants: []};
  }

  componentDidMount() {
    fetch(`http://localhost:8080/combatants`)
      .then(results => results.json())
      .then(data => {
        this.setState({combatants: data});
      })
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
                <TableCell>Armour Class</TableCell>
                <TableCell>Current Initiative</TableCell>
                <TableCell>Current HP</TableCell>
                <TableCell>Max HP</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.combatants.map(combatant => {
                return (
                  <TableRow key={combatant.id}>
                    <TableCell>
                      <Avatar className={combatant.npc ? this.props.classes.npcStyle : this.props.classes.playerStyle}>
                        {combatant.npc ? 'N' : 'P'}</Avatar>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {combatant.name}
                    </TableCell>
                    <TableCell>{combatant.armourClass}</TableCell>
                    <TableCell>{combatant.currentInitiative}</TableCell>
                    <TableCell>{combatant.currentHp}</TableCell>
                    <TableCell>{combatant.maxHp}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}
export const CombatantList = withStyles(combatantStyles)(CombatantListUnstyled);