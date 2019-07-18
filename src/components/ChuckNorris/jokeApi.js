import queryStringify from './queryStringify';

const jokeApi = {
  url: 'https://api.icndb.com/jokes/random/',
  get(params, callback){
    //Intersept results
    let results = params.results;
    params.results = null;
    //Fetch from api
    fetch( `${this.url}${results}${queryStringify(params)}`, {
      method: 'GET'
    })
    .then(response=>response.json())
    .then(data=>{
      callback(data.value);
    })
    .catch( (err) => {
      console.warn('error', err);
    });

  }
}

export default jokeApi;
