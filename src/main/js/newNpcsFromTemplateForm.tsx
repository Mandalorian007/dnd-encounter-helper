import * as React from "react";

import {createStyles, Theme, withStyles} from "@material-ui/core/styles/index";
import MonsterGridListTile from "./monsterGridListTile";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Slider from 'rc-slider';

const styles = ({ palette, spacing }: Theme) => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: palette.background.paper,
  },
   formControl: {
      margin: spacing.unit * 3,
      marginBottom: "auto",
    },
    ListClass: {
        marginLeft: "24px",
    },
    ListItemClass:{
        paddingBottom: "0px",
        paddingLeft: "0px",
    },
});

interface State {
    monsterSearch: MonsterSearch;
    toggleOptions: ToggleOptions;
    monsters: Monster[];
}

interface MonsterSearch {
    partialName?: string;
    sizes?: Size[];
    hitPoints: Range;
    armourClass: Range;
    challengeRating: Range;
}

interface Range {
    lowerBound: number;
    upperBound: number;
}

interface ToggleOptions {
    hitPointsDisabled: string,
    armourClassDisabled: string,
    challengeDisabled: string,
}

class NewNpcsFromTemplateForm extends React.Component<any, State> {
    constructor(props: any) {
        super(props);

        this.state = this.initialState();
    };

    componentDidMount() {
        this.refreshMonsterSearchState(this.state.monsterSearch);
    };

    initialState = () => {
        return {
            monsterSearch: {
                partialName: null,
                sizes: [],
                hitPoints: {
                    lowerBound: 1,
                    upperBound: 700
                },
                armourClass: {
                    lowerBound: 5,
                    upperBound: 25
                },
                challengeRating: {
                    lowerBound: 1,
                    upperBound: 33
                },
            },
            toggleOptions: {
                hitPointsDisabled : '',
                armourClassDisabled: '',
                challengeDisabled: '',
            },
            monsters: [],
        };
    };

