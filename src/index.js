import React from 'react';
import ReactDOM from 'react-dom';
import './menu.js'
import './menu.css';
import * as serviceWorker from './serviceWorker';

class PoemForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',
        splitPoem: []
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      this.setState({value: event.target.value});
      this.setState({splitPoem: this.state.value.split('\n')});
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Poem: {JSON.stringify(this.state.splitPoem)}
            {this.state.value}
            <textarea value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
  


ReactDOM.render(<PoemForm />, document.getElementById('root'));
