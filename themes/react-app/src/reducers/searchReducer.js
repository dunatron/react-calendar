const initialState = {
  results: [],
  searchText: "",
  searching: false,
  searched: false,
  error: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SEARCH_EVENTS": {
      return { ...state, searching: true, searchText: action.payload }
    }
    case "SEARCH_EVENTS_REJECTED": {
      return { ...state, searching: false, error: action.payload }
    }
    case "SEARCH_EVENTS_FULFILLED": {
      return {
        ...state,
        searching: false,
        searched: true,
        results: action.payload,
      }
    }
    default:
      return { ...state }
  }
}
