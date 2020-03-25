import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './menu.js';
import './menu.css';
import './index.css';
import * as serviceWorker from './serviceWorker';

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
    this.setState({ poem: event.target.value });
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
            {this.state.poem}
          </div>
        )
    }
  }
}

class MainBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnimated: false,
      animationText: "Animate"
    };
    this.toggleAnimation = this.toggleAnimation.bind(this);
    this.MenuActivate = this.MenuActivate.bind(this);
  }

  toggleAnimation() {
    this.setState({ isAnimated: !this.state.isAnimated });
    this.setState({ animationText: this.state.isAnimated ? "Animate" : "Minimize" });
  }

  render() {
    return (
      <div class="main-box">
        <Menu />
        <button onClick={this.MenuActivate}>Hide menu</button>
        <InputForm name="poem" shouldAnimate={this.state.isAnimated} />
        <InputForm name="translation" shouldAnimate={this.state.isAnimated} />
    <button class="on-top" onClick={this.toggleAnimation}>
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
