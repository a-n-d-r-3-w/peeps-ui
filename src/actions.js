import axios from 'axios';

const accountsUrl = `https://floating-thicket-27491.herokuapp.com/accounts`;

export const getAccounts = () => {
  axios.get(`${accountsUrl}/${this.state.accountId}`)
    .then(response => {
      this.setState({
        accountFound: true,
        peeps: response.data.peeps,
      });
    }).catch(error => {
    console.error(error);
  });
};
