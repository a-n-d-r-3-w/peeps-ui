import axios from "axios";

const ACCOUNTS_DB_URL = `https://floating-thicket-27491.herokuapp.com/accounts`;

export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';

export function createAccount () {
  return function (dispatch, getState) {
    axios.post(ACCOUNTS_DB_URL)
      .then(response => {
        const { accountId } = response.data;
        dispatch({
          type: CREATE_ACCOUNT,
          accountId,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
}
