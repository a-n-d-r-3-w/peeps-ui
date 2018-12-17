import {
  SET_ACCOUNT_ID,
  SET_PEEPS,
  SET_IS_LOADING
} from './actions';

const reducers = (state = {}, action) => {
  switch (action.type) {
    case SET_ACCOUNT_ID:
      const { accountId } = action;
      return {
        ...state,
        accountId,
      };
    case SET_PEEPS:
      const { peeps } = action;
      return {
        ...state,
        peeps,
      };
    case SET_IS_LOADING:
      const { isLoading } = action;
      return {
        ...state,
        isLoading,
      };
    default:
      return state;
  }
};

export default reducers;
