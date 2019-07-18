import initialstate from '../initialstate.js';

const content = (state = initialstate.content, action) => {
  switch (action.type) {
    case 'CONTENT_CHANGE':
      return action.content;
      break;
    default:
      return state;
  }
}

export default content;
