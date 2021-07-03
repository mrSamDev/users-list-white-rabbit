import types from './actionTypes';
import services from '../../utils/services-layer';
import {AUTH_TOKEN} from '../../constants';
import {RESET} from '../globalTypes';

export const signInWithUsernameAndPassword = (payload) => async (dispatch) => {
  try {
    const response = await services.signInWithUsernameAndPassword(payload);
    localStorage.setItem(AUTH_TOKEN, response.data.username);
    dispatch(setUserInfo(response.data));
  } catch (error) {}
};

export const setUserInfo = (data, options = {}) => {
  return {
    type: types.SET_CURRENT_USER,
    data,
    options,
  };
};

export const getUserInfo = (data) => async (dispatch) => {
  dispatch({type: types.SET_USER_INFO_LOADING, value: true});
  const username = localStorage.getItem(AUTH_TOKEN);
  if (username !== null && username !== 'null') {
    dispatch(setUserInfo({username}));
  }
  dispatch({type: types.SET_USER_INFO_LOADING, value: false});
};

export const onUserLogout = () => (dispatch) => {
  localStorage.setItem(AUTH_TOKEN, null);
  dispatch({type: RESET});
  dispatch(setUserInfo(null, {type: 'clear'}));
};
