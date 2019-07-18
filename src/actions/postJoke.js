export const POSTING_JOKE = 'POSTING_JOKE';
export function postingJoke(content){
  return {
    type: POSTING_JOKE
  }
}

export const POSTING_JOKE_SUCCESS = 'POSTING_JOKE_SUCCESS';
export function postingJokeSuccess(data){
  return {
    type: POSTING_JOKE_SUCCESS,
    id: data.id,
    content: data.content
  }
}

export function postJoke(content){
  return dispatch => {
    dispatch(postingJoke());
    fetch( 'http://localhost:4000/api', {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `mutation{
          createJoke( input: {
            content: "${content}",
          }) {
            id,
            content
          }
        }`
      })
    })
    .then(response=>response.json())
    .then(data=>{
      dispatch(postingJokeSuccess(data));
    })
    .catch( (err) => {
      console.warn('error', err);
    });
  }
}
