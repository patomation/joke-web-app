export const GET_JOKE = 'GET_JOKE';
export function gettingJoke(){
  return {
    type: GET_JOKE
  }
}

export const GET_JOKE_SUCCESS = 'GET_JOKE_SUCCESS';
export function getJokeSuccess(data){
  return {
    type: GET_JOKE_SUCCESS,
    id: data.id,
    content: data.content
  }
}

export function getJoke(id){
  return dispatch => {
    dispatch(gettingJoke());
    fetch( 'http://localhost:4000/api', {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query:
        `{
            getJoke(id: "${id}"){
                id,
                content,
                likes,
                dislikes
            }
          }`
      }),
    })
    .then(response=>response.json())
    .then(data=>{
      dispatch(gettingJokeuccess(data));
    })
    .catch( (err) => {
      console.warn('error', err);
    });

  }
}
