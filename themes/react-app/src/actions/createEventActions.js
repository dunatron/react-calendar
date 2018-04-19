export function updateTitleField(value) {
  return {
    type: "UPDATE_TITLE_FIELD",
    payload: value
  }
}

export function updateField(type, value) {
  return {
    type: "UPDATE_FIELD",
    payload: {
      type: type,
      value: value
    }
  }
}

export function addNewDateTime() {
  return {
    type: "ADD_NEW_DATE_TIME",
    payload: null
  }
}

export function updateDateTime(i, k, v) {
  return {
    type: "UPDATE_DATE_TIME",
    payload: {
      index: i,
      key: k,
      value: v
    }
  }
}