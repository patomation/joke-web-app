import initialstate from '../initialstate.js';
const results = (state = initialstate.results, action) => {
  switch (action.type) {
    case 'RESULTS_CHANGE':
      return action.results
      break;
    default:
      return state;

  }
}

export default results;
