import apiIntegration from '../modules/apiIntegration';

export const GETTING_JOKES = 'GETTING_JOKES';
export function gettingJokes(content){
  return {
    type: GETTING_JOKES
  }
}

export const GETTING_JOKES_SUCCESS = 'GETTING_JOKES_SUCCESS';
export function gettingJokesSuccess(data){
  return {
    type: GETTING_JOKES_SUCCESS,
    jokes: data.jokes
  }
}

export function getJokes(results = 10){
  return dispatch => {
    dispatch(gettingJokes());
    fetch( 'http://localhost:4000/api', {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query:
        `{
            getJokes(results: ${results}){
                jokes {
                    id,
                    content,
                    likes,
                    dislikes
                }
            }
          }`
      }),
    })
    .then(response=>response.json())
    .then(data=>{
      dispatch({
        type: 'JOKES',
        jokes: data.data.getJokes.jokes
      });
    })
    .catch( (err) => {
      console.warn('error', err);
    });

  }
}
