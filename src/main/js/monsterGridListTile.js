const React = require('react');

import { withStyles } from "@material-ui/core/styles/index";
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import MonsterDetailsGrid from "./monsterDetailsGrid"

const styles = theme => ({
   titleBar: {
      height: 'auto',
      padding: '5px 5px',
    },
   tile: {
      width: '25%',
   },
   subTitle: {
       lineHeight: 'normal',
   },
   imageThumbnail: {
       display: 'flex',
       margin: 'auto',
       width: '93.5%',
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
      <GridListTile classes={{ root: this.props.classes.tile }}>
        <img src={imageSrc} alt={monster.name} className={this.props.classes.imageThumbnail} onClick={this.handleClick}/>
        <GridListTileBar
          title={ monster.name }
          classes={{
            root: this.props.classes.titleBar,
          }}
          subtitle={
            <div className={this.props.classes.subTitle} >
              <span>Size: {monster.size.toLowerCase()}</span>
              <br/>
              <span>Hp: {monster.hitPoints}</span>
              <br/>
              <span>AC: {monster.armourClass}</span>
              <br/>
              <span>CR: {monster.challengeRating}</span>
            </div>
          }
        />
        <Dialog
          open={ Boolean(this.state.monsterDetails) }
          onClose={ this.handleClose }
          aria-labelledby="form-dialog-title"
          aria-describedby="form-dialog-description">
          <DialogContent>
            <MonsterDetailsGrid monster={monster} imageSrc={imageSrc}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={ this.handleClose } color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </GridListTile>
    )
  }
}

export default withStyles(styles)(MonsterGridListTile);