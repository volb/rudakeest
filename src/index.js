import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './menu.js';
import './menu.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { CSSTransition } from 'react-transition-group';
import Fullscreen from "react-full-screen";


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
          <CSSTransition
          timeout={300}>
                      
          <div id={"animated-"+this.props.name}>
            {this.state.poem}
          </div>

        </CSSTransition>
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
    this.toggleAnimation = this.toggleAnimation.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.exitHandler = this.exitHandler.bind(this);

    this.MenuActivate = this.MenuActivate.bind(this);
  }

  toggleAnimation() {
    /*Not sure I need a "Minimize" button on the full screen mode so I'm going to do this instead*/
    this.toggleFullscreen();  
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.getElementById('input-forms').requestFullscreen();
    } else {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
    }

    this.setState({ isAnimated: !this.state.isAnimated });
    document.addEventListener('fullscreenchange', this.setState({ isAnimated: false }));

    this.setState({ animationText: this.state.isAnimated ? "Minimize" : "Animate" });
  }

  exitHandler() {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
      console.log("blah");
      this.setState({ isAnimated: false });
    }
  }

  goFull = () => {
    this.setState({ isFull: true });
  }

  render() {
    return (
      <div class="main-box">
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


    <p>{JSON.stringify(this.state.isAnimated)}</p>
      </div>
    );
  }

  MenuActivate() {
    /* on "Hide menu" click, hide menu */
    document.getElementsByClassName("menu")[0].style.display = 'none';
  }
}



ReactDOM.render(<MainBox />, document.getElementById('root'));
