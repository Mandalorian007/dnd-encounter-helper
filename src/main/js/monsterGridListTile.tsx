import * as React from "react";

import {withStyles} from "@material-ui/core/styles/index";
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import MonsterDetailsGrid from "./monsterDetailsGrid"
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import createStyles from "@material-ui/core/styles/createStyles";
import * as math from 'mathjs';

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
    };

    initialState = () => {
        return {
            monsterDetails: null,
            rollHp: false,
            numberOfEnemies: null,
        };
    };

    getModifier = (abilityScore) => {
        return Math.floor((abilityScore - 10) / 2);
    };

    handleClick = (event) => {
        this.setState({monsterDetails: event.currentTarget});
    };

    changeNumberOfEnemies = (event) => {
        this.setState({numberOfEnemies: event.target.value});
    };

    toggleRollHp = () => {
        this.setState({rollHp: !this.state.rollHp});
    };

    handleClose = () => {
        this.setState(this.initialState);
    };

    getRatio = (value) => {
        if (value % 1 != 0)
            return math.format(math.fraction(value), { fraction: 'ratio' });
        else
            return value;
    };

    handleSubmit = () => {
        const componentState = this.state;
        const monster = this.props.monster;
        let armourClass;

        monster.armourClass.map(function(item, index){
            if (index === 0)
                armourClass = item.armourClass;
        });

        let combatantInfo = {
            name: monster.name,
            armourClass: armourClass,
            initativeBonus: this.getModifier(monster.dexterity),
            passivePerception: monster.passivePerception,
            npc: true,
            monsterId: monster.id,
        };

        if (componentState.rollHp) {
            //Roll Hp
            this.props.createNpcs(monster.hp.numOfDice, monster.hp.sizeOfDie, null, this.getModifier(monster.constitution), componentState.numberOfEnemies, combatantInfo);
        } else {
            //Fixed Hp
            this.props.createNpcs(null, null, monster.hp.averageHp, null, componentState.numberOfEnemies, combatantInfo);
        }

        this.handleClose();
        this.props.navigateBack();
    };

    render() {
        const monster = this.props.monster;
        // This is a "hack and pray" might be nice to actually download all the images from their repo
        //https://github.com/TheGiddyLimit/TheGiddyLimit.github.io/tree/master/img/MM
        //https://5etools.com/5etools.html
        const imageSrc = `https://5etools.com/img/${monster.bookSource.bookCode}/${monster.name}.png`;
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
                            <span>Hp: {monster.hp.averageHp}</span>
                            <br/>
                            <span>AC:
                                {monster.armourClass.map((item, index) =>
                                    {
                                        if (index + 1 === monster.armourClass.length) {
                                            if (index != 0)
                                                return "(" + item.armourClass + ")"
                                            else
                                                return item.armourClass
                                        }
                                        else {
                                            if (index != 0)
                                                return "(" + item.armourClass + "), "
                                            else
                                                return item.armourClass + ", "
                                        }
                                    }
                                )}
                            </span>
                            <br/>
                            <span>CR: {this.getRatio(monster.challengeRating.challengeRating)}</span>
                        </div>
                    }
                />
                <Dialog
                    open={Boolean(this.state.monsterDetails)}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    aria-describedby="form-dialog-description">
                    <DialogContent>
                        <MonsterDetailsGrid disabled={false} monster={monster} imageSrc={imageSrc}/>
                    </DialogContent>
                    <DialogActions>
                        <ValidatorForm
                            ref="form"
                            onSubmit={this.handleSubmit}
                        >
                            <TextValidator
                                label="Number of Monsters"
                                name="number-of-monsters"
                                type="text"
                                style={{width: 150}}
                                onChange={event => this.changeNumberOfEnemies(event)}
                                value={this.state.numberOfEnemies}
                                validators={['required', 'isNumber', 'isPositive']}
                                errorMessages={['this field is required', 'Invalid Number', 'Number must be positive']}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox onChange={this.toggleRollHp}/>
                                }
                                label="Roll Monster HP"
                            />
                            <Button type="submit" color="primary">
                                Create Monsters
                            </Button>
                            <Button onClick={this.handleClose} color="secondary">
                                Cancel
                            </Button>
                        </ValidatorForm>
                    </DialogActions>
                </Dialog>
            </GridListTile>
        )
    }
}
export default withStyles(styles)(MonsterGridListTile);