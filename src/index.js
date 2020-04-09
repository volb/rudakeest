import * as React from 'react';
import ReactDOM from 'react-dom';
import Menu from './menu';
import './menu.css';
import './index.css';
import { SettingsContextProvider } from './settingsContext';
//import * as serviceWorker from './serviceWorker';
import { FadeIn, FadeOutLeft, SlideOutDown } from 'react-animations'
import styled, { keyframes } from "styled-components";
import Fullscreen from "react-full-screen";

const FadeInAnimation = keyframes`${FadeIn}`;
const FadeInDiv = styled.div`
  animation: infinite 5s ${FadeInAnimation};
`;

const FadeOutLeftAnimation = keyframes`${FadeOutLeft}`;
const FadeOutLeftDiv = styled.div`
  animation: infinite 5s ${FadeOutLeftAnimation};
`;


const SlideOutDownAnimation = keyframes`${SlideOutDown}`;
const SlideOutDownDiv = styled.div`
  animation: infinite 5s ${SlideOutDownAnimation};
`;
	
class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poem: '',
      splitPoem: [],
      name: props.name,
      poemSubmitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ poem: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ splitPoem: this.state.poem.split('\n') });
    this.setState({ poemSubmitted: true });
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
          <div id={"animated-"+this.props.name}>
            <FadeInDiv>
              {this.state.poem}
    <img src="https://picsum.photos/300/200/?random" />

            </FadeInDiv>
          </div>
        )
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
      <div class="main-box">
        <SettingsContextProvider>
        <Menu />
        <button onClick={this.MenuActivate}>Hide menu</button>
        <Fullscreen
          enabled={this.state.isFull}
          onChange={isFull => this.setState({isFull})}
        >
          <div id="input-forms">
            <InputForm name="poem" shouldAnimate={this.state.isFull} />
            <InputForm name="translation" shouldAnimate={this.state.isFull} />
          </div>
          </Fullscreen>
        <button class="on-top" onClick={this.goFull}>
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
