import {SET_ACCOUNT_ID, SET_PEEPS} from './actions';

const reducers = (state = {}, action) => {
  switch (action.type) {
    case SET_ACCOUNT_ID:
      const { accountId } = action;
      return {
        accountId,
        ...state,
      };
    case SET_PEEPS:
      const { peeps } = action;
      return {
        peeps,
        ...state,
      };
    default:
      return state;
  }
};

export default reducers;
