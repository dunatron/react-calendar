import moment from "moment"

const DEFAULT_DATE_TIME_OBJ = {
  date: moment().format("YYYY-MM-DD"),
  start: moment().format("YYYY-MM-DD hh:mm a"),
  finish: moment().format("YYYY-MM-DD hh:mm a"),
}

const initialState = {
  Title: "",
  Date: false,
  DateTimes: [DEFAULT_DATE_TIME_OBJ],
  Description: "",
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
  Owner: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_TITLE_FIELD": {
      return { ...state, Title: action.payload }
    }
    case "UPDATE_FIELD": {
      return { ...state, [action.payload.type]: action.payload.value }
    }
    case "ADD_NEW_DATE_TIME": {
      return {
        ...state,
        DateTimes: [...state.DateTimes, DEFAULT_DATE_TIME_OBJ],
      }
    }
    case "REMOVE_DATE_TIME": {
      return {
        ...state,
        DateTimes: [
          ...state.DateTimes.slice(0, action.payload),
          ...state.DateTimes.slice(action.payload + 1),
        ],
      }
    }
    case "ADD_IMAGE": {
      return { ...state, EventImages: [...state.EventImages, action.payload] }
    }
    case "REMOVE_IMAGE": {
      return {
        ...state,
        EventImages: [
          ...state.EventImages.slice(0, action.payload),
          ...state.EventImages.slice(action.payload + 1),
        ],
      }
    }
    case "UPDATE_DATE_TIME": {
      const { index, key, value } = action.payload

      const dateTimes = [...state.DateTimes]

      const updatedDateTimes = dateTimes.map((obj, idx) => {
        if (idx !== index) {
          // This isn't the item we care about - keep it as-is
          return obj
        }
        // Otherwise, this is the one we want - return an updated value
        let mutatedObj = [...obj]
        mutatedObj[key] = value
        return {
          ...obj,
          ...mutatedObj,
        }
      })

      return {
        ...state,
        DateTimes: updatedDateTimes,
      }
    }
    default:
      return { ...state }
  }
}
