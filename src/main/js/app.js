const React = require('react');
const ReactDOM = require('react-dom');


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

class App extends React.Component {
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
    const npcStyle = {
      margin: 10,
      backgroundColor: 'orange',
    };

    const playerStyle = {
      margin: 10,
      backgroundColor: 'blue',
    };

    const root = {
      width: '100%',
      marginTop: 10,
      overflowX: 'auto',
    };

    const table = {
      minWidth: 700,
    };

    return (
      <div>
        <Paper style={root}>
          <Table style={table}>
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
                      <Avatar style={combatant.npc ? npcStyle : playerStyle}>
                        {combatant.npc ? 'N' : 'P'}</Avatar>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {combatant.name}
                    </TableCell>
                    <TableCell>{combatant.armourClass}</TableCell>
                    <TableCell>{combatant.currentInitative}</TableCell>
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

ReactDOM.render(
  <App/>,
  document.getElementById('react')
);