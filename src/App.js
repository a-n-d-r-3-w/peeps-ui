import axios from 'axios';
import React, { Component, Fragment } from 'react';
import './App.css';

// Example account URL: http://localhost:3000/HjupDnysu

const accountsUrl = `https://floating-thicket-27491.herokuapp.com/accounts`;

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
    axios.get(`${accountsUrl}/${this.state.accountId}`)
      .then(response => {
        this.setState({
          accountFound: true,
          peeps: response.data.peeps,
        });
      }).catch(error => {
        console.error(error);
      });
  }

  createAccount () {
    axios.post(accountsUrl)
      .then(response => {
        const { accountId } = response.data;
        window.location.pathname = `/${accountId}`;
      }).catch(error => {
        console.error(error);
      });
  }

  createPeep () {
    axios.post(`${accountsUrl}/${this.state.accountId}/peeps`)
      .then(response => {
        window.location.reload();
      }).catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.accountFound) {
      return (
        <Fragment>
          <h1>Peeps</h1>
          <button onClick={() => this.createPeep()}>Create peep</button>
          <ul>
            {this.state.peeps.map(peep => <li key={peep.peepId}>{peep.peepId}</li>)}
          </ul>
        </Fragment>
      )
    }
    return (
      <Fragment>
        <button onClick={() => this.createAccount() }>Create account</button>
      </Fragment>
    )
  }
}

export default App;
