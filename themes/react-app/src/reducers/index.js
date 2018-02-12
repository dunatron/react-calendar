import { combineReducers } from "redux";

import header from './headerReducer';
import event from './eventsReducer';
import currentEvent from './currentEventReducer';
import createEvent from './createEventReducer';
import tags from './tagsReducer';
import user from './userReducer';

export default combineReducers({
  header,
  event,
  tags,
  currentEvent,
  createEvent,
  user
})