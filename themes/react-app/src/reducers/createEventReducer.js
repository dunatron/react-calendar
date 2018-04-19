import moment from 'moment';

const DEFAULT_DATE_TIME_OBJ = {
  date: moment().format('YYYY-MM-DD hh:mm'),
  start: moment().format('hh:mm'),
  finish: moment().format('hh:mm'),
}

const initialState = {
  Title: '',
  Date: false,
  DateTimes: [
    DEFAULT_DATE_TIME_OBJ
  ],
  Description: '',
  Venue: null,
  Start: false,
  Finish: false,
  Approved: false,
  Free: false,
  Website: false,
  TicketUrl: false,
  TicketPhone: false,
  Restriction: false,
  SpecEntry: false,
  AccessType: false,
  LocationText: false,
  Lat: false,
  Lon: false,
  EventImages: [],
  Tickets: [],
  SecondaryTag: "default",
  Owner: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_TITLE_FIELD": {
      return { ...state, Title: action.payload }
    }
    case "UPDATE_FIELD": {
      return { ...state, [action.payload.type]: action.payload.value }
    }
    case "ADD_NEW_DATE_TIME": {

      return { ...state, DateTimes: [...state.DateTimes, DEFAULT_DATE_TIME_OBJ] }
    }
    case "UPDATE_DATE_TIME": {
      let index = action.payload.index
      let key = action.payload.key
      let value = action.payload.value
      console.log("index ", index)
      console.log("key ", key)
      console.log("value ", value)
      return {
        ...state
      }
    }
    default: return { ...state }
  }
}