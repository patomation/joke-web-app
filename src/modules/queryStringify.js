const queryStringify = (params) => {
  let string = '?';
  for (var key in params){
    console.log(key, params[key]);
    if(params[key] !== '' && params[key] !== null  && params[key] !== undefined){
      string += `${key}=${params[key]}&`
    }
  }
  console.log(string);
  return string;
}

export default queryStringify;
