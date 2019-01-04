import axios from "axios";

const ACCOUNTS_DB_URL = `https://floating-thicket-27491.herokuapp.com/accounts`;

export const SET_ACCOUNT_ID = 'SET_ACCOUNT_ID';
export const SET_PEEP_ID = 'SET_PEEP_ID';
export const SET_PEEPS = 'SET_PEEPS';
export const SET_PEEP = 'SET_PEEP';
export const SET_IS_LOADING = 'SET_IS_LOADING';

export function createAccount () {
  return function (dispatch) {
    dispatch({
      type: SET_IS_LOADING,
      isLoading: true,
    });
    axios.post(ACCOUNTS_DB_URL)
      .then(response => {
        dispatch({
          type: SET_IS_LOADING,
          isLoading: false,
        });
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

export function setPeepId (peepId) {
  return {
    type: SET_PEEP_ID,
    peepId,
  };
}

export function getPeeps () {
  return function (dispatch, getState) {
    const { accountId } = getState();
    dispatch({
      type: SET_IS_LOADING,
      isLoading: true,
    });
    axios.get(`${ACCOUNTS_DB_URL}/${accountId}/peeps`)
      .then(response => {
        dispatch({
          type: SET_IS_LOADING,
          isLoading: false,
        });
        const peeps = response.data;
        dispatch({
          type: SET_PEEPS,
          peeps,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export function createPeep () {
  return function (dispatch, getState) {
    dispatch({
      type: SET_IS_LOADING,
      isLoading: true,
    });
    const { accountId } = getState();
    axios.post(`${ACCOUNTS_DB_URL}/${accountId}/peeps`)
      .then(response => {
        dispatch({
          type: SET_IS_LOADING,
          isLoading: false,
        });
        dispatch(getPeeps());
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export function getPeep () {
  return function (dispatch, getState) {
    const { accountId, peepId } = getState();
    dispatch({
      type: SET_IS_LOADING,
      isLoading: true,
    });
    axios.get(`${ACCOUNTS_DB_URL}/${accountId}/peeps/${peepId}`)
      .then(response => {
        const peep = response.data;
        dispatch({
          type: SET_PEEP,
          peep,
        });
        dispatch({
          type: SET_IS_LOADING,
          isLoading: false,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export function updatePeep () {
  return function (dispatch, getState) {
    const { accountId, peepId } = getState();
    dispatch({
      type: SET_IS_LOADING,
      isLoading: true,
    });
    axios.put(`${ACCOUNTS_DB_URL}/${accountId}/peeps/${peepId}`,
      {
        info: 'Hello there'
      })
      .then(response => {
        dispatch({
          type: SET_IS_LOADING,
          isLoading: false,
        });
        dispatch(getPeep());
      })
      .catch(error => {
        console.error(error);
      });
  }
}
