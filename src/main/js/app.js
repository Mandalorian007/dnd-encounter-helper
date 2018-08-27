"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const encounterDrawer_1 = require("./encounterDrawer");
const MuiThemeProvider_1 = require("material-ui/styles/MuiThemeProvider");
class App extends React.Component {
    render() {
        return (React.createElement(encounterDrawer_1.default, null));
    }
}
ReactDOM.render(React.createElement(MuiThemeProvider_1.default, null,
    React.createElement(App, null)), document.getElementById('react'));
//# sourceMappingURL=app.js.map