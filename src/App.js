import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = { peeps: [] };
  }

  componentDidMount () {
    axios.get('https://floating-thicket-27491.herokuapp.com/accounts/HjupDnysu')
      .then(response => {
        this.setState({
          peeps: response.data.peeps,
        }, () => {
          console.log(JSON.stringify(this.state.peeps, null, 2));
        });
      }).catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="App">
        <ul>
          {this.state.peeps.map(peep => <li key={peep.peepId}>{peep.peepId}</li>)}
        </ul>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
