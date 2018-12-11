import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

// Example account URL: http://localhost:3000/HjupDnysu

const Account = ({ match }) => {
  return (
    <div>
      AccountId: {match.params.accountId}
    </div>
  )
};

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      peeps: [],
    };
  }

  componentDidMount () {
    const accountId = window.location.pathname.split('/')[1];
    axios.get(`https://floating-thicket-27491.herokuapp.com/accounts/${accountId}`)
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
      <Router>
        <div className="App">
          <ul>
            {this.state.peeps.map(peep => <li key={peep.peepId}>{peep.peepId}</li>)}
          </ul>
          <Route path="/:accountId" component={Account} />
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
      </Router>
    );
  }
}

export default App;
