import { getJokes } from './getJokes.js';
import apiHost from '../apiHost.js';

export const LIKING_JOKE = 'LIKING_JOKE';
export function likingJoke(){
  return {
    type: LIKING_JOKE
  }
}

export const LIKING_JOKE_SUCCESS = 'LIKING_JOKE_SUCCESS';
export function likingJokeSuccess(){
  return {
    type: LIKING_JOKE_SUCCESS
  }
}

export function likeJoke( id, authkey ){
  return dispatch => {
    dispatch(likingJoke());
    return fetch( apiHost, {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query:
        `mutation {
          likeJoke( id: "${id}", authkey: "${authkey}"
          ){
              success
          }
        }`
      }),
    })
    .then(response=>response.json())
    .then(result=>{
      if(result.data.likeJoke.success === true ){
        dispatch(likingJokeSuccess());
        dispatch(getJokes());
      }
    })
    .catch( (err) => {
      console.warn('error', err);
    });

  }
}
