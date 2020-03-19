import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './menu.js';
import './menu.css';
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
      this.setState({poem: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();
      this.setState({poem: event.target.value});
      this.setState({splitPoem: this.state.poem.split('\n')});
      this.setState({poemSubmitted: true});
    }

    render() {
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
    }
}

class MainBox extends React.Component {
  render() {
    return (
    <div class="main-box">
    <Menu />
    <InputForm name="Poem" />
    <InputForm name="Translation" />
    </div>
    );
  }
}

ReactDOM.render(<MainBox />, document.getElementById('root'));
