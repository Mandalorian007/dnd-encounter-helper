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
    // This is a "hack and pray" might be nice to actually download all the images from their repo
    //https://github.com/TheGiddyLimit/TheGiddyLimit.github.io/tree/master/img/MM
    //https://5etools.com/5etools.html
    const imageSrc = `https://5etools.com/img/MM/${monster.name}.png`;
    return (
      <GridListTile>
        <img src={imageSrc} alt={monster.name} height={300} width={250}/>
        <GridListTileBar
          title={ monster.name }
          subtitle={
            <div>
              <span>Size: {monster.size.toLowerCase()}</span>
              <br/>
              <span>Hp: {monster.hitPoints}</span>
              <br/>
              <span>AC: {monster.armourClass}</span>
              <br/>
              <span>CR: {monster.challengeRating}</span>
            </div>
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