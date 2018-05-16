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

export function removeDateTime(idx) {
  return {
    type: "REMOVE_DATE_TIME",
    payload: idx
  }
}

export function addImage(imageObj) {
  return {
    type: "ADD_IMAGE",
    payload: imageObj
  }
}

export function removeImage(idx) {
  return {
    type: "REMOVE_IMAGE",
    payload: idx
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