const React = require('react');
const ReactDOM = require('react-dom');

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class App extends React.Component {
  render() {
    return (
      <div>
      <h1>D&D Encounter Helper</h1>
      <StyledCombatantList/>
      <StyledCardGrid/>
    </div>
    )
  }
}

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
class CombatantList extends React.Component {
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
const StyledCombatantList = withStyles(combatantStyles)(CombatantList);

const gridStyles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 4,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});
class CardGrid extends React.Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={4}>
            <StyledNewRoundCard/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StyledNewFixedStatCombatant/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StyledNewNpcsFromTemplate/>
          </Grid>
        </Grid>
      </div>
    )
  }
}
const StyledCardGrid = withStyles(gridStyles)(CardGrid);


const cardStyle = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
class NewRoundCard extends React.Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <Card className={this.props.classes.card}>
          <CardContent>
            <Typography className={this.props.classes.title} color="textSecondary">
              New Round Wizard
            </Typography>
            <Typography className={this.props.classes.pos} color="textSecondary">
              This wizard will help you collect all the player initatives and re-roll all npc initatives automatically
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">New Round</Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}
const StyledNewRoundCard = withStyles(cardStyle)(NewRoundCard);

class NewFixedStatCombatant extends React.Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <Card className={this.props.classes.card}>
          <CardContent>
            <Typography className={this.props.classes.title} color="textSecondary">
              New Fixed Stat Combatant Wizard
            </Typography>
            <Typography className={this.props.classes.pos} color="textSecondary">
              This wizard will help you create either a new character or npc and add it to combat
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">New Round</Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}
const StyledNewFixedStatCombatant = withStyles(cardStyle)(NewFixedStatCombatant);

class NewNpcsFromTemplate extends React.Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <Card className={this.props.classes.card}>
          <CardContent>
            <Typography className={this.props.classes.title} color="textSecondary">
              New NPCs from template Wizard
            </Typography>
            <Typography className={this.props.classes.pos} color="textSecondary">
              This wizard will help you create groups of NPCs based off of monster templates
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">New Round</Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}
const StyledNewNpcsFromTemplate = withStyles(cardStyle)(NewNpcsFromTemplate);

ReactDOM.render(
  <App/>,
  document.getElementById('react')
);