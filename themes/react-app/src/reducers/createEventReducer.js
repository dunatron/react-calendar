const initialState = {
  Title: '',
  Date: false,
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
  SecondaryTag: '',
  Owner: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_TITLE_FIELD": {
      return {...state, Title: action.payload}
    }
    case "UPDATE_FIELD": {
      return {...state, [action.payload.type]: action.payload.value}
    }
  }
  return state;
}