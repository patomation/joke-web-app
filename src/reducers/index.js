import { combineReducers } from 'redux';

import content from './content';
import jokes from './jokes';
import firstName from './firstName';
import lastName from './lastName';
import results from './results';
import view from './view.js';
import editId from './editId.js';

export default combineReducers({
  content,
  jokes,
  firstName,
  lastName,
  results,
  view,
  editId
})
