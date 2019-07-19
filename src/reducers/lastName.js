import initialstate from '../initialstate.js';
const lastName = (state = initialstate.lastName, action) => {
  switch (action.type) {
    case 'LAST_NAME_CHANGE':
      return action.content;
      break;
    default:
      return state;
  }
}

export default lastName;
