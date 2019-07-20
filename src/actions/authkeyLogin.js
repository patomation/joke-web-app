import apiHost from '../apiHost.js';

export const AUTHKEY_LOGGING_IN_USER = 'AUTHKEY_LOGGING_IN_USER';
export function authkeyLoggingInUser(content){
  return {
    type: AUTHKEY_LOGGING_IN_USER
  }
}

export const AUTHKEY_LOGIN_SUCCESS = 'AUTHKEY_LOGIN_SUCCESS';
export function authkeyLoginSuccess(){
  return {
    type: AUTHKEY_LOGIN_SUCCESS
  }
}

export function authkeyLogin(authkey){
  return dispatch => {
    dispatch(authkeyLoggingInUser());
    return fetch( apiHost, {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{
          authkeyLogin( authkey: "${authkey}") {
            message
            error
            authkey,
            userName
          }
        }`
      })
    })
    .then(response=>response.json())
    .then(result=>{
      if(result.data.authkeyLogin.error === false){
        dispatch({type: 'AUTH_KEY_CHANGE', authkey: result.data.authkeyLogin.authkey});
        dispatch(authkeyLoginSuccess());
        dispatch({type: 'CHANGE_VIEW', view: 'JokeViewer'});
        dispatch({type: 'USERNAME_CHANGE', userName: result.data.authkeyLogin.userName});
        return result.data.authkeyLogin;
      } else {
        dispatch({type: 'ERROR_MESSAGE', message: result.data.authkeyLogin.message});
        return result.data.authkeyLogin;
      }
    })
    .catch( (err) => {
      console.warn('error', err);
    });
  }
}
