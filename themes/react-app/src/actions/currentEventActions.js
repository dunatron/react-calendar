// FETCH_SINGLE_EVENT
// FETCH_SINGLE_EVENT_REJECTED
// FETCH_SINGLE_EVENT_FULFILLED
// CLOSE_MODAL

export function getSingleEvent() {
  return {
    type: "FETCH_SINGLE_EVENT",
  }
}

export function getSingleEventFulfilled(eventID, eventTitle) {
  return {
    type: "FETCH_SINGLE_EVENT_FULFILLED",
    payload: {
      eventID: eventID,
      eventTitle: eventTitle
    }
  }
}

export function getSingleEventRejected(err) {
  return {
    type: "FETCH_SINGLE_EVENT_REJECTED",
    payload: err
  }
}

export function closeSingleEventModal() {
  return {
    type: "CLOSE_MODAL",
  }
}