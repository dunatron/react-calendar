const initialState = {
  eventData: {},
  fetching: false,
  fetched: false,
  error: null,
  displayModal: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_SINGLE_EVENT": {
      return { ...state, fetching: true, displayModal: true }
    }
    case "FETCH_SINGLE_EVENT_REJECTED": {
      return { ...state, fetching: false, error: action.payload }
    }
    case "FETCH_SINGLE_EVENT_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        eventData: action.payload,
      }
    }
    case "CLOSE_MODAL": {
      return { ...state, displayModal: false }
    }
    case "OPEN_MODAL": {
      return { ...state, displayModal: true }
    }
    default:
      return { ...state }
  }
}
