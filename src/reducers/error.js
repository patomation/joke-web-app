import initialstate from '../initialstate.js';
const error = (state = initialstate.error, action) => {
  switch (action.type) {
    case 'ERROR_MESSAGE':
      return action.message;
      break;
    default:
      return state;
  }
}

export default error;
