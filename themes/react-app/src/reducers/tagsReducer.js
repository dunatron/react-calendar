const initialState = {
  allTags: [],
  filterTags : [],
  fetching: false,
  fetched: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "START_FETCH_TAGS": {
      return {...state, fetching: true}
    }
    case "FETCH_INITIAL_TAGS": {
      return {...state, allTags: action.payload, fetching: false}
    }
    case "TOGGLE_SECONDARY_TAG": {
      return {
        ...state
      }
    }
    case "REMOVE_FILTER_TAG": {
      return {
        ...state,
        filterTags : state.filterTags.filter( (item, index) => item !== action.payload)
      }
    }
    case "ADD_FILTER_TAG": {
      return {
        ...state,
        filterTags: state.filterTags.concat(action.payload)
      }
    }
  }
  return state;

}