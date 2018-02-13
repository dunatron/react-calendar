export function startFetchNewEvents() {
  return {
    type: "FETCH_EVENTS",
  }
}

export function getNewEvents(events) {
  return {
    type: "FETCH_EVENTS_FULFILLED",
    payload: events
  }
}