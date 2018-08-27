"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const index_1 = require("@material-ui/core/styles/index");
const GridListTile_1 = require("@material-ui/core/GridListTile");
const GridListTileBar_1 = require("@material-ui/core/GridListTileBar");
const Dialog_1 = require("@material-ui/core/Dialog");
const DialogActions_1 = require("@material-ui/core/DialogActions");
const DialogContent_1 = require("@material-ui/core/DialogContent");
const Button_1 = require("@material-ui/core/Button");
const monsterDetailsGrid_1 = require("./monsterDetailsGrid");
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
    }
    ;
    handleClose() {
        this.setState({
            monsterDetails: null,
        });
    }
    ;
    render() {
        const monster = this.props.monster;
        // This is a "hack and pray" might be nice to actually download all the images from their repo
        //https://github.com/TheGiddyLimit/TheGiddyLimit.github.io/tree/master/img/MM
        //https://5etools.com/5etools.html
        const imageSrc = `https://5etools.com/img/MM/${monster.name}.png`;
        return (React.createElement(GridListTile_1.default, { classes: { root: this.props.classes.tile } },
            React.createElement("img", { src: imageSrc, alt: monster.name, className: this.props.classes.imageThumbnail, onClick: this.handleClick }),
            React.createElement(GridListTileBar_1.default, { title: monster.name, classes: {
                    root: this.props.classes.titleBar,
                }, subtitle: React.createElement("div", { className: this.props.classes.subTitle },
                    React.createElement("span", null,
                        "Size: ",
                        monster.size.toLowerCase()),
                    React.createElement("br", null),
                    React.createElement("span", null,
                        "Hp: ",
                        monster.hitPoints),
                    React.createElement("br", null),
                    React.createElement("span", null,
                        "AC: ",
                        monster.armourClass),
                    React.createElement("br", null),
                    React.createElement("span", null,
                        "CR: ",
                        monster.challengeRating)) }),
            React.createElement(Dialog_1.default, { open: Boolean(this.state.monsterDetails), onClose: this.handleClose, "aria-labelledby": "form-dialog-title", "aria-describedby": "form-dialog-description" },
                React.createElement(DialogContent_1.default, null,
                    React.createElement(monsterDetailsGrid_1.default, { monster: monster, imageSrc: imageSrc })),
                React.createElement(DialogActions_1.default, null,
                    React.createElement(Button_1.default, { onClick: this.handleClose, color: "primary" }, "Ok")))));
    }
}
exports.default = index_1.withStyles(styles)(MonsterGridListTile);
//# sourceMappingURL=monsterGridListTile.js.map