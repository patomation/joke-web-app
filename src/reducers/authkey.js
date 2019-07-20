import initialstate from '../initialstate.js';
const authkey = (state = initialstate.authkey, action) => {
  switch (action.type) {
    case 'AUTH_KEY_CHANGE':
      //Store auth key in local device
      localStorage.setItem('authkey', action.authkey);
      return action.authkey;
      break;
    default:
      return state;
  }
}

export default authkey;
