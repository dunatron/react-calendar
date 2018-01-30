import { combineReducers } from "redux";

import header from './headerReducer';
import event from './eventsReducer';
import tags from './tagsReducer';
import user from './userReducer';

export default combineReducers({
  header,
  event,
  tags,
  user
})