import initialstate from '../initialstate.js';
const view = (state = initialstate.view, action) => {
  switch (action.type) {
    case 'CHANGE_VIEW':
      return action.view;
      break;
    default:
      return state;

  }
}

export default view;
