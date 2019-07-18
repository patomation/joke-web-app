import apiIntegration from '../modules/apiIntegration';

export const UPDATING_JOKE = 'UPDATING_JOKE';
export function updatingJoke(){
  return {
    type: UPDATING_JOKE
  }
}

export const UPDATING_JOKE_SUCCESS = 'UPDATING_JOKE_SUCCESS';
export function updatingJokeSuccess(data){
  return {
    type: UPDATING_JOKE_SUCCESS,
    id: data.id,
    content: data.content
  }
}

export function updateJoke(id, content){
  return dispatch => {
    dispatch(updatingJoke());
    fetch( 'http://localhost:4000/api', {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query:
          `mutation {
              updateJoke(id:"${id}", input: {
                content: "${content}",
              }) {
                id,
                content
              }
            }`
      }),
    })
    .then(response=>response.json())
    .then(data=>{
      dispatch(updatingJokeSuccess(data));
    })
    .catch( (err) => {
      console.warn('error', err);
    });

  }
}
