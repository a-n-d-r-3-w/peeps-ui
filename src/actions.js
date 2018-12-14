import axios from "axios";

const ACCOUNTS_DB_URL = `https://floating-thicket-27491.herokuapp.com/accounts`;

export const SET_ACCOUNT_ID = 'SET_ACCOUNT_ID';

export function createAccount () {
  return function (dispatch, getState) {
    axios.post(ACCOUNTS_DB_URL)
      .then(response => {
        const { accountId } = response.data;
        dispatch({
          type: SET_ACCOUNT_ID,
          accountId,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export function setAccountId (accountId) {
  return {
    type: SET_ACCOUNT_ID,
    accountId,
  };
}
