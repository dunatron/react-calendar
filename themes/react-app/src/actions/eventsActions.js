import axios from 'axios';



export function getNewEvents(events) {
  return {
    type: "FETCH_EVENTS_FULFILLED",
    payload: events
  }
}