import * as React from "react";

import {createStyles, Theme, withStyles} from "@material-ui/core/styles/index";
import MonsterGridListTile from "./monsterGridListTile";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import classNames from 'classnames';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import Slider from 'rc-slider';
import {API_ROOT} from "./api-config";

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
    ListItemClass: {
        paddingBottom: "0px",
        paddingLeft: "0px",
    },
    gridList: {
        width: "100%",
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: `${spacing.unit / 2}px ${spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(palette.type === 'light' ? palette.grey[300] : palette.grey[700], 0.08,),
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
});

const sizeSuggestions = [{value: 'Tiny', label: 'Tiny'}, {value: 'Small', label: 'Small' }, {value: 'Medium', label: 'Medium' }, {value: 'Large', label: 'Large' }, {value: 'Huge', label: 'Huge' }, {value: 'Gargantuan', label: 'Gargantuan' }];

const movementSuggestions = [{value: 'Walk', label: 'Walk'}, {value: 'Burrow', label: 'Burrow' }, {value: 'Climb', label: 'Climb' }, {value: 'Fly', label: 'Fly' }, {value: 'Swim', label: 'Swim' }];

const typeSuggestions = [{value: 'Aberration', label: 'Aberration'}, {value: 'Beast', label: 'Beast' }, {value: 'Celestial', label: 'Celestial' }, {value: 'Construct', label: 'Construct' },
{value: 'Dragon', label: 'Dragon' }, {value: 'Elemental', label: 'Elemental' }, {value: 'Fey', label: 'Fey' }, {value: 'Fiend', label: 'Fiend' }, {value: 'Giant', label: 'Giant' },
{value: 'Humanoid', label: 'Humanoid' }, {value: 'Monstrosity', label: 'Monstrosity' }, {value: 'Ooze', label: 'Ooze' }, {value: 'Plant', label: 'Plant' }, {value: 'Undead', label: 'Undead' }];

const alignmentSuggestions = [{value: 'Lawful Good', label: 'Lawful Good'}, {value: 'Neutral Good', label: 'Neutral Good' }, {value: 'Chaotic Good ', label: 'Chaotic Good ' },
{value: 'Lawful Neutral', label: 'Lawful Neutral' }, {value: 'Neutral', label: 'Neutral' }, {value: 'Chaotic Neutral', label: 'Chaotic Neutral' },
{value: 'Lawful Evil', label: 'Lawful Evil' }, {value: 'Neutral Evil', label: 'Neutral Evil' }, {value: 'Chaotic Evil', label: 'Chaotic Evil' }, {value: 'Unaligned', label: 'Unaligned' },
{value: 'ANY_NON_GOOD', label: 'ANY_NON_GOOD' }, {value: 'ANY_NON_LAWFUL', label: 'ANY_NON_LAWFUL' }, {value: 'ANY_CHAOTIC', label: 'ANY_CHAOTIC' }, {value: 'ANY_EVIL', label: 'ANY_EVIL' }, {value: 'ANY', label: 'ANY' }];

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  Option,
  Placeholder,
  ValueContainer,
};

interface State {
    monsterSearch: MonsterSearch;
    toggleOptions: ToggleOptions;
    monsters: Monster[];
}

interface MonsterSearch {
    partialName?: string;
    sizes?: Size[];
    types?: Type[];
    movements?: Speed[];
    alignments?: Alignment[];
    hitPoints: Range;
    armourClass: Range;
    challengeRating: Range;
}

interface Range {
    lowerBound: number;
    upperBound: number;
}

interface ToggleOptions {
    hitPointsDisabled: string;
    armourClassDisabled: string;
    challengeDisabled: string;
}

class NewNpcsFromTemplateForm extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = this.initialState();
    };

    initialState = () => {
        return {
            monsterSearch: {
                partialName: null,
                sizes: [],
                types: [],
                movements: [],
                alignments: [],
                hitPoints: {
                    lowerBound: 1,
                    upperBound: 700,
                },
                armourClass: {
                    lowerBound: 5,
                    upperBound: 25,
                },
                challengeRating: {
                    lowerBound: 1,
                    upperBound: 33,
                },
            },
            toggleOptions: {
                hitPointsDisabled: '',
                armourClassDisabled: '',
                challengeDisabled: '',
            },
            monsters: [],
        };
    };

    componentDidMount = () => {
        this.refreshMonsterSearchState(this.state.monsterSearch);
    };

    refreshMonsterSearchState = (monsterSearch) => {
        const apiChallengeRatingRange = this.getChallengeRatingAPI(
            monsterSearch.challengeRating.lowerBound,
            monsterSearch.challengeRating.upperBound);

        const monsterSearchClone: MonsterSearch = JSON.parse(JSON.stringify(monsterSearch));
        monsterSearchClone.challengeRating.lowerBound = apiChallengeRatingRange[0];
        monsterSearchClone.challengeRating.upperBound = apiChallengeRatingRange[apiChallengeRatingRange.length-1];

        let SizeArray = [];
        let TypeArray = [];
        let MovementArray = [];
        let AlignmentArray = [];

        monsterSearch.sizes.map((item, index) => {
              SizeArray.push(item.value);
        });
        monsterSearchClone.sizes = SizeArray;

        monsterSearch.types.map((item, index) => {
            TypeArray.push(item.value);
        });
        monsterSearchClone.types = TypeArray;

        monsterSearch.movements.map((item, index) => {
            MovementArray.push(item.value);
        });
        monsterSearchClone.movements = MovementArray;

        monsterSearch.alignments.map((item, index) => {
            AlignmentArray.push(item.value);
        });
        monsterSearchClone.alignments = AlignmentArray;

        fetch(`${API_ROOT}/monsters/search`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(monsterSearchClone)
        }).catch(err => err)
            .then(results => results.json())
            .then(data => this.setState({ monsters: data }));
    };

    searchNameAdjustment = (event) => {
        let monsterSearch = this.state.monsterSearch;
        monsterSearch.partialName = event.target.value;
        this.setState({monsterSearch: monsterSearch});
        this.refreshMonsterSearchState(monsterSearch);
    };

    searchSizeAdjustment = (sizes) => {
        let monsterSearch = this.state.monsterSearch;
        monsterSearch.sizes = sizes;
        this.setState({monsterSearch: monsterSearch});
        this.refreshMonsterSearchState(monsterSearch);
    };

    searchTypeAdjustment = (types) => {
        let monsterSearch = this.state.monsterSearch;
        monsterSearch.types = types;
        this.setState({monsterSearch: monsterSearch});
        this.refreshMonsterSearchState(monsterSearch);
    };

    searchMovementAdjustment = (movements) => {
        let monsterSearch = this.state.monsterSearch;
        monsterSearch.movements = movements;
        this.setState({monsterSearch: monsterSearch});
        this.refreshMonsterSearchState(monsterSearch);
    };

    searchAlignmentAdjustment = (alignments) => {
        let monsterSearch = this.state.monsterSearch;
        monsterSearch.alignments = alignments;
        this.setState({monsterSearch: monsterSearch});
        this.refreshMonsterSearchState(monsterSearch);
    };

    searchSliderAdjustment = (event, checked) => {
        let monsterSearch = this.state.monsterSearch;
        let toggleOptions = this.state.toggleOptions;

        if (event.target.id == "armour-class")
        {
            if (!checked) {
                monsterSearch.armourClass = {lowerBound: 5, upperBound: 25};
                toggleOptions.armourClassDisabled = '';
            } else {
                toggleOptions.armourClassDisabled = 'enabled';
            }
        }
        else if (event.target.id == "hit-points")
        {
            if (!checked) {
                monsterSearch.hitPoints = {lowerBound: 1, upperBound: 700};
                toggleOptions.hitPointsDisabled = '';
            } else {
                toggleOptions.hitPointsDisabled = 'enabled';
            }
        }
        else if (event.target.id == "challenge-rating")
        {
            if (!checked) {
                monsterSearch.challengeRating = {lowerBound: 0, upperBound: 33};
                toggleOptions.challengeDisabled = '';
            } else {
                toggleOptions.challengeDisabled = 'enabled';
            }
        }

        this.setState({monsterSearch: monsterSearch});
        this.refreshMonsterSearchState(this.state.monsterSearch);
    };

    onSliderChange = (name, value) => {
        let monsterSearch = this.state.monsterSearch;

        if (name == "armour-class")
            monsterSearch.armourClass = {lowerBound: value[0], upperBound: value[1]};
        else if (name == "hit-points")
            monsterSearch.hitPoints = {lowerBound: value[0], upperBound: value[1]};
        else if (name == "challenge-rating")
            monsterSearch.challengeRating = {lowerBound: value[0], upperBound: value[1]};

        this.setState({monsterSearch: monsterSearch});
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
        const { sizes } = this.state.monsterSearch;
        const { types } = this.state.monsterSearch;
        const { movements } = this.state.monsterSearch;
        const { alignments } = this.state.monsterSearch;

        return (
            <div>
                <Grid container>
                    <Grid item xs={9}>
                        <div className={this.props.classes.root}>
                            <GridList className={this.props.classes.gridList}>
                                {
                                    this.state.monsters.map(monster => {
                                        return <MonsterGridListTile key={ monster.name } monster={ monster } createNpcs={this.props.createNpcs} navigateBack={this.props.navigateBack}/>
                                    })
                                }
                            </GridList>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth component={"fieldset" as "div"} className={this.props.classes.formControl}>
                            <InputLabel htmlFor="name">Monster Name</InputLabel>
                            <Input id="name" onChange={this.searchNameAdjustment} />
                        </FormControl>
                        <FormControl fullWidth component={"fieldset" as "div"} className={this.props.classes.formControl}>
                            <Select
                                classes={this.props.classes}
                                textFieldProps={{
                                    InputLabelProps: {
                                        shrink: true,
                                    },
                                }}
                                options={sizeSuggestions}
                                components={components}
                                value={sizes}
                                onChange={this.searchSizeAdjustment}
                                placeholder="Select multiple sizes"
                                isMulti
                            />
                        </FormControl>
                        <FormControl fullWidth component={"fieldset" as "div"} className={this.props.classes.formControl}>
                            <Select
                                classes={this.props.classes}
                                textFieldProps={{
                                    InputLabelProps: {
                                        shrink: true,
                                    },
                                }}
                                options={typeSuggestions}
                                components={components}
                                value={types}
                                onChange={this.searchTypeAdjustment}
                                placeholder="Select multiple types"
                                isMulti
                            />
                        </FormControl>
                        <FormControl fullWidth component={"fieldset" as "div"} className={this.props.classes.formControl}>
                            <Select
                                classes={this.props.classes}
                                textFieldProps={{
                                    InputLabelProps: {
                                        shrink: true,
                                    },
                                }}
                                options={movementSuggestions}
                                components={components}
                                value={movements}
                                onChange={this.searchMovementAdjustment}
                                placeholder="Select multiple speeds"
                                isMulti
                            />
                        </FormControl>
                        <FormControl fullWidth component={"fieldset" as "div"} className={this.props.classes.formControl}>
                            <Select
                                classes={this.props.classes}
                                textFieldProps={{
                                    InputLabelProps: {
                                        shrink: true,
                                    },
                                }}
                                options={alignmentSuggestions}
                                components={components}
                                value={alignments}
                                onChange={this.searchAlignmentAdjustment}
                                placeholder="Select multiple alignments"
                                isMulti
                            />
                        </FormControl>
                        <List className={this.props.classes.ListClass}>
                            <ListItem className={this.props.classes.ListItemClass}>
                                <FormLabel component={"legend" as "div"}>Hit Points</FormLabel>
                            </ListItem>
                            <ListItem style={{padding: "0px"}}>
                                <FormControlLabel
                                    control={
                                        <Checkbox id="hit-points" onChange={ this.searchSliderAdjustment }/>
                                    }
                                    label=""
                                />
                                <RangeWithTooltip
                                    min={1}
                                    max={700}
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
                                <FormLabel component={"legend" as "div"}>Armour Class</FormLabel>
                            </ListItem>
                            <ListItem style={{padding: "0px"}}>
                                <FormControlLabel
                                    control={
                                        <Checkbox id="armour-class" onChange={ this.searchSliderAdjustment }/>
                                    }
                                    label=""
                                />
                                <RangeWithTooltip
                                    min={5}
                                    max={25}
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
                                <FormLabel component={"legend" as "div"}>Challenge Rating</FormLabel>
                            </ListItem>
                            <ListItem style={{padding: "0px"}}>
                                <FormControlLabel
                                    control={
                                        <Checkbox id="challenge-rating" onChange={ this.searchSliderAdjustment } />
                                    }
                                    label=""
                                />
                                <RangeWithTooltip
                                    min={1}
                                    max={33}
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