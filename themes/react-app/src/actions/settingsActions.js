export function updateLogo(type, url) {
  return {
    type: "UPDATE_LOGO",
    payload: {
      type: type,
      url: url
    }
  }
}

export function updateDimensions(width, height){
  return {
    type: "UPDATE_DIMENSIONS",
    payload: {
      width: width,
      height: height
    }
  }
}

export function updateActionBarStatus(status) {
  return {
    type: "UPDATE_ACTION_BAR_STATUS",
    payload: status
  }
}