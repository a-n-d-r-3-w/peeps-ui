import { combineReducers } from 'redux';
import { CREATE_ACCOUNT } from './actions';

function createAccount(state = {}, action) {
  return state;
}

export default combineReducers({
  createAccount,
})
