"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const index_1 = require("@material-ui/core/styles/index");
const monsterGridListTile_1 = require("./monsterGridListTile");
const List_1 = require("@material-ui/core/List");
const ListItem_1 = require("@material-ui/core/ListItem");
const ListSubheader_1 = require("@material-ui/core/ListSubheader");
const Input_1 = require("@material-ui/core/Input");
const InputLabel_1 = require("@material-ui/core/InputLabel");
const FormLabel_1 = require("@material-ui/core/FormLabel");
const FormControl_1 = require("@material-ui/core/FormControl");
const FormGroup_1 = require("@material-ui/core/FormGroup");
const FormControlLabel_1 = require("@material-ui/core/FormControlLabel");
const Checkbox_1 = require("@material-ui/core/Checkbox");
const Grid_1 = require("@material-ui/core/Grid");
const GridList_1 = require("@material-ui/core/GridList");
const GridListTile_1 = require("@material-ui/core/GridListTile");
const rc_slider_1 = require("rc-slider");
const styles = ({ palette, spacing }) => index_1.createStyles({
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
});
class NewNpcsFromTemplateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState();
        this.searchNameAdjustment = this.searchNameAdjustment.bind(this);
        this.searchSizeAdjustment = this.searchSizeAdjustment.bind(this);
        this.searchSliderAdjustment = this.searchSliderAdjustment.bind(this);
        this.onSliderChange = this.onSliderChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.initialState = this.initialState.bind(this);
        this.getChallengeRatingDisplay = this.getChallengeRatingDisplay.bind(this);
        this.getChallengeRatingAPI = this.getChallengeRatingAPI.bind(this);
    }
    componentDidMount() {
        this.refreshMonsterSearchState(this.state.monsterSearch);
    }
    refreshMonsterSearchState(monsterSearch) {
        console.log(JSON.stringify(monsterSearch));
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
    }
    initialState() {
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
                    lowerBound: 0,
                    upperBound: 33
                },
                hitPointsDisabled: '',
                armourClassDisabled: '',
                challengeDisabled: ''
            },
            monsters: [],
        };
    }
    searchNameAdjustment(event) {
        let monsterSearch = this.state.monsterSearch;
        monsterSearch.partialName = event.target.value;
        this.setState({ monsterSearch: monsterSearch });
        this.refreshMonsterSearchState(monsterSearch);
    }
    searchSizeAdjustment(event) {
        let monsterSearch = this.state.monsterSearch;
        let sizes = monsterSearch.sizes;
        if (sizes.includes(event.target.id)) {
            sizes = sizes.filter(size => size != event.target.id);
        }
        else {
            sizes.push(event.target.id);
        }
        monsterSearch.sizes = sizes;
        this.setState({ monsterSearch: monsterSearch });
        this.refreshMonsterSearchState(monsterSearch);
    }
    searchSliderAdjustment(event, checked) {
        let monsterSearch = this.state.monsterSearch;
        if (event.target.id == "armour-class") {
            if (!checked) {
                monsterSearch.armourClass = { lowerBound: 5, upperBound: 25 };
                monsterSearch.armourClassDisabled = '';
            }
            else {
                monsterSearch.armourClassDisabled = 'enabled';
            }
        }
        else if (event.target.id == "hit-points") {
            if (!checked) {
                monsterSearch.hitPoints = { lowerBound: 1, upperBound: 700 };
                monsterSearch.hitPointsDisabled = '';
            }
            else {
                monsterSearch.hitPointsDisabled = 'enabled';
            }
        }
        else if (event.target.id == "challenge-rating") {
            if (!checked) {
                monsterSearch.challengeRating = { lowerBound: 0, upperBound: 33 };
                monsterSearch.challengeDisabled = '';
            }
            else {
                monsterSearch.challengeDisabled = 'enabled';
            }
        }
        this.setState({ monsterSearch: monsterSearch });
        this.refreshMonsterSearchState(this.state.monsterSearch);
    }
    onSliderChange(name, value) {
        let monsterSearch = this.state.monsterSearch;
        if (name == "armour-class")
            monsterSearch.armourClass = { lowerBound: value[0], upperBound: value[1] };
        else if (name == "hit-points")
            monsterSearch.hitPoints = { lowerBound: value[0], upperBound: value[1] };
        else if (name == "challenge-rating")
            monsterSearch.challengeRating = { lowerBound: value[0], upperBound: value[1] };
        this.setState({ monsterSearch: monsterSearch });
        this.refreshMonsterSearchState(this.state.monsterSearch);
    }
    handleSubmit(event) {
        event.preventDefault();
        //TODO fun
        let npc = [];
        //this.props.createNpcscreateNpcs(numberOfDice, sizeOfDie, baseHp, conMod, npc);
        // reset the state
        this.setState(this.initialState);
    }
    getChallengeRatingDisplay(pos) {
        const cr = ["0", "1/3", "1/4", "1/2", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"];
        return cr[pos - 1];
    }
    getChallengeRatingAPI(start, end) {
        const cr = [0.0, 0.125, 0.25, 0.5, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 19.0, 20.0, 21.0, 22.0, 23.0, 24.0, 25.0, 26.0, 27.0, 28.0, 29.0, 30.0];
        return cr.slice(start - 1, end - 1);
    }
    render() {
        const createSliderWithTooltip = rc_slider_1.default.createSliderWithTooltip;
        const RangeWithTooltip = createSliderWithTooltip(rc_slider_1.default.Range);
        const sizes = ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"];
        return (React.createElement("div", null,
            React.createElement(Grid_1.default, { container: true },
                React.createElement(Grid_1.default, { item: true, xs: 9 },
                    React.createElement("div", { className: this.props.classes.root },
                        React.createElement(GridList_1.default, null,
                            React.createElement(GridListTile_1.default, { key: "Subheader", cols: 2, style: { height: 'auto' } },
                                React.createElement(ListSubheader_1.default, { component: "div" }, "Monsters")),
                            this.state.monsters.map(monster => {
                                return React.createElement(monsterGridListTile_1.default, { key: monster.name, monster: monster });
                            })))),
                React.createElement(Grid_1.default, { item: true, xs: 3 },
                    React.createElement(FormControl_1.default, { fullWidth: true, component: "fieldset", className: this.props.classes.formControl },
                        React.createElement(InputLabel_1.default, { htmlFor: "name" }, "Monster Name"),
                        React.createElement(Input_1.default, { id: "name", onChange: this.searchNameAdjustment, style: { marginRight: "24px" } })),
                    React.createElement(FormControl_1.default, { component: "fieldset", className: this.props.classes.formControl },
                        React.createElement(FormLabel_1.default, { component: "legend" }, "Size"),
                        React.createElement(FormGroup_1.default, null, sizes.map(size => {
                            return (React.createElement(FormControlLabel_1.default, { key: size, control: React.createElement(Checkbox_1.default, { id: size, onChange: this.searchSizeAdjustment }), label: size }));
                        }))),
                    React.createElement(List_1.default, { className: this.props.classes.ListClass },
                        React.createElement(ListItem_1.default, { className: this.props.classes.ListItemClass },
                            React.createElement(FormLabel_1.default, { component: "legend" }, "Hit Points")),
                        React.createElement(ListItem_1.default, { style: { padding: "0px" } },
                            React.createElement(FormControlLabel_1.default, { control: React.createElement(Checkbox_1.default, { id: "hit-points", onChange: this.searchSliderAdjustment }), label: "" }),
                            React.createElement(RangeWithTooltip, { min: 1, max: 700, defaultValue: [this.state.monsterSearch.hitPoints.lowerBound, this.state.monsterSearch.hitPoints.upperBound], allowCross: false, onAfterChange: (v) => this.onSliderChange('hit-points', v), disabled: !this.state.monsterSearch.hitPointsDisabled })),
                        React.createElement(ListItem_1.default, { className: this.props.classes.ListItemClass },
                            React.createElement(FormLabel_1.default, { component: "legend" }, "Armour Class")),
                        React.createElement(ListItem_1.default, { style: { padding: "0px" } },
                            React.createElement(FormControlLabel_1.default, { control: React.createElement(Checkbox_1.default, { id: "armour-class", onChange: this.searchSliderAdjustment }), label: "" }),
                            React.createElement(RangeWithTooltip, { min: 5, max: 25, defaultValue: [this.state.monsterSearch.armourClass.lowerBound, this.state.monsterSearch.armourClass.upperBound], allowCross: false, onAfterChange: (v) => this.onSliderChange('armour-class', v), disabled: !this.state.monsterSearch.armourClassDisabled })),
                        React.createElement(ListItem_1.default, { className: this.props.classes.ListItemClass },
                            React.createElement(FormLabel_1.default, { component: "legend" }, "Challenge Rating")),
                        React.createElement(ListItem_1.default, { style: { padding: "0px" } },
                            React.createElement(FormControlLabel_1.default, { control: React.createElement(Checkbox_1.default, { id: "challenge-rating", onChange: this.searchSliderAdjustment }), label: "" }),
                            React.createElement(RangeWithTooltip, { min: 0, max: 33, defaultValue: [this.state.monsterSearch.challengeRating.lowerBound, this.state.monsterSearch.challengeRating.upperBound], allowCross: false, onAfterChange: (v) => this.onSliderChange('challenge-rating', v), disabled: !this.state.monsterSearch.challengeDisabled, tipFormatter: value => this.getChallengeRatingDisplay(value) })))))));
    }
}
exports.default = index_1.withStyles(styles)(NewNpcsFromTemplateForm);
//# sourceMappingURL=newNpcsFromTemplateForm.js.map