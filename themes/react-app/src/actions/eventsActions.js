import store from '../state/store';

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

export function getDaysEvents(year, month, day) {
  return {
    type: "FETCH_DAYS_EVENTS",
    payload: {
      year: year,
      month: month,
      day: day
    }
  }
}

export function filterEvents() {
  return {
    type: "FILTER_EVENTS",
    payload: {
      currentTags: store.getState().tags.filterTags
    }
  }
}