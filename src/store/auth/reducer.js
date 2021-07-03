import {RESET} from '../globalTypes';
import types from './actionTypes';

const initialState = {
  userInfo: {},
  loading: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return {
        ...state,
        userInfo: action.data,
        loading: false,
      };

    case types.SET_USER_INFO_LOADING:
      return {
        ...state,
        loading: action.value,
      };

    case RESET:
      return initialState;

    default:
      return state;
  }
};

export default auth;
