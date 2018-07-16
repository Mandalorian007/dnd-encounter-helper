const React = require('react');
const ReactDOM = require('react-dom');

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={monsters: []};
  }

  componentDidMount() {
    fetch(`http://localhost:8080/monsters`)
      .then(results => results.json())
      .then(data => {
        console.log(data.content)
        this.setState({monsters: data.content});
      })
  }

  render() {
    return (
      <div>
        <div>Hi</div>
        <List>
          {
            this.state.monsters.map(monster =>
            <ListItem key={monster.id}>{monster.name}</ListItem>)
          }
        </List>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('react')
);