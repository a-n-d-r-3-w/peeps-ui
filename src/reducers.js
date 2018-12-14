import {CREATE_ACCOUNT} from './actions';

const reducers = (state = {}, action) => {
  if (action.type === CREATE_ACCOUNT) {
    const { accountId } = action;
    return {
      accountId,
      ...state
    };
  }
  return state;
};

export default reducers;
