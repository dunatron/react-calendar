import reducer from './reducer';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';


const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null,
};

const userReducer = (state=initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_START": {
      return {...state, fetching: true};
    }
    case "FETCH_USERS_ERROR": {
      return {...state, fetching: false, error: action.payload};
    }
    case "RECEIVE_USERS": {
      return {...state , fetching: false, fetched: true, users: action.payload}
    }
  }
  return state;
};

const tweetsReducer = (state=[], action) => {
  return state;
};
const reducers = combineReducers({
  user: userReducer,
  tweets: tweetsReducer
});


const customLogger = (store) => (next) => (action) => {
  console.log("action fired", action);
  next(action);
};

const reduxLogger = createLogger();

const customError = (store) => (next) => (action) => {
  try {
    next(action);
  } catch(e) {
    console.log("error has been caught: ", e);
  }
};

const middleware = applyMiddleware(thunk, customLogger, customError, reduxLogger);

const store = createStore(reducers, {}, middleware);

store.dispatch((dispatch) => {
  dispatch({type: "FETCH_EVENTS_START"});
// do something else
axios.get("http://rest.learncode.academy/api/wstern/users")
  .then((response) => {
  dispatch({type: "RECEIVE_USERS", payload: response.data})
})
.catch((err) => {
  dispatch({type: "FETCH_USERS_ERROR", payload: err})
})
});

export default store

// export default createStore(reducer);