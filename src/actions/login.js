import apiHost from '../apiHost.js';

export const LOGGING_IN_USER = 'LOGGING_IN_USER';
export function loggingInUser(content){
  return {
    type: LOGGING_IN_USER
  }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function loginSuccess(){
  return {
    type: LOGIN_SUCCESS
  }
}

export function login(values){
  return dispatch => {
    dispatch(loggingInUser());
    return fetch( apiHost, {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{
          login( email: "${values.email}", password: "${values.password}" ) {
            message
            error
            authkey
          }
        }`
      })
    })
    .then(response=>response.json())
    .then(result=>{
      if(result.data.login.error === false){
        dispatch({type: 'AUTH_KEY_CHANGE', authkey: result.data.login.authkey});
        dispatch(loginSuccess());
        dispatch({type: 'CHANGE_VIEW', view: 'JokeViewer'});
        return result.data.login;
      } else {
        dispatch({type: 'ERROR_MESSAGE', message: result.data.login.message});
        return result.data.login;
      }
    })
    .catch( (err) => {
      console.warn('error', err);
    });
  }
}
