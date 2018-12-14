import { combineReducers } from 'redux';
import { CREATE_ACCOUNT } from './actions';

function accountReducer(state = {}, action) {
  if (action.type === CREATE_ACCOUNT) {
    const { accountId } = action;
    window.location.pathname = `/${accountId}`;
  }
  return state;
}

export default combineReducers({
  accountReducer,
})
