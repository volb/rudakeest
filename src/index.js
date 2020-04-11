import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Menu from './menu';
import './menu.css';
import './index.css';
import { SettingsContextProvider, SettingsContext, SettingsContextConsumer } from './settingsContext';
//import * as serviceWorker from './serviceWorker';
import { fadeIn, fadeOutLeft, slideOutDown } from 'react-animations'
import styled, { keyframes } from 'styled-components';
import Fullscreen from "react-full-screen";

const FadeInAnimation = keyframes`${fadeIn}`;
const FadeInDiv = styled.div`
  animation: infinite 5s ${FadeInAnimation};
`;

const FadeOutLeftAnimation = keyframes`${fadeOutLeft}`;
const FadeOutLeftDiv = styled.div`
  animation: infinite 5s ${FadeOutLeftAnimation};
`;


const SlideOutDownAnimation = keyframes`${slideOutDown}`;
const SlideOutDownDiv = styled.div`
  animation: infinite 5s ${SlideOutDownAnimation};
`;

function AnimationDiv(props) {
  switch (props.animation) {
    case "Fade":
      return (<FadeInDiv>{props.children}</FadeInDiv>);
    case "Slide":
      return (<FadeOutLeftDiv>{props.children}</FadeOutLeftDiv>);
    case "Rise":
      return (<SlideOutDownDiv>{props.children}</SlideOutDownDiv>);
    case "false":
      return (<div>{props.children}</div>);
  }
}


class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poem: '',
      splitPoem: [],
      stanzas: [],
      name: props.name,
      poemSubmitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.poemStyle = this.poemStyle.bind(this)
  }

  handleChange(event) {
    this.setState({ poem: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ splitPoem: this.state.poem.split('\n') });
    this.setState({ stanzas: this.state.poem.split('\n\n') });
    this.setState({ poemSubmitted: true });
  }

  poemStyle(setting) {
    switch (setting) {
      case "Verse-by-verse":
        return this.state.splitPoem;
      case "Entire text":
        return this.state.poem;
      case "By stanza":
        return this.state.stanzas;
    }
  }

  render() {
    if (!this.props.shouldAnimate) {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter the {this.state.name}: {JSON.stringify(this.state.splitPoem)}
            {this.state.poem}
            <textarea value={this.state.poem} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    } else if (this.props.shouldAnimate) {
      return (
        <SettingsContextConsumer>
          {value => {
            return (
              <div id={"animated-" + this.props.name}>
                <AnimationDiv animation={value.state["animation"]}>
                  {[this.poemStyle(value.state["option"])]}
                </AnimationDiv>
              </div>);
          }}
        </SettingsContextConsumer>
      );
    }
  }
}

class MainBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFull: false,
      animationText: "Animate"
    };

    this.MenuActivate = this.MenuActivate.bind(this);
  }

  goFull = () => {
    this.setState({ isFull: true });
  }

  render() {
    return (
      <div id="main-box">
        <SettingsContextProvider>
          <Menu />
          <button onClick={this.MenuActivate}>Hide menu</button>
          <Fullscreen
            enabled={this.state.isFull}
            onChange={isFull => this.setState({ isFull })}
          >
            <div id="input-forms">
              <InputForm name="poem" shouldAnimate={this.state.isFull} />
              <InputForm name="translation" shouldAnimate={this.state.isFull} />
            </div>
          </Fullscreen>
          <button id="on-top" onClick={this.goFull}>
            {this.state.animationText}
          </button>
        </SettingsContextProvider>
      </div>
    );
  }

  MenuActivate() {
    /* on "Hide menu" click, hide menu */
    document.getElementsByClassName("menu")[0].style.display = 'none';
  }
}

ReactDOM.render(<MainBox />, document.getElementById('root'));
