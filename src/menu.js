import React from 'react';
import ReactDOM from 'react-dom';
import './menu.css';
import * as serviceWorker from './serviceWorker';

class Menu extends React.Component {
  render() {
    return (
      <MenuOption name="FONTS" />
      <MenuOption name="ANIMATIONS" />
      <MenuOption name="OPTIONS" />
    );
  }
}

class MenuOption extends React.Component {
  render() {
    return (
      <MenuButton />
      <MenuButton />
      <MenuButton />
    );
  }
}

class MenuButton extends React.Component {
  render() {
    return (<button></button>);
  }
}

function MenuActivate() {

}
/*
const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price:   '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
*/
const CHOICES = {
    "FONTS": ['Lusitana', 'Georgia', 'Inria Serif'],
    "ANIMATIONS": ['Fade', 'Rise', 'Slide'],
    "OPTIONS": ["Verse-by-verse", "By stanza", "Include translations"]
  };


ReactDOM.render(<Menu />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