    refreshMonsterSearchState = (monsterSearch) => {
        fetch(`http://localhost:8080/monsters/search`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(monsterSearch)
        })
            .then(results => results.json())
            .then(data => this.setState({ monsters: data }));
    };

    searchNameAdjustment = (event) => {
        let monsterSearch = this.state.monsterSearch;
        monsterSearch.partialName = event.target.value;
        this.setState({ monsterSearch: monsterSearch });
        this.refreshMonsterSearchState(monsterSearch);
    };

    searchSizeAdjustment = (searchSize: Size) => {
        let monsterSearch = this.state.monsterSearch;
        let sizes = monsterSearch.sizes;

        console.log(searchSize);
        if (sizes.includes(searchSize)) {
            sizes = sizes.filter(size => size != searchSize);
        } else {
            sizes.push(searchSize);
        }
        monsterSearch.sizes = sizes;
        this.setState({ monsterSearch: monsterSearch });
        this.refreshMonsterSearchState(monsterSearch);
    };

    searchSliderAdjustment = (event, checked) =>{
        let monsterSearch = this.state.monsterSearch;
        let toggleOptions = this.state.toggleOptions;

        if (event.target.id == "armour-class")
        {
            if (!checked)
            {
                monsterSearch.armourClass =  { lowerBound: 5, upperBound: 25};
                toggleOptions.armourClassDisabled = '';
            }
            else
            {
                toggleOptions.armourClassDisabled = 'enabled';
            }
        }
        else if (event.target.id == "hit-points")
        {
            if (!checked)
            {
                monsterSearch.hitPoints = { lowerBound: 1, upperBound: 700};
                toggleOptions.hitPointsDisabled = '';
            }
            else
            {
                toggleOptions.hitPointsDisabled = 'enabled';
            }
        }
        else if (event.target.id == "challenge-rating")
        {
            if (!checked)
            {
                monsterSearch.challengeRating =  { lowerBound: 0, upperBound: 33};
                toggleOptions.challengeDisabled = '';
            }
            else
            {
                toggleOptions.challengeDisabled = 'enabled';
            }
        }

        this.setState({ monsterSearch: monsterSearch });
        this.refreshMonsterSearchState(this.state.monsterSearch);
    };

    onSliderChange = (name, value) => {
        let monsterSearch = this.state.monsterSearch;

        if (name == "armour-class")
            monsterSearch.armourClass = { lowerBound: value[0], upperBound: value[1]};
        else if (name == "hit-points")
            monsterSearch.hitPoints = { lowerBound: value[0], upperBound: value[1]};
        else if (name == "challenge-rating")
            monsterSearch.challengeRating = { lowerBound: value[0], upperBound: value[1]};

        this.setState({ monsterSearch: monsterSearch });
        this.refreshMonsterSearchState(this.state.monsterSearch);
    };

    getChallengeRatingDisplay = (pos) =>{
        const cr = ["0", "1/3", "1/4", "1/2", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"];
        return cr[pos - 1];
    };

    getChallengeRatingAPI = (start, end) => {
        const cr = [0.0, 0.125, 0.25, 0.5, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 19.0, 20.0, 21.0, 22.0, 23.0, 24.0, 25.0, 26.0, 27.0, 28.0, 29.0, 30.0];
        return cr.slice(start - 1, end - 1);
    };

    render() {
        const createSliderWithTooltip = Slider.createSliderWithTooltip;
        const RangeWithTooltip = createSliderWithTooltip(Slider.Range);

        const sizes = ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"];
        return (
            <div>
                <Grid container>
                    <Grid item xs={ 9 }>
                        <div className={this.props.classes.root}>
                            <GridList >
                                <GridListTile key="Subheader" cols={ 2 } style={ { height: 'auto' } }>
                                    <ListSubheader component="div">Monsters</ListSubheader>
                                </GridListTile>
                                {
                                    this.state.monsters.map(monster => {
                                        return <MonsterGridListTile key={ monster.name } monster={ monster } createNpcs={this.props.createNpcs} navigateBack={this.props.navigateBack}/>
                                    })
                                }
                            </GridList>
                        </div>
                    </Grid>
                    <Grid item xs={ 3 }>
                        <FormControl fullWidth component="fieldset" className={this.props.classes.formControl}>
                            <InputLabel htmlFor="name">Monster Name</InputLabel>
                            <Input id="name" onChange={ this.searchNameAdjustment } style={{marginRight: "24px" }}/>
                        </FormControl>
                        <FormControl component="fieldset" className={this.props.classes.formControl}>
                            <FormLabel component="legend">Size</FormLabel>
                            <FormGroup>
                                {
                                    sizes.map((size: Size) => {
                                        return (
                                            <FormControlLabel
                                                key={ size }
                                                control={
                                                    <Checkbox id={ size } onChange={ () => this.searchSizeAdjustment(size) }/>
                                                }
                                                label={ size }
                                            />
                                        )
                                    })
                                }
                            </FormGroup>
                        </FormControl>

                        <List className={this.props.classes.ListClass}>
                            <ListItem className={this.props.classes.ListItemClass}>
                                <FormLabel component="legend">Hit Points</FormLabel>
                            </ListItem>
                            <ListItem style={{padding: "0px"}}>
                                <FormControlLabel
                                    control={
                                        <Checkbox id="hit-points" onChange={ this.searchSliderAdjustment }/>
                                    }
                                    label=""
                                />
                                <RangeWithTooltip
                                    min={ 1 }
                                    max={ 700 }
                                    defaultValue={[
                                        this.state.monsterSearch.hitPoints.lowerBound,
                                        this.state.monsterSearch.hitPoints.upperBound
                                    ]}
                                    allowCross={false}
                                    onAfterChange={(v) => this.onSliderChange('hit-points', v)}
                                    disabled={!this.state.toggleOptions.hitPointsDisabled}
                                />
                            </ListItem>
                            <ListItem className={this.props.classes.ListItemClass}>
                                <FormLabel component="legend">Armour Class</FormLabel>
                            </ListItem>
                            <ListItem style={{padding: "0px"}}>
                                <FormControlLabel
                                    control={
                                        <Checkbox id="armour-class" onChange={ this.searchSliderAdjustment }/>
                                    }
                                    label=""
                                />
                                <RangeWithTooltip
                                    min={ 5 }
                                    max={ 25 }
                                    defaultValue={[
                                        this.state.monsterSearch.armourClass.lowerBound,
                                        this.state.monsterSearch.armourClass.upperBound
                                    ]}
                                    allowCross={false}
                                    onAfterChange={(v) => this.onSliderChange('armour-class', v)}
                                    disabled={!this.state.toggleOptions.armourClassDisabled}
                                />
                            </ListItem>
                            <ListItem className={this.props.classes.ListItemClass}>
                                <FormLabel component="legend">Challenge Rating</FormLabel>
                            </ListItem>
                            <ListItem style={{padding: "0px"}}>
                                <FormControlLabel
                                    control={
                                        <Checkbox id="challenge-rating" onChange={ this.searchSliderAdjustment } />
                                    }
                                    label=""
                                />
                                <RangeWithTooltip
                                    min={ 1 }
                                    max={ 33 }
                                    defaultValue={[
                                        this.state.monsterSearch.challengeRating.lowerBound,
                                        this.state.monsterSearch.challengeRating.upperBound
                                    ]}
                                    allowCross={false}
                                    onAfterChange={(v) => this.onSliderChange('challenge-rating', v)}
                                    disabled={!this.state.toggleOptions.challengeDisabled}
                                    tipFormatter={ value => this.getChallengeRatingDisplay(value) }
                                />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default withStyles(styles)(NewNpcsFromTemplateForm);