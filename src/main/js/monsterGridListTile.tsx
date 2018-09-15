import * as React from "react";

import {withStyles} from "@material-ui/core/styles/index";
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import MonsterDetailsGrid from "./monsterDetailsGrid"
import {Checkbox, FormControl, FormControlLabel, Input, InputLabel} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";

const styles = createStyles({
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

interface State {
    monsterDetails?: any; //TODO figure out type
    rollHp: boolean;
    numberOfEnemies?: number;
}

class MonsterGridListTile extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = this.initialState();
    }

    initialState = () => {
        return {
            monsterDetails: null,
            rollHp: false,
            numberOfEnemies: null,
        }
    };

    getModifier = (abilityScore) => {
        return Math.floor((abilityScore - 10) / 2);
    };

    handleClick = (event) => {
        this.setState({
            monsterDetails: event.currentTarget,
        });
    };

    changeNumberOfEnemies = (event) => {
        this.setState({
            numberOfEnemies: event.target.value,
        });
    };

    toggleRollHp = () =>{
        this.setState({
            rollHp: !this.state.rollHp,
        });
    };

    handleClose = () => {
        this.setState(this.initialState);
    };

    handleSubmit = () => {
        const componentState = this.state;
        const monster = this.props.monster;
        const hitDice = monster.hitDice.split("d");

        let combatantInfo = {
            name: monster.name,
            armourClass: monster.armourClass,
            initativeBonus: this.getModifier(monster.dexterity),
            passivePerception: monster.perceptionMod,
            npc: true,
            monsterId: monster.id,
        };
        if (componentState.rollHp) {
            //Roll Hp
            this.props.createNpcs(hitDice[0], hitDice[1], null, this.getModifier(monster.constitution), componentState.numberOfEnemies, combatantInfo);
        } else {
            //Fixed Hp
            this.props.createNpcs(null, null, monster.hitPoints, null, componentState.numberOfEnemies, combatantInfo);
        }
        this.handleClose();
        this.props.navigateBack();
    };

    render() {
        const monster = this.props.monster;
        // This is a "hack and pray" might be nice to actually download all the images from their repo
        //https://github.com/TheGiddyLimit/TheGiddyLimit.github.io/tree/master/img/MM
        //https://5etools.com/5etools.html
        const imageSrc = `https://5etools.com/img/MM/${monster.name}.png`;
        return (
            <GridListTile classes={{root: this.props.classes.tile}}>
                <img src={imageSrc} alt={monster.name} className={this.props.classes.imageThumbnail}
                     onClick={this.handleClick}/>
                <GridListTileBar
                    title={monster.name}
                    classes={{
                        root: this.props.classes.titleBar,
                    }}
                    subtitle={
                        <div className={this.props.classes.subTitle}>
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
                    open={Boolean(this.state.monsterDetails)}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    aria-describedby="form-dialog-description">
                    <DialogContent>
                        <MonsterDetailsGrid monster={monster} imageSrc={imageSrc}/>
                    </DialogContent>
                    <DialogActions>
                        <FormControl component="fieldset">
                            <InputLabel htmlFor="number-of-monsters">Number of Monsters</InputLabel>
                            <Input id="number-of-monsters" type="number" style={{width: 150}}
                                onChange={event => this.changeNumberOfEnemies(event)}/>
                        </FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox onChange={this.toggleRollHp}/>
                            }
                            label="Roll Monster HP"
                        />
                        <Button onClick={this.handleSubmit} color="primary">
                            Create Monsters
                        </Button>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </GridListTile>
        )
    }
}

export default withStyles(styles)(MonsterGridListTile);