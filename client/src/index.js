import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './menu';
import './menu.css';
import './index.css';
import { SettingsContextProvider, SettingsContextConsumer } from './settingsContext';
//import * as serviceWorker from './serviceWorker';
import { fadeIn, fadeInLeft, fadeInUp } from 'react-animations'
import styled, { keyframes } from 'styled-components';
import Fullscreen from "react-full-screen";

const defaultRudakiTranslation = "I saw a hoopoe near Sarakhs\nWhose little song reached the clouds.\nShe was wearing a little cloak\nOf many different colors.\nO ugly and inverted world,\nI stand before you in awe";
const defaultRudakiPoem = "پوپک ديدم به حوالی سرخس\nبانگک بر برده به ا بر اندرا\nچادر کی ديدم رنگين برو\nرنگ بسی گونه بر آن چادرا\nیا پرغونه و باژگونه جهان\nمانده من از تو به شگفت اندرا\n";

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
    default:
      return (<div>{props.children}</div>);
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poem: this.props.defaultText,
      wholePoem: [],
      splitPoem: [],
      stanzas: [],
      name: props.name,
      position: 0,
      isEditingPoem: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.poemStyle = this.poemStyle.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.withStanzaMarkers = this.withStanzaMarkers.bind(this);
    this.generateRandomPoem = this.generateRandomPoem.bind(this);
    this.editingStyle = this.editingStyle.bind(this);
  }

  handleChange(event) {
    this.setState({ poem: event.target.value });
    this.setState({ isEditingPoem: 1 });
  }

  async generateRandomPoem() {
    let response = "poem here";
    let i = getRandomInt(response.result.length);
    console.log("dsadsasad.asdm.samsdlkmsalknsalknsadlnsadlnsadlk");
    this.setState({ poem: response.result[0] });
    return response;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ splitPoem: this.withStanzaMarkers(this.state.poem.split('\n')) });
    this.setState({ stanzas: this.state.poem.split('\n\n') });
    this.setState({ wholePoem: [this.state.poem]});
    this.setState({ isEditingPoem: 2 });
  }

  poemStyle(setting) {
    switch (setting) {
      case "Verse-by-verse":
        return this.state.splitPoem;
      case "Entire text":
        return this.state.wholePoem;
      case "By stanza":
        return this.state.stanzas;
      default:
        return "";
    }
  }

  editingStyle(setting) {
    switch (setting) {
      case 0:
        return "";
      case 1:
        return  "\u22EF";
      case 2: 
        return "\u2713";
      default:
        return "";
    }
  }

  withStanzaMarkers(splitPoemArray) {
    let reformattedArray = [];
    reformattedArray.push(splitPoemArray[0]);//+"\n\u2042");
    for (let i = 1; i < splitPoemArray.length; i++) {
      reformattedArray[i] = splitPoemArray[i];
    }
    for (let i = 1; i < splitPoemArray.length; i++) {
      if (splitPoemArray[i].trim().length === 0 && i < splitPoemArray.length - 1) {
        reformattedArray[i+1] = splitPoemArray[i+1]+"\n\u2042";
      }
    }
    var arrayWithoutBlankSlides = reformattedArray.filter(function (element) {
      return element !== " " && element !== "";
    });
    return arrayWithoutBlankSlides;
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

  handleKeyDown(e) {
    switch (e.key) {
      case "ArrowLeft":
        this.setState( {position: this.state.position-1} );
        break;
      case "ArrowRight":
        this.setState( {position: this.state.position+1} );
        break;
      default: 
        break;
    }
  }

  render() {
    if (!this.props.shouldAnimate) {
      return (
        <div>
        <form onSubmit={this.handleSubmit}>
          <label className="enter-label">
          Enter the {this.state.name}:
          </label>
          <textarea value={this.state.poem} onChange={this.handleChange} />
          <input className="button1" type="submit" value= "Save" /> 
          <div className="checkmark">{this.editingStyle(this.state.isEditingPoem)}</div>
        </form>
        </div>
      );
    } else if (this.state.poem === '') {
      return '';
    }
    else if (this.props.shouldAnimate) {
      return (
        <SettingsContextConsumer>
          {value => {
            return (
              <div id={"animated-input"/*this.props.name*/} onKeyDown={this.handleKeyDown}>
                <AnimationDiv animation={value.state["animation"]} key={this.state.position}>
                  {this.poemStyle(value.state["option"])[this.state.position]}
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
    this.goFull = this.goFull.bind(this);
  }

  goFull() {
    this.setState({ isFull: true });
  }

  MenuActivate() {
    /* on "Hide menu" click, hide menu */
    document.getElementsByClassName("menu")[0].style.display = 'none';
  }
  
  render() {
    return (
      <div id="main-box">
        <SettingsContextProvider>
          <Menu />
          <div className="container">
          <Fullscreen
            enabled={this.state.isFull}
            onChange={isFull => this.setState({ isFull })}
          >
            <div id={this.state.isFull ? "fullscreen-forms" : "input-forms"}>
              <InputForm name="poem" defaultText={defaultRudakiPoem} shouldAnimate={this.state.isFull} />
              <InputForm name="translation" defaultText={defaultRudakiTranslation} shouldAnimate={this.state.isFull} />
            </div>
          </Fullscreen>

          <p>
            Press Animate to go fullscreen. Use left and right arrow keys to navigate.
          </p>
          <div className="animate-button">
          <button className="button1" onClick={this.goFull}>
          {this.state.animationText}
          </button>
          </div>
          </div>
        </SettingsContextProvider>
      </div>
    );
  }
}

ReactDOM.render(<MainBox />, document.getElementById('root'));
