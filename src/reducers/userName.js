import initialstate from '../initialstate.js';
const userName = (state = initialstate.userName, action) => {
  switch (action.type) {
    case 'USERNAME_CHANGE':
      return action.userName;
      break;
    default:
      return state;
  }
}

export default userName;
