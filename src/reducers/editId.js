import initialstate from '../initialstate.js';

const editId = (state = initialstate.editId, action) => {
  switch (action.type) {
    case 'EDIT_ID_CHANGE':
      return action.id;
      break;
    default:
      return state;
  }
}

export default editId;
