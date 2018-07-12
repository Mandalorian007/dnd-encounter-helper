const React = require('react');
const ReactDOM = require('react-dom');

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
        <ul>
          {
            this.state.monsters.map(monster =>
            <li key={monster.id}>{monster.name}</li>)
          }
        </ul>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('react')
);