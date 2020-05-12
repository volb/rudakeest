import React, { useState } from 'react';
//import ReactDOM from 'react-dom';
import './menu.css';
//import * as serviceWorker from './serviceWorker';
import { SettingsContext } from './settingsContext';

class Menu extends React.Component {
  render() {
    return (
      <div className="menu">
        <div className="menu-headers menu-logo">rudakeest</div>
        <div className="menu-subheader">a poetry animation service</div>
        <MenuOption name="FONTS" />
        <MenuOption name="ANIMATIONS" />
        <MenuOption name="FORMATTING" />
      </div>
    );
  }
}

function MenuOption(props) {
  const [chosen, setChosen] = useState(0);
  const inline = [0, 1, 2];
  return (
    <div className="menu-option">
      <div className="menu-headers">{props.name}</div>
      {inline.map(t => (
        <MenuButton
          name={props.name}
          active={t === chosen}
          onClick={() => setChosen(t)}
          number={t} />
      ))}
    </div>
  );
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
    dispatch({ type: name, payload: CHOICES[name][num] });
    //alert(JSON.stringify(state));
  }

  function clickHandler() {
    setSettings(props.name, props.number);
  }
  /*
  return (
    <div onClick={props.onClick} className={props.active ? "day active" : "day"}>
      <p onClick={() => setSettings(props.name, props.number)}>{CHOICES[props.name][props.number]}</p>
    </div>
  );*/
  return (
    <div className="mb" onClick={clickHandler}>
      <div onClick={props.onClick} className={props.active ? "day active" : "day"}>
        {CHOICES[props.name][props.number]}
      </div>
    </div>
  );
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
