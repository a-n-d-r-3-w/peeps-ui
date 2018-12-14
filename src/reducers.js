import { combineReducers } from 'redux';
import { CREATE_ACCOUNT } from './actions';

function createAccount(state = {}, action) {
  if (action.type === CREATE_ACCOUNT) {
    const { accountId } = action;
    // window.location.pathname = `/${accountId}`;
    return { accountId, ...state }
  }
  return state;
}

export default combineReducers({
  createAccount,
})
