import apiHost from '../apiHost.js';

export const REGISTERING_USER = 'REGISTERING_USER';
export function registeringUser(content){
  return {
    type: REGISTERING_USER
  }
}

export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export function registrationSuccess(){
  return {
    type: REGISTRATION_SUCCESS
  }
}

export function register(values){
  return dispatch => {
    dispatch(registeringUser());
    return fetch( apiHost, {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `mutation{
          register(
            email: "${values.email}",
            password: "${values.password}",
            firstName: "${values.firstName}",
            lastName: "${values.lastName}"
          ) {
            message
            error
            authkey
          }
        }`
      })
    })
    .then(response=>response.json())
    .then(result=>{
      if(result.data.register.error === false){
        dispatch({type: 'AUTH_KEY_CHANGE', authkey: result.data.register.authkey});
        dispatch(registrationSuccess());
        dispatch({type: 'CHANGE_VIEW', view: 'JokeViewer'});
        return result.data.register;
      } else {
        dispatch({type: 'ERROR_MESSAGE', message: result.data.register.message});
        return result.data.register;
      }
    })
    .catch( (err) => {
      console.warn('error', err);
    });
  }
}
