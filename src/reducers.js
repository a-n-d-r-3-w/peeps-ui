import {SET_ACCOUNT_ID} from './actions';

const reducers = (state = {}, action) => {
  switch (action.type) {
    case SET_ACCOUNT_ID:
      const { accountId } = action;
      return {
        accountId,
        ...state
      };
    default:
      return state;
  }
};

export default reducers;
