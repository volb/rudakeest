import * as React from 'react';

const SettingsContext = React.createContext();

let initialState = {
  font: "Lusitana",
  animation: "Fade",
  option: "Verse-by-verse"
}

let reducer = (state, action) => {
  switch (action.type) {
    case "FONTS":
      return { ...state, font: action.payload };
    case "ANIMATIONS":
      return { ...state, animation: action.payload };
    case "OPTIONS":
      return { ...state, option: action.payload };
  }
};

function SettingsContextProvider(props) {
  let [state, dispatch] = React.useReducer(reducer, initialState);
  let value = { state, dispatch };

  return (
    <SettingsContext.Provider value={value}>{props.children}</SettingsContext.Provider>
  );
}

let SettingsContextConsumer = SettingsContext.Consumer;

export { SettingsContext, SettingsContextProvider, SettingsContextConsumer };