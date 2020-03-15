import React from 'react';
import ReactDOM from 'react-dom';
import './menu.css';
import * as serviceWorker from './serviceWorker';

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

class MenuButton extends React.Component {
  render() {
    return (<button>{CHOICES[this.props.name][this.props.number]}</button>);
  }
}

function MenuActivate() {
/* on "Animate!" click, hide submit boxes and all div classes conditionally in render function */
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
