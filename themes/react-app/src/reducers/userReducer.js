const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  user: {
    name: "Dunatron",
    age: 27
  },
  error: null,
};

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case "FETCH_USER": {
      return {...state, fetching: true}
    }
    case "FETCH_USER_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_USER_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        user: action.payload
      }
    }
    case "SET_USER_NAME": {
      return {
        ...state,
        user: {...state.user, name: action.payload}
      }
    }
  }
  return state;
}