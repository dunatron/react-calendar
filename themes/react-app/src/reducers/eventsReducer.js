const R = require('ramda');

const initialState = {
  events: {
    '2018': {
      '03': {
        '27': [
          {
            ID: 1,
            Title: "My Project Business & Professional",
            Date: "2018-02-27",
            SecondaryTag: {
              Title: "Business & Professional"
            }
          },
          {
            ID: 2,
            Title: "Test Events",
            Date: "2018-02-27",
            SecondaryTag: {
              Title: "Business & Professional"
            }
          },
        ]
      },
      '04': {
        '12': [
          {
            ID: 5,
            Title: "My Project Folk",
            Date: "2018-04-12",
            SecondaryTag: {
              Title: "Folk"
            }
          }
        ]
      }
    }
  },
  visibleEvents: {},
  currentEvent: {},
  fetching: true,
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

      let fetchedEvents = action.payload;
      let EventsList = {};
      let concatValues = (k, l, r) => k == 'data' ? R.concat(l, r) : r;

      // loop events and create its structure, also perform deep merge with keys
      for (event of fetchedEvents){
        let splitDate = R.split('-', event.Date);
        let year = splitDate[0], month = splitDate[1], day = splitDate[2];
        let structuredEvent =  R.assocPath([year, month, day, 'data'],  [event], {a: 5});

        EventsList = R.mergeDeepWithKey(concatValues,
          EventsList,
          structuredEvent);
      }

      return {
        ...state, fetching: false, fetched: true, events: EventsList,
      }
    }
    case "FILTER_EVENTS": {
      const {currentTags} = action.payload;
      let allEvents = state.events;

      const getTagForEvent = R.path(['SecondaryTag', 'Title']);
      const filterWithTags = tags => event => R.contains(getTagForEvent(event), tags);
      const forData = tags => R.filter(filterWithTags(tags));
      const forDay = tags => R.map(forData(tags));
      const forMonth = tags => R.map(forDay(tags));
      const forYear = tags => R.map(forMonth(tags));
      const filterByTag = tags => R.map(forYear(tags));

      // filter events if there are any tags
      if (currentTags.length >= 1) {
        allEvents = filterByTag(currentTags)(allEvents);
      }

      return {
        ...state,
        visibleEvents: allEvents
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