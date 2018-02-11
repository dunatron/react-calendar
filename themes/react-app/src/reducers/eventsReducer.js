const initialState = {
  events: [
    {
      ID: 1,
      Title: "My Project",
      Date: "2018-02-27",
      SecondaryTag: {
        Title: "Business & Professional"
      }
    }
  ],
  currentEvent: {},
  fetching: false,
  fetched: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_EVENTS": {
      return {...state, fetching: true}
    }
    case "FETCH_EVENTS_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_EVENTS_FULFILLED": {
      return {
        ...state, fetching: false, fetched: true, events: action.payload,
      }
    }
    case "ADD_EVENT": {
      return {
        ...state,
        events: [...state.events, action.payload]
      }
    }
    case "UPDATE_EVENT": {
      const {ID, text} = action.payload;
      const newEvents = [...state.events];
      const eventToUpdate = newEvents.findIndex(event => event.ID === ID);
      newEvents[eventToUpdate] = action.payload;

      return {
        ...state,
        events: newEvents
      }
    }
    case "DELETE_EVENT": {
      return {
        ...state,
        events: event.events.filter(event => event.ID !== action.payload)
      }
    }
  }
  return state;

}