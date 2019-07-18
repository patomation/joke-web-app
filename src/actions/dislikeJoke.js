import { getJokes } from './getJokes.js';

export const DISLIKING_JOKE = 'DISLIKING_JOKE';
export function dislikingJoke(){
  return {
    type: DISLIKING_JOKE
  }
}

export const DISLIKING_JOKE_SUCCESS = 'DISLIKING_JOKE_SUCCESS';
export function dislikingJokeSuccess(data){
  return {
    type: DISLIKING_JOKE_SUCCESS,
    id: data.id,
    content: data.content
  }
}

export function dislikeJoke(id){
  return dispatch => {
    dispatch(dislikingJoke());
    fetch( 'http://localhost:4000/api', {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query:
        `mutation {
          dislikeJoke( id: "${id}"
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
      dispatch(dislikingJokeSuccess(data));
      dispatch(getJokes());
    })
    .catch( (err) => {
      console.warn('error', err);
    });

  }
}
