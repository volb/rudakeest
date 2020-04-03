import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import './menu.css';
import * as serviceWorker from './serviceWorker';
import SettingsContext from './settingsContext';

class Menu extends React.Component {
  render() {
    return (
      <div class="menu">
      <MenuOption name="FONTS" />
      <MenuOption name="ANIMATIONS" />
      <MenuOption name="OPTIONS" />
      </div>
    );
  }
}

class MenuOption extends React.Component {
  render() {
    return (
      <div class="menu-option">
      <h2>{this.props.name}</h2>
      <MenuButton name={this.props.name} number={0} />
      <MenuButton name={this.props.name} number={1} />
      <MenuButton name={this.props.name} number={2} />
      </div>
    );
  }
}

function MenuButton(props) {
  const settings = useContext(SettingsContext); 
  return (<button onClick="">{CHOICES[props.name][props.number]}</button>);
}
const CHOICES = {
  "FONTS": ['Lusitana', 'Georgia', 'Inria Serif'],
  "ANIMATIONS": ['Fade', 'Rise', 'Slide'],
  "OPTIONS": ["Verse-by-verse", "By stanza", "Include translations"]
};

/* Thinking of making CHOICES more DRY */

/*ReactDOM.render(<Menu />, document.getElementById('menu'));*/
export default Menu;
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
