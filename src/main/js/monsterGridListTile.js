const React = require('react');

import { withStyles } from "@material-ui/core/styles/index";
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});
class MonsterGridListTile extends React.Component {
  render() {
    const monster = this.props.monster;
    return (
      <GridListTile>
        { /* TODO some sort of cool image look up?*/ }
        <img src="https://a.wattpad.com/useravatar/TheAbolethQueen.128.395567.jpg" alt={monster.name} height={300} width={250}/>
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

export default withStyles(styles)(MonsterGridListTile);