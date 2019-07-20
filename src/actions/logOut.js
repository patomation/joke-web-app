import apiHost from '../apiHost.js';

export const LOGGING_OUT_USER = 'LOGGING_OUT_USER';
export function logingOutUser(content){
  return {
    type: LOGGING_OUT_USER
  }
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export function logoutSuccess(){
  return {
    type: LOGOUT_SUCCESS
  }
}

export function logOut(values){
  return dispatch => {
    dispatch(logingOutUser());
    dispatch({type: 'USERNAME_CHANGE', userName:null})
    dispatch({type: 'AUTH_KEY_CHANGE', authkey: ''});
    localStorage.removeItem('authkey');
    dispatch({type: 'CHANGE_VIEW', view: 'Login'});
    dispatch(logoutSuccess());

  }
}
