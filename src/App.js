import axios from 'axios';
import React, { Component } from 'react';
import './App.css';

// Example account URL: http://localhost:3000/HjupDnysu

class App extends Component {
  constructor (props) {
    super(props);
    const { pathname } = window.location;
    const accountId = pathname.split('/')[1] || '';
    this.state = {
      accountId,
      peeps: [],
      accountFound: false,
    };
  }

  componentDidMount () {
    axios.get(`https://floating-thicket-27491.herokuapp.com/accounts/${this.state.accountId}`)
      .then(response => {
        this.setState({
          accountFound: true,
          peeps: response.data.peeps,
        }, () => {
          console.log(JSON.stringify(this.state.peeps, null, 2));
        });
      }).catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.accountFound) {
      return (
        <React.Fragment>
          <h1>Peeps</h1>
          <ul>
            {this.state.peeps.map(peep => <li key={peep.peepId}>{peep.peepId}</li>)}
          </ul>
        </React.Fragment>
      )
    }
    return "Account not found."
  }
}

export default App;
