const queryStringify = (params) => {
  let string = '?';
  for (var key in params){
    if(params[key] !== '' && params[key] !== null  && params[key] !== undefined){
      string += `${key}=${params[key]}&`
    }
  }
  return string;
}

export default queryStringify;
