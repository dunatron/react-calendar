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