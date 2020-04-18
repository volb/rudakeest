import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Menu from './menu';
import './menu.css';
import './index.css';
import { SettingsContextProvider, SettingsContextConsumer } from './settingsContext';
//import * as serviceWorker from './serviceWorker';
import { fadeIn, fadeInLeft, fadeInUp } from 'react-animations'
import styled, { keyframes } from 'styled-components';
import Fullscreen from "react-full-screen";

const FadeInAnimation = keyframes`${fadeIn}`;
const FadeInDiv = styled.div`
  animation: 5s ${FadeInAnimation};
`;

const FadeInLeftAnimation = keyframes`${fadeInLeft}`;
const FadeInLeftDiv = styled.div`
  animation: 5s ${FadeInLeftAnimation};
`;


const FadeInUpAnimation = keyframes`${fadeInUp}`;
const FadeInUpDiv = styled.div`
  animation: 5s ${FadeInUpAnimation};
`;

function AnimationDiv(props) {
  switch (props.animation) {
    case "Fade":
      return (<FadeInDiv>{props.children}</FadeInDiv>);
    case "Slide":
      return (<FadeInLeftDiv>{props.children}</FadeInLeftDiv>);
    case "Rise":
      return (<FadeInUpDiv>{props.children}</FadeInUpDiv>);
    case "false":
      return (<div>{props.children}</div>);
  }
}


class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poem: '',
      wholePoem: [],
      splitPoem: [],
      stanzas: [],
      name: props.name,
      position: 0,
      poemSubmitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.poemStyle = this.poemStyle.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.withStanzaMarkers = this.withStanzaMarkers.bind(this);
  }

  handleChange(event) {
    this.setState({ poem: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ splitPoem: this.withStanzaMarkers(this.state.poem.split('\n')) });
    this.setState({ stanzas: this.state.poem.split('\n\n') });
    this.setState({ wholePoem: [this.state.poem]});
    this.setState({ poemSubmitted: true });
  }

  poemStyle(setting) {
    switch (setting) {
      case "Verse-by-verse":
        return this.state.splitPoem;
      case "Entire text":
        return this.state.wholePoem;
      case "By stanza":
        return this.state.stanzas;
    }
  }

  withStanzaMarkers(splitPoemArray) {
    let reformattedArray = [];
    reformattedArray.push(splitPoemArray[0]+"\n\xB7");
    for (let i = 1; i < splitPoemArray.length; i++) {
      if (splitPoemArray[i] == "" && i < splitPoemArray.length - 1) {
        reformattedArray[i+1] = splitPoemArray[i+1]+"\n&middot;";
      }
       else {
          reformattedArray[i] = splitPoemArray[i]
      }
    }
    return reformattedArray;
  }

  poemAnimate(poemArray) {
    for (var element of poemArray) {
      return <div>{element}</div>
    }
  }
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    switch (e.key) {
      case "ArrowLeft":
        this.setState( {position: this.state.position-1} );
        break;
      case "ArrowRight":
        this.setState( {position: this.state.position+1} );
        break;
    }
  }

  render() {
    if (!this.props.shouldAnimate) {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter the {this.state.name}: {JSON.stringify(this.state.splitPoem)}
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
              <div id={"animated-" + this.props.name} onKeyDown={this.handleKeyDown}>
                <AnimationDiv animation={value.state["animation"]} key={this.state.position}>
                  {this.poemStyle(value.state["option"])[this.state.position]}
                </AnimationDiv>
                {this.state.position}
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
