import { combineReducers } from 'redux';
import { CREATE_ACCOUNT } from './actions';

function accountReducer(state = {}, action) {
  if (action.type === CREATE_ACCOUNT) {
    const { accountId } = action;
    return { accountId, ...state};
  }
  return state;
 }

export default combineReducers({
  accountReducer,
})
