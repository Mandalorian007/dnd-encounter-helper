const React = require('react');
const ReactDOM = require('react-dom');

import EncounterDrawer from "./encounterDrawer";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Slider, {createSliderWithTooltip} from 'rc-slider';

class App extends React.Component {
  render() {
    const SliderWithTooltip = createSliderWithTooltip(Slider.Range);
    return (
      <div>
        <br/>
        <br/>
        <SliderWithTooltip/>
        <br/>
        <br/>
        <EncounterDrawer/>
      </div>
    )
  }
}

ReactDOM.render(
  <MuiThemeProvider>
    <App/>
  </MuiThemeProvider>,
  document.getElementById('react')
);