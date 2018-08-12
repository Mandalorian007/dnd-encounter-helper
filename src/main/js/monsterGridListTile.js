const React = require('react');

import { withStyles } from "@material-ui/core/styles/index";
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Popover from '@material-ui/core/Popover';

const styles = theme => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});
class MonsterGridListTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monsterDetails: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(event) {
    this.setState({
      monsterDetails: event.currentTarget,
    });
  };

  handleClose() {
    this.setState({
      monsterDetails: null,
    });
  };

  render() {
    const monster = this.props.monster;
    // This is a "hack and pray" might be nice to actually download all the images from their repo
    //https://github.com/TheGiddyLimit/TheGiddyLimit.github.io/tree/master/img/MM
    //https://5etools.com/5etools.html
    const imageSrc = `https://5etools.com/img/MM/${monster.name}.png`;
    return (
      <GridListTile>
        <img src={imageSrc} alt={monster.name} height={300} width={250} />
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
            <IconButton className={this.props.classes.icon} onClick={this.handleClick}>
              <InfoIcon/>
            </IconButton>
          }
        />
        <Popover
          open={Boolean(this.state.monsterDetails)}
          anchorEl={this.state.monsterDetails}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <span>{JSON.stringify(monster)}</span>
        </Popover>
      </GridListTile>
    )
  }
}

export default withStyles(styles)(MonsterGridListTile);