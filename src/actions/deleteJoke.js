import apiIntegration from '../modules/apiIntegration';
import { getJokes } from './getJokes.js';

export const DELETE_JOKE = 'DELETE_JOKE';
export function deletingJoke(){
  return {
    type: DELETE_JOKE
  }
}

export const DELETE_JOKE_SUCCESS = 'DELETE_JOKE_SUCCESS';
export function deleteJokeSuccess(data){
  return {
    type: DELETE_JOKE_SUCCESS,
    message: data.message
  }
}

export function deleteJoke(id){
  return dispatch => {
    dispatch(deletingJoke());
    fetch( 'http://localhost:4000/api', {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query:
          `mutation {
            deleteJoke( id: "${id}"
            ){
                content
            }
          }`
      }),
    })
    .then(response=>response.json())
    .then(data=>{
      dispatch(deleteJokeSuccess(data.data.deleteJoke));
      dispatch(getJokes());
    })
    .catch( (err) => {
      console.warn('error', err);
    });

  }
}
