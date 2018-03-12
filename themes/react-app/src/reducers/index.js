import { combineReducers } from "redux";

import settings from './settingsReducer';
import header from './headerReducer';
import event from './eventsReducer';
import currentEvent from './currentEventReducer';
import createEvent from './createEventReducer';
import tags from './tagsReducer';
import user from './userReducer';
import search from './searchReducer';

export default combineReducers({
  settings,
  header,
  event,
  tags,
  search,
  currentEvent,
  createEvent,
  user
})