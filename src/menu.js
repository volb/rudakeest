import React, { useContext } from 'react';
//import ReactDOM from 'react-dom';
import './menu.css';
//import * as serviceWorker from './serviceWorker';
import { SettingsContext } from './settingsContext';

class Menu extends React.Component {
  render() {
    return (
      <div className="menu">
      <MenuOption name="FONTS" />
      <MenuOption name="ANIMATIONS" />
      <MenuOption name="FORMATTING" />
      </div>
    );
  }
}

class MenuOption extends React.Component {
  render() {
    return (
      <div className="menu-option">
      <h2>{this.props.name}</h2>
      <MenuButton name={this.props.name} number={0} />
      <MenuButton name={this.props.name} number={1} />
      <MenuButton name={this.props.name} number={2} />
      </div>
    );
  }
}

function MenuButton(props) {
  let { state, dispatch } = React.useContext(SettingsContext);

  React.useEffect(
    () => {
      document.getElementById("input-forms").style.fontFamily = state.font;
    },
    [state.font]
  );
  /*
  React.useEffect(
    () => {
      document.getElementById("animated-translation").style.display = state.includeTranslation;
    },
    [state.includeTranslation]
  );
  */
  
  //let setFont = num => dispatch( { type: "set-font", payload: CHOICES["FONTS"][num]});
  function setSettings(name, num) {
    dispatch( { type: name, payload: CHOICES[name][num] } );
    //alert(JSON.stringify(state));
  }
  return (<button onClick = {() => setSettings(props.name, props.number)}>{CHOICES[props.name][props.number]}</button>);
}
const CHOICES = {
  "FONTS": ['Lusitana', 'Gotu', 'Inria Serif'],
  "ANIMATIONS": ['Fade', 'Rise', 'Slide'],
  "FORMATTING": ["Verse-by-verse", "By stanza", "Entire text"]
};

/* Thinking of making CHOICES more DRY */

/*ReactDOM.render(<Menu />, document.getElementById('menu'));*/
export default Menu;
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
