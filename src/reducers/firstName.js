import initialstate from '../initialstate.js';
const firstName = (state = initialstate.firstName, action) => {
  switch (action.type) {
    case 'FIRST_NAME_CHANGE':
      return action.content;
      break;
    default:
      return state;
  }
}

export default firstName;
