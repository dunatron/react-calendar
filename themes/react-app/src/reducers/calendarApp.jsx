import { combineReducers } from 'redux'
// import todos from './todos'
// import visibilityFilter from './visibilityFilter'
import tags from './Tags';

const calendarApp = combineReducers({
  tags
})

export default calendarApp