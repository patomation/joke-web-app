import initialstate from '../initialstate';
const jokes = (state = initialstate.jokes, action) => {
  switch (action.type) {
    case 'JOKES':
      return action.jokes;
      break;
    default:
      return state;

  }
}

export default jokes;
