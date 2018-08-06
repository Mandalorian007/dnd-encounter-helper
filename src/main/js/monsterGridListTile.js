const React = require('react');

import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

class MonsterGridListTile extends React.Component {

  render() {
    const monster = this.props.monster;
    return (
      <GridListTile key={ monster.id }>
        { /* TODO some sort of cool image look up?*/ }
        <img src="https://a.wattpad.com/useravatar/TheAbolethQueen.128.395567.jpg" alt={monster.name}/>
        <GridListTileBar
          title={ monster.name }
          subtitle={
            <span>Some quick glance stats</span>
          }
          actionIcon={
            <IconButton>
              { /* TODO either a popup or hover over with tons of monster stats formatted nicely*/ }
              <InfoIcon/>
            </IconButton>
          }
        />
      </GridListTile>
    )
  }
}

export default MonsterGridListTile;