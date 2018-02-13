export function searchEvents(searchText) {
  return {
    type: "SEARCH_EVENTS",
    payload: searchText
  }
}

//SEARCH_EVENTS_REJECTED

//SEARCH_EVENTS_FULFILLED

export function searchEventsFulfill(events) {
  return {
    type: "SEARCH_EVENTS_FULFILLED",
    payload: events
  }
}