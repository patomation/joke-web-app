import { getJokes } from './getJokes.js';

export const LIKING_JOKE = 'LIKING_JOKE';
export function likingJoke(){
  return {
    type: LIKING_JOKE
  }
}

export const LIKING_JOKE_SUCCESS = 'LIKING_JOKE_SUCCESS';
export function likingJokeSuccess(data){
  return {
    type: LIKING_JOKE_SUCCESS,
    id: data.id,
    content: data.content
  }
}

export function likeJoke(id){
  return dispatch => {
    dispatch(likingJoke());
    fetch( 'http://localhost:4000/api', {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query:
        `mutation {
          likeJoke( id: "${id}"
          ){
              id
              likes
              dislikes
          }
        }`
      }),
    })
    .then(response=>response.json())
    .then(data=>{
      dispatch(likingJokeSuccess(data));
      dispatch(getJokes());
    })
    .catch( (err) => {
      console.warn('error', err);
    });

  }
}
