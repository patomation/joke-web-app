import { getJokes } from './getJokes.js';
import apiHost from '../apiHost.js';

export const DISLIKING_JOKE = 'DISLIKING_JOKE';
export function dislikingJoke(){
  return {
    type: DISLIKING_JOKE
  }
}

export const DISLIKING_JOKE_SUCCESS = 'DISLIKING_JOKE_SUCCESS';
export function dislikingJokeSuccess(){
  return {
    type: DISLIKING_JOKE_SUCCESS
  }
}

export function dislikeJoke( id, authkey ){
  return dispatch => {
    dispatch(dislikingJoke());
    return fetch( apiHost, {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query:
        `mutation {
          dislikeJoke( id: "${id}", authkey: "${authkey}"
          ){
              success
          }
        }`
      }),
    })
    .then(response=>response.json())
    .then(result=>{
      if(result.data.dislikeJoke.success === true ){
        dispatch(dislikingJokeSuccess());
        dispatch(getJokes());
      }
    })
    .catch( (err) => {
      console.warn('error', err);
    });

  }
}
